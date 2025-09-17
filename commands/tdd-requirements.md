---
description: 整理 TDD 開發所需的需求，明確化功能要求並為測試驅動開發做準備。
---
你負責彙整開發需求。請依據 TASK 提供的資料，全面整理必要功能。

# TDD 需求定義與功能規格整理

準備開始 TDD 開發。請針對下列功能整理需求：

**【功能名稱】**：{{feature_name}}

## 前置準備

請先整理開發脈絡：

1. **讀取追加規範**
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/tdd` 目錄，請讀取  
   - 若存在 `docs/rule/tdd/requirements` 目錄，請讀取
   - 讀取各目錄內所有檔案並作為追加規範套用

2. **讀取技術堆疊定義**
   - 若存在 `docs/tech-stack.md`，請讀取
   - 若不存在，請自 `CLAUDE.md` 讀取技術堆疊章節  
   - 若兩者皆無，請使用 `.claude/commands/tech-stack.md` 的預設定義

3. **使用 @agent-symbol-searcher 搜尋功能相關資訊並讀取**
   - 依據技術堆疊定義搜尋相關檔案
   - 搜尋相關的既有功能或元件並使用 Read 工具讀取
   - 找出相似的實作模式與架構，並讀取設計文件
   - 確認既有介面與 API 規格並讀取相關檔案

4. **直接讀取相關檔案**
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md`：確認既有開發紀錄
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`：確認既有需求定義
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-testcases.md`：確認既有測試案例
   - 視需要讀取相關設計文件與任務檔案

完成讀取後，依據已準備的脈絡資訊開始 TDD 需求整理作業。

## TDD 需求整理格式

**【信賴等級指引】**：
請對每個項目標示與原始資料（包含 EARS 需求定義與設計文件）的對照狀態：

- 🔵 **藍燈**：完全依據 EARS 需求或設計文件，幾乎無推測
- 🟡 **黃燈**：根據 EARS 需求或設計文件合理推測
- 🔴 **紅燈**：原始資料無對應內容，需要自行推測

## 1. 功能概要（以 EARS 需求與設計文件為基礎）

- 對每個項目標示 🔵🟡🔴
- 功能用途（取自使用者故事）
- 要解決的問題（As a / So that）
- 預期使用者（As a）
- 在系統中的定位（取自架構設計）
- **參考的 EARS 需求**：[具體需求 ID]
- **參考的設計文件**：[architecture.md 對應段落]

## 2. 輸入與輸出規格（以 EARS 功能需求與 TypeScript 型別為基礎）

- 對每個項目標示 🔵🟡🔴
- 輸入參數（型別、範圍、限制）－取自 interfaces.ts
- 輸出值（型別、格式、範例）－取自 interfaces.ts
- 輸入輸出的關聯性
- 資料流程（取自 dataflow.md）
- **參考的 EARS 需求**：[具體 REQ-XXX]
- **參考的設計文件**：[interfaces.ts 對應介面]

## 3. 限制條件（以 EARS 非功能需求與架構設計為基礎）

- 對每個項目標示 🔵🟡🔴
- 效能需求（取自 NFR-XXX）
- 安全需求（取自 NFR-XXX）
- 相容性需求（取自 REQ-XXX MUST）
- 架構限制（取自 architecture.md）
- 資料庫限制（取自 database-schema.sql）
- API 限制（取自 api-endpoints.md）
- **參考的 EARS 需求**：[具體 NFR-XXX、REQ-XXX]
- **參考的設計文件**：[architecture.md、database-schema.sql 等對應段落]

## 4. 預期使用情境（以 EARS 邊界需求與資料流程為基礎）

- 對每個項目標示 🔵🟡🔴
- 基本操作情境（取自通常需求 REQ-XXX）
- 資料流程（取自 dataflow.md）
- 邊界情境（取自 EDGE-XXX）
- 錯誤情境（取自 EDGE-XXX 的錯誤處理）
- **參考的 EARS 需求**：[具體 EDGE-XXX]
- **參考的設計文件**：[dataflow.md 對應流程圖]

## 5. EARS 需求與設計文件對應

當參考既有 EARS 需求或設計文件時，請明確標示：

- **參考的使用者故事**：[故事名稱]
- **參考的功能需求**：[REQ-001, REQ-002, ...]
- **參考的非功能需求**：[NFR-001, NFR-101, ...]
- **參考的邊界情境**：[EDGE-001, EDGE-101, ...]
- **參考的驗收標準**：[具體測試項目]
- **參考的設計文件**：
  - **架構**：[architecture.md 對應段落]
  - **資料流程**：[dataflow.md 對應流程圖]
  - **型別定義**：[interfaces.ts 對應介面]
  - **資料庫**：[database-schema.sql 對應資料表]
  - **API 規格**：[api-endpoints.md 對應端點]

整理完成後，請執行：

1. 將需求定義寫入 `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`（若已存在則追加）
2. 更新 TODO 狀態（標記需求整理完成）
3. **品質評估**：依下列標準判定需求品質
   - 無模糊描述
   - 入出規格完整
   - 限制條件清楚
   - 確定可實作
4. **提示下一步**：無論品質評估結果為何，顯示建議指令
   - 「下一步建議：執行 `/tdd-testcases` 進行測試案例篩選。」

## 品質評估標準

```
✅ 高品質：
- 需求無模糊之處
- 入出定義完整
- 限制條件明確
- 實作可行性明確

⚠️ 需改善：
- 需求存在模糊之處
- 入出細節不清楚
- 技術限制不明確
- 需進一步確認使用者意圖
```

## TODO 更新樣板

```
- 將目前 TODO 標記為 completed
- 在 TODO 中紀錄需求定義已完成
- 新增「測試案例篩選」的 TODO
- 在 TODO 中紀錄品質評估結果
```

下一步：請執行 `/tdd-testcases` 進行測試案例篩選。
