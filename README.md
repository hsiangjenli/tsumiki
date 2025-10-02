# Tsumiki - AI 驅動開發支援框架

Tsumiki 是一款支援 AI 驅動開發的框架，從需求定義到實作，都能透過 AI 協助打造高效率的開發流程。

預設情況下主要支援 Claude Code，也可搭配其他工具使用。若要在其他工具中運用 Tsumiki，請參考[在非 Claude Code 工具中使用 tsumiki](#在非-claude-code-工具中使用-tsumiki)。

## 安裝

請執行下列 npx 指令安裝 Tsumiki：

```bash
npx tsumiki install
```

執行後會在 `.claude/commands/` 目錄中安裝 Tsumiki 的 Claude Code 斜線指令。

## 概要

Tsumiki 主要由以下兩組指令構成：

- **kairo**：涵蓋需求定義到實作的完整開發流程
- **tdd**：測試驅動開發（TDD）的各階段指令

### Kairo 指令

Kairo 會在需求定義到實作的流程中自動化／協助開發。支援以下步驟：

1. **需求定義**：從概要產生詳細需求定義書
2. **設計**：自動產出技術設計文件
3. **任務拆解**：將實作任務適當拆分並排序
4. **TDD 實作**：透過 TDD 建立高品質實作

## 可使用的指令

- `init-tech-stack`：技術堆疊識別

### 技術堆疊入口

- `.github/prompts/tech-stack.prompt.md`：以問答方式盤點專案技術決策，缺項時可先沿用下方預設並標記為暫用。
- 建議將輸出貼至對應的 GitHub Issue，以便後續 BDD／SDD／TDD 與實作階段引用相同基準。

### Kairo 指令（完整開發流程）
- `kairo-requirements`：需求定義
- `kairo-design`：設計文件生成
- `kairo-tasks`：任務拆解
- `kairo-implement`：實作執行

### TDD 指令（個別執行）
- `tdd-requirements`：TDD 需求定義
- `tdd-testcases`：測試案例建立
- `tdd-red`：撰寫失敗測試（Red）
- `tdd-green`：最小實作（Green）
- `tdd-refactor`：重構
- `tdd-verify-complete`：TDD 完成確認

### 逆向工程指令
- `rev-tasks`：從既有程式逆生成任務列表
- `rev-design`：從既有程式逆生成設計文件
- `rev-specs`：從既有程式逆生成測試規格
- `rev-requirements`：從既有程式逆生成需求定義書

## 預設技術堆疊基準

若專案尚未定義專用技術堆疊，請先執行 `init-tech-stack` 或參考 `.github/prompts/tech-stack.prompt.md` 與下列預設。後續的 AI 協作或人工開發都應以此清單為準，技術決策調整時記得更新 README 與相關 Issue。

### 前端
- 框架：React 18+、Vue 3+ 或 Next.js
- 語言：TypeScript 5.0+
- 狀態管理：Redux Toolkit、Zustand 或 Pinia
- UI 套件：Material-UI、Tailwind CSS 或 shadcn/ui
- 打包工具：Vite 或 Webpack

### 後端與 API
- 框架：Express.js、Fastify 或 Next.js API Routes
- 語言：TypeScript 5.0+ 或 JavaScript ES2022+
- 資料層：PostgreSQL 15+、MySQL 8+ 或 SQLite
- ORM：Prisma、TypeORM 或 Drizzle
- 認證：JWT 或 NextAuth.js

### 快取與工作階段
- 快取：Redis 7+ 或 Memcached
- Session：Redis 或 MemoryStore

### 開發環境與工具
- Node.js：18+ LTS
- 套件管理：npm、yarn 或 pnpm
- 測試：Jest 或 Vitest（可搭配 Testing Library / Playwright）
- Linter：ESLint + Prettier
- 型別檢查：TypeScript strict mode
- CI/CD：GitHub Actions 或 GitLab CI

### 部署與基礎設施
- 前端託管：Vercel、Netlify 或 Cloudflare Pages
- 後端託管：Railway、Heroku、AWS、GCP
- 資料庫：託管型 PostgreSQL 或自管環境
- CDN：Cloudflare 或 AWS CloudFront

### API 與資料治理
- API 架構：REST 或 GraphQL
- 文件：OpenAPI/Swagger 或 GraphQL Schema
- 資料管理：正規化為原則，必要時搭配非正規化；遷移工具可選 Prisma Migrate、TypeORM Migrations 等
- 安全性：HTTPS、Bearer Token／API Key、伺服器端輸入驗證、妥善管理環境變數

### 效能與品質建議
- API 回應時間：3 秒內
- 首屏渲染：2 秒內
- 測試涵蓋率建議 80% 以上
- 無障礙：建議符合 WCAG 2.1 AA

符合專案需求後，請將實際採用的技術於 GitHub Issue／PR 中確認並回寫至本區，避免不同指令或代理使用過時設定。

## 快速開始

### 完整開發流程

```bash
# 1. 初始化技術堆疊
/init-tech-stack

# 2. 需求定義
/kairo-requirements

# 3. 設計
/kairo-design

# 4. 任務拆解
/kairo-tasks

# 5. 實作
/kairo-implement
```

### 個別 TDD 流程

```bash
/tdd-requirements
/tdd-testcases
/tdd-red
/tdd-green
/tdd-refactor
/tdd-verify-complete
```

### 逆向工程

```bash
# 1. 從既有程式分析任務結構
/rev-tasks

# 2. 逆生成設計文件（建議在任務分析後執行）
/rev-design

# 3. 逆生成測試規格（建議在取得設計文件後執行）
/rev-specs

# 4. 逆生成需求定義書（建議所有分析完成後執行）
/rev-requirements
```

### 清理開發環境

```bash
# 清理開發環境
/clear
```

## 在非 Claude Code 工具中使用 tsumiki

搭配 [rulesync](https://github.com/dyoshikawa/rulesync) 即可在非 Claude Code 的工具中使用 Tsumiki 指令。

執行 `tsumiki install` 後，請在專案根目錄執行下列指令：

```
npx -y rulesync init
npx -y rulesync config --init
npx -y rulesync import \
  --targets claudecode \
  --features commands,subagents

# 若要輸出 Gemini CLI 的自訂斜線指令，可改如下：
# （`--targets` 可指定 `claudecode`、`geminicli`、`roo`）
npx -y rulesync generate \
  --targets geminicli \
  --features commands

# 若目標 AI 編碼工具尚未提供自訂斜線指令，
# 可加上 `--experimental-simulate-commands` 嘗試輸出部分工具支援的指令檔。
# 例如輸出 Cursor 的自訂斜線指令：
npx -y rulesync generate \
  --targets cursor \
  --features commands \
  --experimental-simulate-commands
```

更多資訊請參考 [rulesync](https://github.com/dyoshikawa/rulesync) 的 README。

## 詳細手冊

如需了解更完整的使用方法、目錄結構、工作流程範例與疑難排解，請參考 [MANUAL.md](./MANUAL.md)。
