# CLAUDE.md

此文件提供指引，協助 Claude Code（claude.ai/code）在此版本庫中進行開發作業。

## 概要

Tsumiki 是提供 AI 驅動開發框架指令範本的 CLI 工具。本專案以 TypeScript + React 結合 Ink 建構成 CLI 應用程式，將為 Claude Code 使用者在 `.claude/commands/` 目錄安裝對應的指令範本。

## 開發指令

```bash
# 開發環境
pnpm install                # 安裝相依套件

# 建置
pnpm build                  # 建置專案並將 commands 目錄複製到 dist/
pnpm build:run              # 建置後啟動 CLI（測試用）

# 程式品質
pnpm check                  # 使用 Biome 進行程式檢查
pnpm fix                    # 使用 Biome 自動修正
pnpm typecheck              # 使用 tsgo 執行 TypeScript 型別檢查
pnpm secretlint             # 檢查是否包含機密資訊

# pre-commit 掛鉤
pnpm prepare                # 設定 simple-git-hooks
```

## 專案結構

- **`src/cli.ts`**：CLI 進入點，使用 commander 定義指令
- **`src/commands/install.tsx`**：採 React + Ink 實作的安裝指令 UI
- **`commands/`**：Tsumiki AI 開發框架的 Claude Code 指令範本（`.md` 與 `.sh`）
- **`dist/`**：建置輸出，`dist/commands/` 會存放複製後的範本

## 技術堆疊

- **CLI Framework**：Commander.js
- **UI Framework**：React + Ink（在 CLI 中渲染 React）
- **Build Tool**：tsup（以 ESBuild 驅動的 TypeScript 建置）
- **Code Quality**：Biome（程式碼檢查與格式化）
- **TypeScript**：tsgo（高速型別檢查）
- **Package Manager**：pnpm

## 建置流程

執行 `pnpm build` 時會進行下列動作：
1. 清除 `dist` 目錄
2. 建立 `dist/commands` 目錄
3. 將 `commands/` 中的 `.md` 與 `.sh` 複製到 `dist/commands/`
4. 使用 tsup 將 TypeScript 程式碼同時建置為 ESM 與 CJS 版本

## 安裝動作

`tsumiki install` 指令會執行：
1. 在目前目錄建立 `.claude/commands/`
2. 從建置完成的 `dist/commands/` 複製所有 `.md` 與 `.sh` 檔案
3. 透過 React + Ink 顯示進度與複製檔案列表

## 品質管理

Pre-commit 掛鉤會自動執行：
- `pnpm secretlint`：檢查是否洩漏機密資訊
- `pnpm typecheck`：型別檢查
- `pnpm fix`：程式碼自動修正

提交程式碼前，請務必先執行 `pnpm check` 與 `pnpm typecheck` 確認結果通過。
