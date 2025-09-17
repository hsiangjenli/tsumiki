# 4.3 API 開發實戰

## 學習目標

透過 RESTful API 的建置，體驗 AITDD 在真實 Web 專案中的應用：
- 面對外部依賴與非同步行為的流程
- 正確處理 HTTP 狀態碼與回應格式
- 規劃輸入驗證與錯誤處理
- 自動產出 API 文件
- 體驗接近正式環境的開發步驟

## 專案概觀：任務管理 API

沿用前章的任務管理邏輯，使用 Express.js 與 TypeScript 打造 RESTful API。

```http
GET    /api/tasks       # 取得全部任務
GET    /api/tasks/:id   # 取得指定任務
POST   /api/tasks       # 新增任務
PUT    /api/tasks/:id   # 更新任務
DELETE /api/tasks/:id   # 刪除任務
```

技術堆疊：Express.js、TypeScript、Jest + Supertest、express-validator、OpenAPI。

新增挑戰：HTTP 流程、非同步、輸入驗證、標準化錯誤回應等。

## 實作流程

### Step 1：建立 TODO 與分階段

仍遵守「一次整合 3 個功能」的原則，分成基礎、基本 API、進階 API、品質強化四個階段。

### Step 2：實作基礎

請 AI 撰寫規格（專案目錄、Express 設定、錯誤物件格式等），再生成對應測試與程式碼，執行 Red→Green→Refactor→Validation。

### Step 3：實作基本 API（GET 全部、GET 單筆、POST 新增）

為每個端點提供詳細規格、既有程式碼與限制條件，再要求 AI 依流程開發並撰寫測試。  
範例：回應格式、狀態碼、錯誤情境都要明確。  
實作後以 Supertest 撰寫整合測試。

### Step 4：實作進階 API（PUT、DELETE、條件搜尋）

- 更新：支援部分欄位更新，需驗證型別與長度。
- 刪除：決定採物理刪除或軟刪除並在規格註明。
- 搜尋：設計 `TaskFilter` 支援多條件。
- 強化驗證：使用 express-validator 封裝規則與錯誤處理。

### Step 5：品質強化

- 生成 OpenAPI 規格，方便 Swagger UI 顯示。  
- 補齊輸入驗證與錯誤格式。  
- 新增安全性標頭、效能測試。

## 常見問題與建議

| 問題 | 原因 | 解法 |
|------|------|------|
| AI 修改既有程式 | 未明示限制 | 明確說「禁止修改既有程式，只能新增」 |
| 測試不足 | 漏掉異常／邊界 | 對照清單補齊、撰寫整合測試 |
| 整合困難 | 一次實作太多功能 | 分階段開發、每個階段都做 Validation |

**Prompt 建議**：提供完整背景、限制條件與品質要求。  
**品質檢查清單**：功能、技術、測試、維護性皆確認。

## 收穫

- 體驗 AITDD 在 API 開發中的速度與穩定度（相較傳統可快上數倍）。
- 學會與 AI 協作的節奏：提供清楚需求、一步步檢查。
- 具備實戰能力：涵蓋非同步、錯誤處理、驗證、安全、效能。

下一章將聚焦在錯誤處理與偵錯技巧，讓整體流程更堅固。
