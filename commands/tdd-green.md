---
description: 執行 TDD 的 Green 階段。實作讓失敗的測試案例通過，並確認測試成功。
---

# TDD Green 階段（實作）

執行 TDD 的 Green 階段。

## 前置準備

請先整理開發脈絡：

1. **讀取追加規範**
   - 若存在 `AGENTS.md` 檔案，請讀取
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/tdd` 目錄，請讀取  
   - 若存在 `docs/rule/tdd/green` 目錄，請讀取
   - 讀取各目錄內所有檔案並作為追加規範套用

2. **使用 @agent-symbol-searcher 搜尋實作相關資訊並讀取**
   - 搜尋既有類似功能或共用函式，並使用 Read 工具讀取對應檔案
   - 確認實作模式與架構指引，並讀取相關設計文件
   - 檢視相依性與匯入路徑，並讀取相關檔案

3. **直接讀取相關檔案**
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md`：確認既有開發紀錄
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`：確認需求定義
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-testcases.md`：確認測試案例定義
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-red-phase.md`：確認 Red 階段建立的測試
   - 視需要讀取相關設計文件與任務檔案

完成讀取後，依據已準備的脈絡資訊開始 Green 階段（實作）。

**執行測試時請使用 Task 工具。**

## 信賴等級指引

撰寫實作程式碼時，請依與原始資料的對照情況，在註解中標示：

- 🔵 **藍燈**：幾乎完全根據原始資料，無須推測
- 🟡 **黃燈**：根據原始資料進行合理推測
- 🔴 **紅燈**：原始資料沒有對應內容，需自行推測

## 目標

完成能讓 Red 階段建立的測試全部通過的最小實作。

## 實作原則

- 優先確保測試通過
- 程式碼優化與整理留到 Refactor 階段
- 能運作即可接受，先確保行為正確
- 避免過度複雜的邏輯，使用最簡潔的解法
- 若測試久未通過，請用 Task 工具調查失敗原因後再規畫修正
- 若既有測試失敗，請依規格正確修正
- **限制使用模擬物件**：除測試程式外，不得在實作程式碼撰寫 mock/stub
- **控制檔案大小**：實作檔案超過 800 行應考慮拆分
- NEVER: 禁止略過必要測試
- NEVER: 禁止刪除必要測試
- NEVER: 禁止在實作程式碼撰寫 mock／stub
- NEVER: 禁止以記憶體暫存取代資料庫實際操作
- NEVER: 禁止省略必需的資料庫操作

## 實作註解要求

為便於後續審查，實作程式碼需加入以下繁體中文註解模板。

### 函式／方法層級註解

```javascript
/**
 * 【功能概要】：以繁體中文說明此函式的用途
 * 【實作方針】：說明採用此實作策略的理由
 * 【對應測試】：列出此實作要通過的測試案例
 * 🔵🟡🔴 信賴等級：標記與原始資料的對應程度
 * @param {type} paramName - 參數說明
 * @returns {type} - 回傳值說明
 */
function {{function_name}}(paramName) {
  // 【實作內容】：說明此區塊的處理流程
}
```

### 處理區塊層級註解

```javascript
function processData(input) {
  // 【輸入檢查】：說明為何以及如何檢查輸入值 🔵🟡🔴
  if (!input) {
    throw new Error('輸入值不合法'); // 【錯誤處理】：說明此錯誤處理的必要性 🔵🟡🔴
  }

  // 【資料處理開始】：宣告主要處理啟動 🔵🟡🔴
  // 【處理策略】：解釋此處如何協助測試通過 🔵🟡🔴
  const result = {
    // 【結果結構】：說明回傳結構與理由
    validData: [],
    invalidData: [],
    errors: [],
  };

  // 【回傳結果】：說明回傳內容的目的
  return result;
}
```

### 變數與常數註解

```javascript
// 【常數定義】：說明此常數的用途與必要性
const MAX_FILE_SIZE = 1024 * 1024; // 【限制值】：設定檔案大小上限（1MB）

// 【變數初始化】：說明此變數與測試通過的關聯
let processedCount = 0; // 【計數器】：追蹤已處理的檔案數量
```

### 錯誤處理註解

```javascript
try {
  // 【處理開始】：描述此處準備執行的作業
  executeProcess();
} catch (error) {
  // 【例外處理】：說明捕捉例外的原因與策略
  logError(error);
  // 【後續方針】：說明是否重試或回報錯誤
}
```

### return 語句註解

```javascript
function calculateResult(values) {
  // 【輸入整理】：說明前置整理的目的
  const normalizedValues = normalize(values);

  // 【主要處理】：描述計算邏輯
  const total = normalizedValues.reduce((sum, value) => sum + value, 0);

  // 【回傳結果】：說明回傳內容的理由與用途
  return {
    total,
    count: normalizedValues.length,
    average: total / normalizedValues.length,
  };
}
```

## 實作步驟

1. **理解測試需求**
   - 逐一確認 Red 階段新增的測試
   - 掌握測試資料、流程與預期結果

2. **規畫最小實作**
   - 釐清通過測試所需的最少修改
   - 優先滿足測試所需的行為

3. **撰寫程式碼**
   - 寫出讓測試通過的最小實作
   - 加入必要註解，標示信賴等級

4. **執行測試**
   - 使用 Task 工具呼叫測試指令（例如 `npm test`）
   - 確認新增測試與既有測試皆為綠燈

5. **紀錄結果**
   - 在備忘錄（memo）記錄修正內容
   - 記載失敗／通過的測試與對應處理

## 測試失敗時的對應

- 使用 Task 工具記錄失敗測試與錯誤訊息
- 調查失敗原因後再實作修正
- 需更新需求或測試時，務必同步更新對應文件

## 輸出

- 更新對應的實作檔案
- 於 `docs/implements/{要件名}/{{task_id}}/{feature_name}-green-phase.md` 紀錄：
  - 實作摘要與主要修改檔案
  - 測試結果（成功案例、失敗案例、後續行動）
  - 信賴等級標示與需要人工覆盤的事項

## 下一步

完成 Green 階段並確認測試綠燈後，進入 `/tdd-refactor` 進行重構與品質調整。
