# 預設技術堆疊定義

當找不到專案專用的技術堆疊定義檔時，會使用此預設定義。

## 優先順序

1. **專案專用**：`docs/tech-stack.md`
2. **專案例共享**：`CLAUDE.md` 的技術堆疊章節  
3. **預設**：本定義檔

## 預設技術堆疊

### 前端
- **框架**：React 18+、Vue 3+ 或 Next.js
- **語言**：TypeScript 5.0+
- **狀態管理**：Redux Toolkit、Zustand 或 Pinia
- **UI 套件**：Material-UI、Tailwind CSS 或 shadcn/ui
- **打包工具**：Vite 或 Webpack

### 後端
- **框架**：Express.js、Fastify 或 Next.js API Routes
- **語言**：TypeScript 5.0+ 或 JavaScript ES2022+
- **資料庫**：PostgreSQL 15+、MySQL 8+ 或 SQLite
- **ORM**：Prisma、TypeORM 或 Drizzle
- **身分驗證**：JWT 或 NextAuth.js

### 快取／工作階段
- **快取**：Redis 7+ 或 Memcached
- **工作階段**：Redis 或 MemoryStore

### 開發環境
- **容器**：Docker + Docker Compose
- **套件管理器**：npm、yarn 或 pnpm
- **Node.js**：18+ LTS

### 開發工具
- **測試框架**：Jest 或 Vitest
- **測試套件**：Testing Library 或 Playwright
- **Linter**：ESLint + Prettier
- **型別檢查**：TypeScript
- **CI/CD**：GitHub Actions 或 GitLab CI

### 部署與基礎設施
- **前端**：Vercel、Netlify 或 Cloudflare Pages
- **後端**：Railway、Heroku、AWS 或 GCP
- **資料庫**：托管型 PostgreSQL 或自管環境
- **CDN**：Cloudflare 或 AWS CloudFront

## API 設計
- **架構**：RESTful API 或 GraphQL
- **文件**：OpenAPI/Swagger 或 GraphQL Schema
- **認證方式**：Bearer Token（JWT）或 API Key

## 資料管理
- **資料庫設計**：正規化為原則，必要時搭配非正規化
- **遷移工具**：Prisma Migrate、TypeORM Migrations 等
- **備份**：建議啟用自動備份

## 安全性
- **HTTPS**：必須
- **CORS**：妥善設定
- **認證策略**：JWT + Refresh Token 模式
- **驗證**：伺服器端參數驗證必須
- **環境變數**：妥善管理機敏資訊

## 效能需求
- **API 回應時間**：3 秒內
- **前端初次渲染**：2 秒內
- **資料庫查詢**：妥善建立索引
- **快取策略**：設定適當 TTL

## 品質標準
- **測試涵蓋率**：建議 80% 以上
- **程式碼品質**：ESLint + Prettier
- **型別安全**：啟用 TypeScript strict mode
- **無障礙**：建議符合 WCAG 2.1 AA

## 推薦目錄結構

```
project/
├── docs/                    # 文件
│   ├── spec/               # 需求定義
│   ├── design/             # 設計文件
│   └── tasks/              # 任務管理
├── src/                    # 原始碼
│   ├── components/         # UI 元件
│   ├── services/           # 商業邏輯
│   ├── types/              # 型別定義
│   └── utils/              # 公用函式
├── tests/                  # 測試檔案
├── prisma/                 # 資料庫結構
├── docker-compose.yml      # 開發環境設定
└── package.json            # 相依套件
```

## 使用方式

以下情況會參考本預設定義：

1. 尚未建立 `docs/tech-stack.md`
2. `CLAUDE.md` 中沒有技術堆疊資訊
3. 新專案的初始設定階段

若專案有自訂技術選擇，請建立 `docs/tech-stack.md` 覆寫此預設。
