---
description: 執行 TDD 的 Refactor 階段。在測試通過後進行程式碼品質改善與重構。
---

# TDD Refactor 階段（程式碼改善）

執行 TDD 的 Refactor 階段。

## 前置準備

請先整理開發脈絡：

1. **讀取追加規範**
   - 若存在 `AGENTS.md` 檔案，請讀取
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/tdd` 目錄，請讀取  
   - 若存在 `docs/rule/tdd/refactor` 目錄，請讀取
   - 讀取各目錄內的所有檔案並作為追加規範套用

2. **使用 @agent-symbol-searcher 搜尋重構相關資訊並讀取**
   - 搜尋既有程式碼風格與最佳實務，讀取樣式指南
   - 確認專案整體架構模式，讀取設計文件
   - 找出可重複使用的工具函式或元件，讀取相關檔案

3. **直接讀取相關檔案**
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md`：確認既有開發紀錄
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`：確認需求定義
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-testcases.md`：確認測試案例
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-green-phase.md`：確認 Green 階段實作
   - 視需要讀取相關設計文件與任務檔案

完成讀取後，依據已準備的脈絡資訊開始 Refactor 階段（程式碼改善）。

## 信賴等級指引

進行重構時，請對每項改善內容標示與原始資料的對照狀態：

- 🔵 **藍燈**：完全依據原始資料，幾乎無推測
- 🟡 **黃燈**：根據原始資料合理推測
- 🔴 **紅燈**：無對應資料，需自行推測

## 目標

請在 **維持測試全數通過** 的前提下，針對 Green 階段的程式碼進行下列改善。

## 改善面向

### 1. 可讀性

- 改善變數與函式命名
- 充實日文註解
- 優化程式結構

### 2. 消除重複（DRY）

- 共用重複流程
- 抽出常數
- 建立輔助函式

### 3. 設計品質

- 應用單一職責原則
- 梳理相依關係
- 檢討模組化邊界

- NEVER: 不得在實作程式碼撰寫 mock/stub
- NEVER: 不得以記憶體儲存取代資料庫實作

### 4. 檔案大小最佳化

- 儘量維持每個檔案少於 500 行
- 拆分過於龐大的檔案
- 設定合理模組界線

### 5. 程式碼品質

- 排除 lint 錯誤
- 排除 typecheck 錯誤
- 統一格式
- 通過靜態分析

### 6. 安全性檢查

- 找出並修正潛在脆弱點
- 加強輸入檢查
- 確認 SQL Injection 防護
- 確認 XSS 防護
- 確認 CSRF 防護
- 避免資料外洩
- 確認認證與授權邏輯

### 7. 效能檢查

- 分析演算法複雜度
- 優化記憶體使用
- 移除多餘處理
- 規畫快取策略
- 最佳化資料庫查詢
- 提升迴圈效率
- 正確實作非同步流程

### 8. 錯誤處理

- 強化輸入驗證
- 提供明確錯誤訊息
- 改善例外處理

## 重構時的日文註解要求

請改善既有日文註解並新增必要註解：

### 改善後的函式／方法註解

```javascript
/**
 * 【機能概要】: [重構後的功能說明]
 * 【改善内容】: [重構做了哪些調整]
 * 【設計方針】: [採用此設計的理由]
 * 【パフォーマンス】: [效能考量]
 * 【保守性】: [保養性考量]
 * 🔵🟡🔴 信頼性レベル: [註記資料依據]
 * @param {type} paramName - [參數說明與限制]
 * @returns {type} - [回傳值說明與保證]
 */
function improvedFunction(paramName) {
  // 【実装詳細】: [重構後的實作內容與理由]
}
```

### 輔助函式／工具函式

```javascript
/**
 * 【ヘルパー関数】: [此函式的角色與建立原因]
 * 【再利用性】: [可重複使用的情境]
 * 【単一責任】: [此函式負責的範圍]
 */
function helperFunction(input) {
  // 【処理効率化】: [提升效率的作法] 🔵🟡🔴
  // 【可読性向上】: [提升可讀性的作法] 🔵🟡🔴
}
```

### 常數與設定值

```javascript
// 【設定定数】: [此常數的角色與設定理由] 🔵🟡🔴
// 【調整可能性】: [未來可調整的方式與理由] 🔵🟡🔴
const IMPROVED_CONSTANT = 100; // 【最適化済み】: 根據效能測試調整 🔵🟡🔴

// 【設定オブジェクト】: [集中管理設定的理由]
const CONFIG = {
  // 【各設定項目】: [每個設定值的意義與影響]
  maxRetries: 3, // 【リトライ回数】: 依實務經驗設定
  timeout: 5000, // 【タイムアウト】: 兼顧體驗的時間
};
```

### 錯誤處理改善

```javascript
try {
  // 【処理開始】: [說明欲執行的主要處理]
  executeProcess();
} catch (error) {
  // 【例外処理】: [說明如何處理例外]
  logError(error);
  // 【復旧方針】: [說明恢復策略或告警方式]
}
```

### return 敘述

```javascript
function calculateResult(values) {
  // 【入力整形】: [整理輸入資料的目的]
  const normalizedValues = normalize(values);

  // 【メイン処理】: [主要計算內容]
  const total = normalizedValues.reduce((sum, value) => sum + value, 0);

  // 【結果返却】: [說明回傳物件的意義]
  return {
    total,
    count: normalizedValues.length,
    average: total / normalizedValues.length,
  };
}
```

## 重構流程

1. **確認測試通過**：以現有實作執行測試，確保基準狀態
2. **規畫改善項目**：針對可讀性、設計、效能等面向列出清單
3. **逐項重構**：小步驟進行修改，每次修改後立即執行測試
4. **文件更新**：同步更新日文註解與相關文件
5. **整體驗證**：全部改善完成後再次執行測試並檢查 lint／typecheck

## 品質檢查清單

```
✅ 測試全部通過
✅ lint／typecheck 無錯誤
✅ 不再使用暫時性程式碼
✅ 日文註解完整且易懂
✅ 無重複程式碼或冗餘邏輯
✅ 安全性與效能檢查已完成
```

## 成果記錄

- 將重構內容記錄於 `docs/implements/{要件名}/{{task_id}}/{feature_name}-refactor.md`
- 更新 `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md` 中的 Refactor 區塊
- 在文件中描述主要改善點、測試結果與後續建議

## TODO 更新樣板

```
- 將 TODO「Refactor 階段（程式碼改善）」標記為 completed
- 在 TODO 中紀錄重構成果與品質檢查結果
- 新增「Verify 階段（完整性確認）」的 TODO
```

下一步：請執行 `/tdd-verify-complete` 進行完整性驗證。
