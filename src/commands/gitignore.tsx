import * as path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";

type GitignoreStatus =
  | "starting"
  | "checking"
  | "updating"
  | "completed"
  | "skipped"
  | "error";

const GitignoreComponent: React.FC = () => {
  const [status, setStatus] = useState<GitignoreStatus>("starting");
  const [addedRules, setAddedRules] = useState<string[]>([]);
  const [skippedRules, setSkippedRules] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performGitignoreUpdate = async (): Promise<void> => {
      try {
        setStatus("checking");

        const currentDir = process.cwd();
        const gitignorePath = path.join(currentDir, ".gitignore");

        // 取得 tsumiki 的 commands 目錄
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // build 後改讀 dist/commands（因 cli.js 位於 dist/）
        const tsumikiDir = path.join(__dirname, "commands");

        // 取得 commands 目錄內所有 .md 與 .sh 檔案
        const files = await fs.readdir(tsumikiDir);
        const targetFiles = files.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh"),
        );

        // 將實際檔案路徑轉換成忽略規則
        const rulesToAdd = targetFiles.map(
          (file) => `.claude/commands/${file}`,
        );

        let gitignoreContent = "";
        let gitignoreExists = false;

        try {
          gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
          gitignoreExists = true;
        } catch {
          gitignoreExists = false;
        }

        const existingLines = gitignoreContent
          .split("\n")
          .map((line) => line.trim());
        const rulesToActuallyAdd: string[] = [];
        const rulesAlreadyExist: string[] = [];

        for (const rule of rulesToAdd) {
          if (existingLines.includes(rule)) {
            rulesAlreadyExist.push(rule);
          } else {
            rulesToActuallyAdd.push(rule);
          }
        }

        if (rulesToActuallyAdd.length === 0) {
          setSkippedRules(rulesAlreadyExist);
          setStatus("skipped");
          setTimeout(() => {
            process.exit(0);
          }, 2000);
          return;
        }

        setStatus("updating");

        let newContent = gitignoreContent;
        if (
          gitignoreExists &&
          gitignoreContent.length > 0 &&
          !gitignoreContent.endsWith("\n")
        ) {
          newContent += "\n";
        }

        if (gitignoreExists && gitignoreContent.length > 0) {
          newContent += "\n# Tsumiki command templates\n";
        } else {
          newContent = "# Tsumiki command templates\n";
        }

        for (const rule of rulesToActuallyAdd) {
          newContent += `${rule}\n`;
        }

        await fs.writeFile(gitignorePath, newContent);

        setAddedRules(rulesToActuallyAdd);
        setSkippedRules(rulesAlreadyExist);
        setStatus("completed");

        setTimeout(() => {
          process.exit(0);
        }, 2000);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setStatus("error");

        setTimeout(() => {
          process.exit(1);
        }, 3000);
      }
    };

    performGitignoreUpdate();
  }, []);

  if (status === "starting") {
    return (
      <Box>
        <Text color="cyan">🚀 開始更新 .gitignore...</Text>
      </Box>
    );
  }

  if (status === "checking") {
    return (
      <Box>
        <Text color="yellow">📋 正在檢查 .gitignore 檔案...</Text>
      </Box>
    );
  }

  if (status === "updating") {
    return (
      <Box>
        <Text color="blue">✏️ 正在更新 .gitignore...</Text>
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Box flexDirection="column">
        <Text color="red">❌ 發生錯誤：</Text>
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  if (status === "skipped") {
    return (
      <Box flexDirection="column">
        <Text color="yellow">⏭️ 所有規則都已存在</Text>
        <Newline />
        <Text>已存在的規則：</Text>
        {skippedRules.map((rule) => (
          <Text key={rule} color="gray">
            • {rule}
          </Text>
        ))}
        <Newline />
        <Text color="cyan">.gitignore 無需更新</Text>
      </Box>
    );
  }

  if (status === "completed") {
    return (
      <Box flexDirection="column">
        <Text color="green">✅ .gitignore 更新完成！</Text>
        <Newline />
        {addedRules.length > 0 && (
          <>
            <Text>新增規則（{addedRules.length} 個）：</Text>
            {addedRules.map((rule) => (
              <Text key={rule} color="green">
                • {rule}
              </Text>
            ))}
          </>
        )}
        {skippedRules.length > 0 && (
          <>
            <Text>已存在的規則（{skippedRules.length} 個）：</Text>
            {skippedRules.map((rule) => (
              <Text key={rule} color="gray">
                • {rule}
              </Text>
            ))}
          </>
        )}
        <Newline />
        <Text color="cyan">
          已將 Tsumiki 的指令檔案加入 Git 忽略清單。
        </Text>
      </Box>
    );
  }

  return null;
};

export const gitignoreCommand = (): void => {
  render(React.createElement(GitignoreComponent));
};
