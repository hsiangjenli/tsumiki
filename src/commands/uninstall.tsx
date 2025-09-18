import * as path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";

type UninstallStatus =
  | "starting"
  | "checking"
  | "removing"
  | "completed"
  | "error"
  | "not_found";

const UninstallComponent: React.FC = () => {
  const [status, setStatus] = useState<UninstallStatus>("starting");
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performUninstall = async (): Promise<void> => {
      try {
        setStatus("checking");

        // 取得目前的工作目錄
        const currentDir = process.cwd();
        const targetDir = path.join(currentDir, ".claude", "commands");

        // 檢查 .claude/commands 目錄是否存在
        const dirExists = await fs.pathExists(targetDir);
        if (!dirExists) {
          setStatus("not_found");
          setTimeout(() => {
            process.exit(0);
          }, 2000);
          return;
        }

        // 取得 tsumiki 的 commands 目錄
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // build 後改讀 dist/commands（因 cli.js 位於 dist/）
        const tsumikiDir = path.join(__dirname, "commands");

        // 取得 tsumiki 內的檔案清單
        const tsumikiFiles = await fs.readdir(tsumikiDir);
        const tsumikiTargetFiles = tsumikiFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh"),
        );

        setStatus("removing");

        // 只刪除 .claude/commands 中由 tsumiki 安裝的檔案
        const installedFiles = await fs.readdir(targetDir);
        const removedFilesList: string[] = [];

        for (const file of installedFiles) {
          if (tsumikiTargetFiles.includes(file)) {
            const filePath = path.join(targetDir, file);
            await fs.remove(filePath);
            removedFilesList.push(file);
          }
        }

        // 刪除後檢查 .claude/commands 是否為空
        const remainingFiles = await fs.readdir(targetDir);
        if (remainingFiles.length === 0) {
          // 移除空目錄
          await fs.rmdir(targetDir);
          // 若 .claude 目錄也為空則一併刪除
          const claudeDir = path.dirname(targetDir);
          const claudeFiles = await fs.readdir(claudeDir);
          if (claudeFiles.length === 0) {
            await fs.rmdir(claudeDir);
          }
        }

        setRemovedFiles(removedFilesList);
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

    performUninstall();
  }, []);

  if (status === "starting") {
    return (
      <Box>
        <Text color="cyan">🗑️ 開始移除 Tsumiki...</Text>
      </Box>
    );
  }

  if (status === "checking") {
    return (
      <Box>
        <Text color="yellow">📋 正在檢查安裝狀態...</Text>
      </Box>
    );
  }

  if (status === "removing") {
    return (
      <Box>
        <Text color="blue">🗑️ 正在移除指令範本...</Text>
      </Box>
    );
  }

  if (status === "not_found") {
    return (
      <Box flexDirection="column">
        <Text color="yellow">
          ⚠️ 找不到 .claude/commands 目錄
        </Text>
        <Text color="gray">看起來尚未安裝 Tsumiki。</Text>
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
    if (removedFiles.length === 0) {
      return (
        <Box flexDirection="column">
          <Text color="yellow">⚠️ 找不到可刪除的檔案</Text>
          <Text color="gray">看起來未安裝 Tsumiki 指令。</Text>
        </Box>
      );
    }

    return (
      <Box flexDirection="column">
        <Text color="green">✅ 移除完成！</Text>
        <Newline />
        <Text>已刪除的檔案（{removedFiles.length} 個）：</Text>
        {removedFiles.map((file) => (
          <Text key={file} color="gray">
            {" "}
            • {file}
          </Text>
        ))}
        <Newline />
        <Text color="cyan">
          已移除 Tsumiki 的 Claude Code 指令範本。
        </Text>
      </Box>
    );
  }

  return null;
};

export const uninstallCommand = (): void => {
  render(React.createElement(UninstallComponent));
};
