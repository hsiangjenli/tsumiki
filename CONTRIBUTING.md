# 貢獻指南

感謝你願意為 Tsumiki 專案貢獻！本文件說明如何設定開發環境、提交程式碼以及與專案維護者協作。

## 開發環境設定

### 必備環境

- Node.js 18.0.0 以上
- pnpm 10.13.1 以上

### 設定步驟

1. 分叉並複製儲存庫：

```bash
git clone https://github.com/YOUR_USERNAME/tsumiki.git
cd tsumiki
```

2. 安裝相依套件：

```bash
pnpm install
```

3. 設定 pre-commit 掛鉤：

```bash
pnpm prepare
```

## 開發流程

### 分支策略

- `main`：穩定版本
- 功能開發：`feature/功能名稱`
- 錯誤修正：`bugfix/錯誤名稱`
- 緊急修補：`hotfix/修補內容`

### 建議步驟

1. 建立新分支：

```bash
git checkout -b feature/your-feature-name
```

2. 進行程式修改

3. 執行程式品質檢查：

```bash
# 型別檢查
pnpm typecheck

# 程式碼檢查
pnpm check

# 自動修正
pnpm fix

# 機密資訊檢查
pnpm secretlint
```

4. 執行建置測試：

```bash
pnpm build:run
```

5. 提交變更：

```bash
git add .
git commit -m "feat: 新功能"
```

## Commit 訊息規範

請使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` 問題修正
- `docs:` 文件更新
- `style:` 程式碼風格調整（不影響功能）
- `refactor:` 程式碼重構
- `test:` 測試新增或調整
- `chore:` 建置流程或工具設定變更

範例：
```
feat: add new install command for .sh files
fix: resolve path handling issue in install command
docs: update README with new command examples
```

## 程式品質標準

### 自動檢查

Pre-commit 掛鉤會自動執行以下檢查：

- **secretlint**：檢查是否混入 API 金鑰、密碼等敏感資訊
- **typecheck**：執行 TypeScript 型別檢查
- **fix**：使用 Biome 進行自動修正

### 手動檢查

在送出變更前，建議手動執行：

```bash
# 一次執行所有檢查
pnpm typecheck && pnpm check && pnpm secretlint

# 自動整理程式碼
pnpm fix
```

## 專案結構

```
tsumiki/
├── src/
│   ├── cli.ts              # CLI 進入點
│   └── commands/
│       └── install.tsx     # 安裝指令的 UI 實作
├── commands/               # 指令範本（.md, .sh）
├── dist/                   # 建置輸出
├── package.json
├── CLAUDE.md               # 專案指引
└── README.md
```

## Pull Request

### 建立 Pull Request

1. 推送分支：

```bash
git push origin feature/your-feature-name
```

2. 在 GitHub 建立 Pull Request

3. 依照 PR 範本填寫變更摘要

### PR 必要條件

- [ ] 清楚描述變更內容
- [ ] 連結相關 Issue（若適用）
- [ ] 所有檢查皆通過
- [ ] 建置成功
- [ ] 不含敏感資訊

## Issue 回報

歡迎透過 [Issues](https://github.com/classmethod/tsumiki/issues) 提出錯誤回報或功能建議。

### 回報錯誤時請提供

- 重現步驟
- 預期行為
- 實際行為
- 環境資訊（作業系統、Node.js 版本等）
- 錯誤訊息（若有）

### 提出功能建議時請提供

- 功能描述
- 主要使用情境
- 預期效益
- 粗略的實作想法（若有）

## 資安議題

若發現安全性問題，請透過私訊或電子郵件回報，不要建立公開 Issue。

## 授權條款

本專案採用 MIT 授權。提交程式碼即代表同意以 MIT 授權釋出。

## 聯絡與支援

- [Issues](https://github.com/classmethod/tsumiki/issues)：錯誤回報、功能建議
- [Discussions](https://github.com/classmethod/tsumiki/discussions)：提問與討論

期待你的貢獻與回饋！
