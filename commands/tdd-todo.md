---
description: 從任務檔案產出可執行的 TODO 清單，建立階段性實作計畫以支援高效率開發。
---

你是建立可執行 TODO 清單的專家。請分析 `kairo-tasks` 指令所生成的任務檔與相關設計文件，並依下列格式整理 TODO 清單。

## 輸入

- `docs/tasks/{要件名}-tasks.md`
- 各任務的 task_id（如 {{task_id}}）
- 需求定義文件：
  - `docs/spec/{要件名}-requirements.md`
- 設計文件群：
  - `docs/design/{要件名}/architecture.md`
  - `docs/design/{要件名}/database-schema.sql`
  - `docs/design/{要件名}/api-endpoints.md`
  - `docs/design/{要件名}/interfaces.ts`
  - `docs/design/{要件名}/dataflow.md`

## 建立步驟

1. **讀取追加規範**
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/tdd` 目錄，請讀取  
   - 若存在 `docs/rule/tdd/todo` 目錄，請讀取
   - 讀取各目錄內所有檔案並作為追加規範套用

2. **分析需求定義文件**
   - 使用 @agent-symbol-searcher 搜尋相關需求與設計文件
   - 理解 EARS 記法的需求描述
   - 掌握使用者故事與價值
   - 確認功能需求與非功能需求
   - 理解邊界情境與驗收標準

3. **分析設計文件**
   - 使用 @agent-symbol-searcher 搜尋既有架構樣式
   - 掌握整體架構設計
   - 理解資料庫結構
   - 確認 API 端點規格
   - 分析介面定義
   - 理解資料流程設計

4. **分析任務檔案**
   - 使用 @agent-symbol-searcher 搜尋相關 task_id 與完成狀態
   - 掌握整體階段結構
   - 確認各 task_id 的實作內容
   - 理解依存關係與執行順序
   - 確認與需求、設計文件的一致性

5. **製作 TODO 時的注意事項**
   - 保留 task_id 以維持可追溯性
   - 依依存關係決定順序
   - 明確定義每項任務的完成條件
   - 納入測試需求與 UI/UX 需求
   - 對應需求定義中的 REQ 編號
   - 將驗收標準反映在 TODO 項目
   - 將邊界情境的注意事項納入
   - 將設計文件細節轉化為實作 TODO
   - 確保與資料庫結構一致
   - 保持與 API 規格一致
   - 區分實作方式：
     - **DIRECT**：僅涉及設定（環境建置、設定檔、依賴安裝等）
     - **TDD**：需依規格實作（商業邏輯、API、UI 等）

6. **輸出格式**

```markdown
# {要件名} 實作 TODO 清單

## 概要

- 任務總數：{數量}
- 預估工時：{時間}
- 關鍵路徑：{TASK-001 → TASK-002 → ...}
- 對應需求：{REQ-001, REQ-002, ...}
- 參考設計文件：{主要參考文件摘要}

## TODO

### 階段 1：基礎建置

- [ ] **{{task_id}} [DIRECT]**：{任務名稱}（對應 REQ-{{XXX}}）
  - [ ] {實作細節 1（取自 architecture.md）}
  - [ ] {資料庫設定（取自 database-schema.sql）}
  - [ ] {測試要求 1}
  - [ ] {驗收標準（取自 requirements.md）}
  - [ ] {完成條件 1}

- [ ] **{{task_id}} [DIRECT]**：{任務名稱}（對應 REQ-{{XXX}}）
  - [ ] {實作細節 2（取自 dataflow.md）}
  - [ ] {環境設定項目}
  - [ ] {測試要求 2}
  - [ ] {驗收標準}
  - [ ] {完成條件 2}

### 階段 2：API 實作

- [ ] **{{task_id}} [TDD]**：{任務名稱}（對應 REQ-{{XXX}}）
  - [ ] {實作細節（取自 api-endpoints.md）}
  - [ ] {介面定義（取自 interfaces.ts）}
  - [ ] {測試要求 1}
  - [ ] {錯誤處理（取自邊界情境）}
  - [ ] {驗收標準}

### 階段 3：前端實作

- [ ] **{{task_id}} [TDD]**：{任務名稱}（對應 REQ-{{XXX}}）
  - [ ] {畫面實作細節（取自 interfaces.ts）}
  - [ ] {資料流程（取自 dataflow.md）}
  - [ ] {UI/UX 要求}
  - [ ] {可用性要求（取自 NFR-201）}
  - [ ] {測試要求 1}
  - [ ] {驗收標準}

### 階段 4：整合與最佳化

- [ ] **{{task_id}} [TDD]**：{任務名稱}（對應 REQ-{{XXX}}）
  - [ ] {跨模組整合項目}
  - [ ] {E2E 測試（取自 dataflow.md）}
  - [ ] {效能要求（取自 NFR-001）}
  - [ ] {安全性要求（取自 NFR-101）}
  - [ ] {測試要求}
  - [ ] {驗收標準}

## 建議執行順序

1. **基礎建置**（{TASK-IDs}）— 先建立各任務共用的環境
2. **API 實作**（{TASK-IDs}）— 供前端與其他模組使用
3. **前端實作**（{TASK-IDs}）— 實現使用者介面
4. **整合與最佳化**（{TASK-IDs}）— 確保最終品質

## 實作流程

### [TDD] 任務流程

1. `/{taskID}/tdd-requirements.md`：撰寫詳細需求（取自需求文件）
2. `/{taskID}/tdd-testcases.md`：建立測試案例（依驗收標準與邊界情境）
3. `/{taskID}/tdd-red.md`：撰寫會失敗的測試
4. `/{taskID}/tdd-green.md`：撰寫最小實作（遵循架構設計）
5. `/{taskID}/tdd-refactor.md`：重構並確認與設計一致
6. `/{taskID}/tdd-verify-complete.md`：依驗收標準完成品質驗證

### [DIRECT] 任務流程

1. `/{taskID}/direct-setup.md`：根據設計文件完成設定作業
2. `/{taskID}/direct-verify.md`：進行設定確認與基本測試

## 文件對應

- **{要件名}-requirements.md**：功能需求（REQ-XXX）、非功能需求（NFR-XXX）、驗收標準
- **architecture.md**：整體實作方針與架構樣式
- **database-schema.sql**：資料庫相關任務需參考的結構
- **api-endpoints.md**：API 任務的規格與驗證條件
- **interfaces.ts**：前後端契約定義
- **dataflow.md**：資料流程與整合測試情境
```

## 回饋調整

在提供 TODO 清單後，請依使用者回饋進行調整，並標註改動原因以確保可追蹤性。

## 輸出

請將結果寫入：`docs/implements/{要件名}/{{task_id}}/{feature_name}-todo.md`

內容應包含：
- 完整 TODO 清單（依階段與優先順序）
- 每項任務的完成條件與測試要求
- 對應的需求編號與設計文件參考
- 建議的執行順序與依存關係
- 必要的注意事項與風險提示
