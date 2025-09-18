import * as path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";

type InstallStatus =
  | "starting"
  | "checking"
  | "copying"
  | "completed"
  | "error";

const InstallComponent: React.FC = () => {
  const [status, setStatus] = useState<InstallStatus>("starting");
  const [copiedFiles, setCopiedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performInstall = async (): Promise<void> => {
      try {
        setStatus("checking");

        // 取得目前的工作目錄
        const currentDir = process.cwd();
        const commandsTargetDir = path.join(currentDir, ".claude", "commands");
        const agentsTargetDir = path.join(currentDir, ".claude", "agents");

        // 取得 tsumiki 的 commands 與 agents 目錄
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // build 後需參照 dist/commands、dist/agents（因 cli.js 位於 dist/）
        const tsumikiCommandsDir = path.join(__dirname, "commands");
        const tsumikiAgentsDir = path.join(__dirname, "agents");

        // 若 .claude/commands、.claude/agents 不存在則建立
        await fs.ensureDir(commandsTargetDir);
        await fs.ensureDir(agentsTargetDir);

        setStatus("copying");

        // 取得 commands 目錄內所有 .md 與 .sh 檔案
        const commandFiles = await fs.readdir(tsumikiCommandsDir);
        const targetCommandFiles = commandFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh"),
        );

        // 取得 agents 目錄內所有 .md 檔案
        let targetAgentFiles: string[] = [];
        try {
          const agentFiles = await fs.readdir(tsumikiAgentsDir);
          targetAgentFiles = agentFiles.filter((file) => file.endsWith(".md"));
        } catch {
          // 若 agents 目錄不存在則略過
        }

        const copiedFilesList: string[] = [];

        // 複製 commands 檔案
        for (const file of targetCommandFiles) {
          const sourcePath = path.join(tsumikiCommandsDir, file);
          const targetPath = path.join(commandsTargetDir, file);

          await fs.copy(sourcePath, targetPath);
          copiedFilesList.push(`commands/${file}`);
        }

        // 複製 agents 檔案
        for (const file of targetAgentFiles) {
          const sourcePath = path.join(tsumikiAgentsDir, file);
          const targetPath = path.join(agentsTargetDir, file);

          await fs.copy(sourcePath, targetPath);
          copiedFilesList.push(`agents/${file}`);
        }

        setCopiedFiles(copiedFilesList);
        setStatus("completed");

        // 兩秒後結束流程
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

    performInstall();
  }, []);

  if (status === "starting") {
    return (
      <Box>
        <Text color="cyan">🚀 開始安裝 Tsumiki...</Text>
      </Box>
    );
  }

  if (status === "checking") {
    return (
      <Box>
        <Text color="yellow">📋 正在檢查環境...</Text>
      </Box>
    );
  }

  if (status === "copying") {
    return (
      <Box>
        <Text color="blue">📝 正在複製指令範本...</Text>
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

  if (status === "completed") {
    return (
      <Box flexDirection="column">
        <Text color="green">✅ 安裝完成！</Text>
        <Newline />
        <Text>已複製的檔案（{copiedFiles.length} 個）：</Text>
        {copiedFiles.map((file) => (
          <Text key={file} color="gray">
            {" "}
            • {file}
          </Text>
        ))}
        <Newline />
        <Text color="cyan">
          在 Claude Code 中可以這樣使用指令：
        </Text>
        <Text color="white"> /tdd-requirements</Text>
        <Text color="white"> /kairo-design</Text>
        <Text color="white"> @agent-symbol-searcher</Text>
        <Text color="white"> ...</Text>
      </Box>
    );
  }

  return null;
};

export const installCommand = (): void => {
  render(React.createElement(InstallComponent));
};
