---
description: 依據設計文件將實作任務切割為每日粒度，並以月度階段管理；為每個階段建立專屬任務檔並維護依存順序。
---

# kairo-tasks

## 目的

根據設計文件將實作工作拆解為可於 1 天內完成的任務，並以約 1 個月（20 個工作天）為單位分成多個階段。每個階段建立獨立任務檔，維持依存關係與正確順序。

## 前提

- `docs/design/{要件名}/` 已存在設計文件
- 使用者已核准設計內容（或已同意略過）
- `docs/tasks/` 目錄已存在（若無請建立）
- 可先以英文思考，但輸出檔案必須以繁體中文撰寫
- NEVER: `task_id` 必須為 `TASK-0000` 格式（例如 TASK-0001）

## 執行內容

**【信賴等級指引】**：針對每項資訊標示 🔵（確定）、🟡（推測）、🔴（臆測）。

1. **讀取追加規範**
   - `docs/rule`
   - `docs/rule/kairo`
   - `docs/rule/kairo/tasks`

2. **讀取技術堆疊定義**
   - 優先使用 `docs/tech-stack.md`
   - 若無則使用 `CLAUDE.md`
   - 若皆無則使用 `.claude/commands/tech-stack.md`

3. **分析設計文件**
   - 使用 @agent-symbol-searcher 搜尋並讀取：
     - `architecture.md`
     - `database-schema.sql`
     - `api-endpoints.md`
     - `interfaces.ts`
     - `dataflow.md`
   - 依技術堆疊確認要採用的技術

4. **檢查既有任務檔**
   - 搜尋 `docs/tasks/{要件名}-*.md`
   - 找出已使用的 task_id
   - 指派不重複的編號

5. **列出任務**
   - 基礎任務（環境、資料庫等）
   - 後端任務（API 等）
   - 前端任務（依畫面或元件分解）
   - 整合任務（E2E、跨模組測試）

6. **分析依存關係**
   - 明確任務間依存
   - 標出可併行的工作
   - 找出關鍵路徑

7. **細化任務內容**
   - 任務 ID（TASK-0000）
   - 任務名稱
   - 任務類型：
     - **TDD**：程式實作、測試等開發工作
     - **DIRECT**：環境設定、文件、建置設定等準備工作
   - 對應需求連結
   - 依存任務
   - 實作細節、完成條件
   - 單元／整合測試要求
   - UI/UX 要件（如載入狀態、錯誤、響應式、無障礙）

8. **決定執行順序**
   - 依依存關係排序
   - 標記里程碑
   - 將可併行任務分組

9. **階段切分**
   - 任務粒度為 1 天（預設 8 小時）
   - 每個階段總工時不超過 180 小時、文件行數不超過 500 行
   - 按架構層級切分階段
   - 不可省略預先討論的分割準則

10. **建立檔案**
    - 每個檔案使用 `@task` 產生
    - 為每個階段建立繁體中文任務檔，內容不可刪減
    - 範例：
      - `docs/tasks/{要件名}-phase1.md`
      - `docs/tasks/{要件名}-phase2.md`
      - …
      - `docs/tasks/{要件名}-overview.md`
    - 各任務需有核取方塊與需求名稱

## 檔案結構

- `docs/tasks/{要件名}-overview.md`：總覽與階段清單
- `docs/tasks/{要件名}-phase1.md`：階段 1 詳細任務
- `docs/tasks/{要件名}-phase2.md`：階段 2 詳細任務
- 依階段數量新增更多檔案

## 必備內容

### overview.md
- 專案概要（期間、工時、任務總數）
- 階段表格（期間、成果、任務數、工時、檔案連結）
- 使用過的 task_id 與下一個起始編號
- 全局進度核取方塊
- 里程碑定義

### phase*.md
- 階段概要（期間、目標、產出）
- 週目標（Week 1~4）
- 每日任務（TASK-0000，每日 8 小時）
- 每個任務需包含：
  - 核取方塊
  - 預估工時、任務類型
  - 需求連結、依存任務、需求名稱
  - 實作細節、完成條件
  - 測試要求（TDD 任務）

## 任務流程

### TDD 任務
1. `tdd-requirements.md`
2. `tdd-testcases.md`
3. `tdd-red.md`
4. `tdd-green.md`
5. `tdd-refactor.md`
6. `tdd-verify-complete.md`

### DIRECT 任務
1. `direct-setup.md`
2. `direct-verify.md`

## 執行流程摘要

1. 讀取規範：`docs/rule` → `docs/rule/kairo` → `docs/rule/kairo/tasks`
2. 讀取技術堆疊：`docs/tech-stack.md` → `CLAUDE.md` → `.claude/commands/tech-stack.md`
3. 分析設計文件：透過 @agent-symbol-searcher + Read
4. 確認既有任務：萃取使用過的 task_id
5. 列出任務：依基礎→後端→前端→整合順序
6. 切分階段：限制 180 小時、500 行
7. 建立檔案：生成 overview 與各階段檔案

## 品質標準

- 階段總工時 ≤ 180 小時、檔案行數 < 500 行
- 任務粒度為每日 8 小時
- task_id 唯一且使用 TASK-0000 格式
- 每個任務都有核取方塊與明確的完成條件
- 依存順序清楚，需先完成前置任務
