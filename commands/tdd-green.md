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
   - 讀取各目錄內的所有檔案並作為追加規範套用

2. **使用 @agent-symbol-searcher 搜尋實作相關資訊並讀取**
   - 搜尋既有的類似功能或公用函式，並使用 Read 工具讀取對應檔案
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

撰寫實作程式碼時，請依與原始資料的對照情況，以下列訊號在註解中標示：

- 🔵 **藍燈**：幾乎完全根據原始資料，無須推測
- 🟡 **黃燈**：根據原始資料進行合理推測
- 🔴 **紅燈**：原始資料沒有對應內容，需自行推測

## 目標

請完成 **讓 Red 階段建立的測試通過** 的實作。

## 實作原則

- **最優先確保測試通過**
- 程式碼美觀可留待 Refactor 階段改善
- 「能動」即可接受
- 避免複雜邏輯，先以簡潔實作解決
- 若測試久未通過，請用 Task 工具調查失敗原因後再規畫修正
- 若既有測試失敗，請依規格正確修正
- **限制使用模擬物件**：除測試程式外，不得在實作程式碼撰寫 mock/stub
- **控制檔案大小**：實作檔案超過 800 行時應考慮拆分
- NEVER: 禁止略過必要測試
- NEVER: 禁止刪除必要測試
- NEVER: 禁止在實作程式碼撰寫 mock／stub
- NEVER: 禁止在實作程式碼以記憶體儲存體取代資料庫
- NEVER: 禁止省略實作程式碼中的資料庫操作

## 實作時的日文註解要求

實作程式碼中必須包含以下日文註解：

### 函式／方法層級註解

```javascript
/**
 * 【機能概要】: [以日文說明此函式的作用]
 * 【実装方針】: [以日文說明為何採用此實作方針]
 * 【テスト対応】: [標示此實作要讓哪些測試通過]
 * 🔵🟡🔴 信頼性レベル: [註明依據原始資料的程度]
 * @param {type} paramName - [參數說明]
 * @returns {type} - [回傳值說明]
 */
function {{function_name}}(paramName) {
  // 【実装内容】: [以日文詳述此處實作的處理]
}
```

### 處理區塊層級註解

```javascript
function processData(input) {
  // 【入力値検証】: [說明為何以及如何檢查輸入值] 🔵🟡🔴
  if (!input) {
    throw new Error('入力値が不正です'); // 【エラー処理】: [說明為何需要此錯誤處理] 🔵🟡🔴
  }

  // 【データ処理開始】: [宣告主要處理開始] 🔵🟡🔴
  // 【処理方針】: [說明此處如何幫助測試通過] 🔵🟡🔴
  const result = {
    // 【結果構造】: [說明回傳結構與理由]
    validData: [],
    invalidData: [],
    errors: [],
  };

  // 【結果返却】: [說明回傳結果的理由與內容]
  return result;
}
```

### 變數與常數註解

```javascript
// 【定数定義】: [說明此常數的必要性與用途]
const MAX_FILE_SIZE = 1024 * 1024; // 【制限値】: 設定檔案大小上限（1MB）

// 【変数初期化】: [說明此變數與測試通過的關聯]
let processedCount = 0; // 【カウンタ】: 追蹤已處理的檔案數量
```

### 錯誤處理註解

```javascript
try {
  // 【処理開始】: [說明此處開始嘗試的處理]
  executeProcess();
} catch (error) {
  // 【例外処理】: [說明捕捉例外的原因與對應策略]
  logError(error);
  // 【再実行方針】: [說明是否重試或回報錯誤]
}
```

### return 語句註解

```javascript
function calculateResult(values) {
  // 【入力整形】: [說明前置整理的目的]
  const normalizedValues = normalize(values);

  // 【メイン処理】: [說明主要計算的內容]
  const total = normalizedValues.reduce((sum, value) => sum + value, 0);

  // 【結果返却】: [說明回傳內容的理由與用途]
  return {
    total,
    count: normalizedValues.length,
    average: total / normalizedValues.length,
  };
}
```

## 実装手順

1. **理解テストの要件**
   - Red 階段で新增的測試案例逐一確認
   - 掌握測試資料、流程與期待結果

2. **最小実装の計画**
   - 釐清通過測試所需的最少修改
   - 實作時優先滿足測試期待結果

3. **コード実装**
   - 撰寫能讓測試通過的最小實作
   - 僅在必要範圍內修改既有架構

4. **テスト実行**
   - 執行相關測試並確認失敗測試已通過
   - 若仍失敗，使用 Task 工具調查原因後修正

5. **コード整理**
   - 確認新增程式碼符合 Comment 要求
   - 紀錄已完成的實作內容以利 Refactor 階段

## 📦 機能実装のための情報整理テンプレート

```markdown
## Greenフェーズ実装計画

### ✅ 対象テストケース
- テストケースID: {{test_case_id}}
- テスト概要: {{test_case_summary}}
- 期待される動作: {{expected_behavior}}

### 🔍 実装対象の機能
- 関連するモジュール/クラス: {{module_name}}
- 必要な関数/メソッド: {{function_list}}
- 依存関係: {{dependencies}}

### 🛠 実装方針
- 最小実装戦略: {{minimal_strategy}}
- 注意すべき仕様: {{important_constraints}}
- 切り分け戦略: {{split_strategy}}

### 📄 必要なリファレンス
- 既存実装の参照箇所: {{existing_code_refs}}
- 利用するユーティリティ: {{utility_functions}}
- 遵守すべきコード規約: {{coding_guidelines}}

### 🎯 完了条件
- テストが通過すること
- 日本語コメントの追加
- TODOの更新
```

## テスト実行時の注意

- 測試必須通過；若新測試仍失敗，請繼續修正
- 若因實作導致其他測試失敗，請依規格修正
- 執行測試時可傳回測試輸出以利調整

## 完了後に実施すること

1. 執行對應測試，確認先前失敗的測試已通過
2. 若新增實作需要更新測試資料或設定，請同步處理
3. 將實作內容記錄至 `docs/implements/{要件名}/{{task_id}}/{feature_name}-green-phase.md`
4. 更新 `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md` 中 Green 階段的欄位
5. 更新 TODO，標記 Green 階段完成並加入 Refactor 階段
6. 顯示建議下一步：「下一步建議：請執行 `/tdd-refactor` 進行品質改善。」

## TDD 筆記檔記錄格式（Green 階段）

```markdown
## Greenフェーズ（最小実装）

### 実装日時
- [日期時間]

### 実装内容
- [以日文記錄實作概要]

### 変更ファイル
- [列出修改的檔案]

### 実装方針
- [說明為何採用此實作策略]

### テスト実行
- コマンド: `{{test_command}}`
- 実行結果: [貼上或概述結果]

### 課題・改善点
- [留待 Refactor 階段的事項]
```

## 品質チェックリスト

```
✅ 測試確實通過
✅ 實作僅包含通過測試所需的最小修改
✅ 日本語註解齊全且內容正確
✅ 無未使用的程式碼
✅ 未跳過或移除必要測試
```

## TODO 更新樣板

```
- 將 TODO「Green 階段（最小實作）」標記為 completed
- 在 TODO 中紀錄測試已通過與關鍵成果
- 新增「Refactor 階段（品質改善）」的 TODO
```

下一步：請執行 `/tdd-refactor` 進行品質改善。
