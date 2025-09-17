---
description: 執行 TDD 的 Red 階段。撰寫會失敗的測試案例，明確界定應實作的功能。
---

# TDD Red 階段（撰寫會失敗的測試）

執行 TDD 的 Red 階段。

## 前置準備

請先整理開發脈絡：

1. **讀取追加規範**
   - 若存在 `AGENTS.md` 檔案，請讀取
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/tdd` 目錄，請讀取  
   - 若存在 `docs/rule/tdd/red` 目錄，請讀取
   - 讀取各目錄內的所有檔案並作為追加規範套用

2. **讀取技術堆疊定義**
   - 若存在 `docs/tech-stack.md`，請讀取
   - 若不存在，請從 `CLAUDE.md` 讀取技術堆疊章節  
   - 若兩者皆無，則使用 `.claude/commands/tech-stack.md` 中的預設定義

3. **使用 @agent-symbol-searcher 搜尋測試實作相關資訊並讀取找到的檔案**
   - 依據已讀取的技術堆疊定義辨識應使用的測試框架
   - **若為 UI 任務**：優先確認 E2E 測試框架（例如 Playwright）的設定與範例
   - 搜尋既有的測試檔案與測試函式，並使用 Read 工具讀取對應檔案
   - 找出測試設定與模擬物件的使用模式，並使用 Read 工具讀取相關檔案
   - **E2E 測試設定確認**：使用 Read 工具讀取 playwright.config.js、cypress.config.js 等設定檔

4. **直接讀取相關檔案**
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md`：確認既有開發紀錄
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`：確認需求定義
   - `docs/implements/{要件名}/{{task_id}}/{feature_name}-testcases.md`：確認測試案例定義
   - 視需要讀取相關設計文件與任務檔案

完成讀取後，依據已準備的脈絡資訊開始 Red 階段（建立會失敗的測試）。

## 目標測試案例

**【目標測試案例】**：{{test_case_name}}

## 測試案例新增目標數量

**測試案例新增目標數量**：10 個以上（若可用的測試案例少於 10 個，則全數新增）

請自未實作的測試案例中選出至少 10 個實作；若可用案例少於 10 個，請全部納入實作範圍。
若已有部分測試案例完成，請依測試案例定義文件補齊其餘測試。
請新增能提升需求覆蓋率與功能覆蓋率的測試案例。
NEVER: 請以每個測試案例最多約 500 行為目標分割測試檔。

## 信賴等級指引

撰寫測試程式碼時，請依與原始資料的對照情況，以下列訊號在註解中標示：

- 🔵 **藍燈**：幾乎完全根據原始資料，無須推測
- 🟡 **黃燈**：根據原始資料進行合理推測
- 🔴 **紅燈**：原始資料沒有對應內容，需自行推測

## 要求

- **使用語言／框架**：依據已讀取的技術堆疊定義
- 測試必須保證會失敗
- 測試名稱請以易懂的日文撰寫
- 明確描述斷言（期待值驗證）
- 以呼叫尚未實作的函式或方法的方式撰寫

## 🎯 UI 開發任務的 **E2E 測試優先** 方針

**針對 UI 元件或介面功能的開發任務，請最優先利用 E2E 測試（特別是 Playwright）：**

### 🚀 **必須** 使用 E2E 測試的情境

- **使用者介面動作確認**：UI 元件的顯示／隱藏與狀態變化
- **畫面切換與導覽驗證**：頁面跳轉與路由運作
- **表單輸入與送出功能測試**：輸入驗證、錯誤處理與送出後流程
- **使用者互動**：點擊、輸入、捲動、拖放等操作
- **瀏覽器特性確認**：跨瀏覽器相容性
- **響應式設計驗證**：因應不同螢幕尺寸的版面調整
- **無障礙檢查**：鍵盤操作、螢幕閱讀器支援
- **效能確認**：載入時間與繪製速度

#### E2E 測試撰寫原則
- **模擬真實使用者操作**：將點擊、輸入、導覽等行為納入測試
- **全流程情境**：測試從登入到完成目標操作的完整旅程
- **視覺檢查**：包含畫面顯示、元素位置與樣式確認
- **多瀏覽器驗證**：在主要瀏覽器上確認行為
- **響應式驗證**：針對不同螢幕尺寸檢查

### 🥇 **強力推薦使用 Playwright**

**UI 任務原則上請使用 Playwright：**

#### 1. **Playwright**（🎯 最優先）
   - ✅ 支援多種瀏覽器（Chrome、Firefox、Safari）
   - ✅ 執行快速且穩定
   - ✅ 斷言與選擇器功能豐富
   - ✅ 自動等待機制（自動等待元素顯示／隱藏）
   - ✅ 支援網路監看與模擬
   - ✅ 可產生截圖與錄影
   - ✅ 內建效能量測
   - ✅ 整合無障礙測試

#### 2. **Cypress**（補充選項）
   - 提供開發者友善的 API
   - 具備即時偵錯功能
   - ※ 受限於單一分頁執行

#### 3. **WebDriver／Selenium**（僅限因應舊系統）
   - 擁有廣泛瀏覽器支援
   - 生態系成熟
   - ※ 設定較繁瑣且執行速度較慢

## 🧭 測試策略選擇指南

### UI 相關任務 → **優先撰寫 E2E 測試**
- 建立或修改元件
- 建立頁面或調整版面
- 實作使用者互動
- 實作表單功能
- 導覽與路由

### 商業邏輯／API 任務 → **優先撰寫單元／整合測試**
- 資料處理演算法
- 驗證函式
- API 端點
- 資料庫操作
- 公用程式函式

## 測試程式碼撰寫指引

### E2E 測試建議結構
- 採用 **Scenario-Given-When-Then** 模式
- **情境定義**：描述要測試的使用者旅程
- **初始狀態（Given）**：頁面存取、登入狀態等
- **使用者操作（When）**：點擊、輸入、導覽等
- **結果驗證（Then）**：畫面顯示、狀態變化、頁面跳轉

### 單元／整合測試建議結構
- 採用 **Given-When-Then** 模式
- 準備測試資料（Given）
- 執行實際處理（When）
- 驗證結果（Then）

## 必填的日文註解要求

測試程式碼中必須包含以下日文註解：

### 測試案例開頭註解

```javascript
describe('{{feature_name}}', () => {
  test('{{test_case_name}}', () => {
    // 【テスト目的】: [請用日文清楚說明此測試要確認的內容]
    // 【テスト内容】: [用日文描述測試具體流程]
    // 【期待される動作】: [用日文說明預期結果]
    // 🔵🟡🔴 信頼性レベル: [標示此內容與原始資料的對應程度]

    // 【テストデータ準備】: [為何要準備這組資料]
    // 【初期条件設定】: [執行測試前的狀態說明]
    const input = {{test_input}};

    // 【実際の処理実行】: [説明呼叫哪個功能或方法]
    // 【処理内容】: [以日文說明執行內容]
    const result = {{function_name}}(input);

    // 【結果検証】: [具體說明驗證項目]
    // 【期待値確認】: [解釋期待值與理由]
    expect(result).toBe({{expected_output}}); // 【確認内容】: [此驗證檢查的具體項目] 🔵🟡🔴
  });
});
```

### 需要前置與收尾的情境

```javascript
beforeEach(() => {
  // 【テスト前準備】: 說明每次測試前的準備工作
  // 【環境初期化】: 說明如何保持測試環境乾淨
});

afterEach(() => {
  // 【テスト後処理】: 說明每次測試後的清理作業
  // 【状態復元】: 說明為何要還原狀態以免影響後續測試
});
```

### 每個 expect 敘述的註解

請在每個 expect 敘述後加上日文註解：

```javascript
expect(result.property).toBe(expectedValue); // 【確認内容】: 說明為何要比對此屬性
expect(result.array).toHaveLength(3); // 【確認内容】: 說明為何要檢查陣列長度
expect(result.errors).toContain('error message'); // 【確認内容】: 說明為何要確認錯誤訊息
```

## 範例測試程式碼

### 單元／整合測試範例

```javascript
// テストファイル: {{test_file_name}}
describe('{{feature_name}}', () => {
  beforeEach(() => {
    // 【テスト前準備】: 在每次測試前初始化環境，確保條件一致
    // 【環境初期化】: 為避免受前一次測試影響，重設檔案系統狀態
  });

  afterEach(() => {
    // 【テスト後処理】: 刪除測試產生的暫存檔案或目錄
    // 【状態復元】: 還原系統狀態以避免影響下一次測試
  });

  test('{{test_case_name}}', () => {
    // 【テスト目的】: {{test_purpose}}
    // 【テスト内容】: {{test_description}}
    // 【期待される動作】: {{expected_behavior}}
    // 🔵🟡🔴 信頼性レベル: [標示資料可靠度]

    // 【テストデータ準備】: {{test_data_reason}}
    // 【初期条件設定】: {{initial_condition}}
    const input = {{test_input}};

    // 【実際の処理実行】: {{function_description}}
    // 【処理内容】: {{process_description}}
    const result = {{function_name}}(input);

    // 【結果検証】: {{verification_description}}
    // 【期待値確認】: {{expected_result_reason}}
    expect(result).toBe({{expected_output}}); // 【確認内容】: {{specific_verification_point}}
  });
});
```

### UI 任務的 Playwright E2E 測試範例

```javascript
// E2Eテストファイル: tests/e2e/{{feature_name}}.spec.js
import { test, expect } from '@playwright/test';

describe('{{feature_name}} E2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    // 【E2Eテスト前準備】: 啟動瀏覽器並前往目標頁面
    // 【環境初期化】: 為讓各測試獨立執行而重置頁面狀態
    await page.goto('/{{target_page}}');
  });

  test('{{ui_test_case_name}}', async ({ page }) => {
    // 【テスト目的】: {{ui_test_purpose}}
    // 【テスト内容】: {{ui_test_description}}
    // 【期待される動作】: {{expected_ui_behavior}}
    // 🔵🟡🔴 信頼性レベル: [標示資料可靠度]

    // 【初期状態確認】: {{initial_ui_state_reason}}
    // 【画面表示確認】: {{screen_display_verification}}
    await expect(page.locator('{{initial_element_selector}}')).toBeVisible();
    // 【確認内容】: 確認初始狀態下必要元素已顯示

    // 【ユーザー操作実行】: {{user_action_description}}
    // 【操作内容】: {{specific_action_description}}
    await page.click('{{target_button_selector}}');
    await page.fill('{{input_selector}}', '{{test_input_value}}');
    await page.click('{{submit_button_selector}}');

    // 【結果確認】: {{ui_result_verification}}
    // 【期待される表示変化】: {{expected_ui_changes}}
    await expect(page.locator('{{result_element_selector}}')).toContainText('{{expected_text}}');
    // 【確認内容】: {{specific_ui_verification_point}}

    // 【追加検証】: {{additional_verification_description}}
    await expect(page).toHaveURL('{{expected_url}}');
    // 【確認内容】: 確認已導向正確頁面
  });

  test('{{responsive_test_case_name}}', async ({ page }) => {
    // 【テスト目的】: 確認響應式設計運作
    // 【テスト内容】: 驗證不同螢幕尺寸下的 UI 顯示與可用性
    // 【期待される動作】: 在手機、平板與桌機尺寸皆能正常顯示
    // 🔵🟡🔴 信頼性レベル: [標示資料可靠度]

    // 【画面サイズ設定】: 設定為手機尺寸進行檢查
    // 【レスポンシブ確認】: 測試小螢幕下的元素排列與可用性
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 【モバイル表示確認】: 確認套用行動版版面
    await expect(page.locator('{{mobile_navigation_selector}}')).toBeVisible();
    // 【確認内容】: 行動版導覽應顯示

    // 【タブレットサイズ設定】: 設定為平板尺寸
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // 【タブレット表示確認】: 確認平板版面呈現
    await expect(page.locator('{{tablet_layout_selector}}')).toBeVisible();
    // 【確認内容】: 平板專用版面應正確顯示
  });
});
```

### 無障礙測試範例

```javascript
// アクセシビリティテストファイル: tests/e2e/accessibility/{{feature_name}}.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

describe('{{feature_name}} アクセシビリティテスト', () => {
  test('{{accessibility_test_case_name}}', async ({ page }) => {
    // 【テスト目的】: 確認符合 WCAG 等無障礙指引
    // 【テスト内容】: 自動化無障礙檢查與鍵盤操作測試
    // 【期待される動作】: 無障礙違規為零且可用鍵盤操作
    // 🔵🟡🔴 信頼性レベル: [標示資料可靠度]

    // 【ページ読み込み】: 前往測試頁面
    await page.goto('/{{target_page}}');

    // 【自動アクセシビリティ検査】: 使用 axe-core 進行自動檢測
    // 【WCAG準拠確認】: 檢查色彩對比、ALT 文字、標籤等
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    // 【確認内容】: 確認未發現無障礙違規

    // 【キーボード操作確認】: 驗證 Tab 鍵的焦點移動
    // 【操作性確認】: 確認不用滑鼠也可完成所有操作
    await page.keyboard.press('Tab');
    await expect(page.locator('{{first_focusable_element}}')).toBeFocused();
    // 【確認内容】: 焦點應移至第一個可聚焦元素
  });
});
```

## 請提供以下內容

1. **測試程式碼**：可執行，且包含必要的日文註解
2. **測試執行指令**：說明如何執行測試
3. **預期失敗訊息**：說明會出現的錯誤
4. **註解說明**：解釋各日文註解的目的

### E2E 測試執行指令範例

#### Playwright
```bash
# 執行所有 E2E 測試
npx playwright test

# 執行特定測試檔
npx playwright test tests/e2e/{{feature_name}}.spec.js

# 以非 Headless 模式執行（顯示瀏覽器）
npx playwright test --headed

# 指定瀏覽器執行
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# 以除錯模式執行
npx playwright test --debug

# 產生報告
npx playwright show-report
```

#### Cypress
```bash
# 開啟 Cypress Test Runner
npx cypress open

# 以 Headless 模式執行測試
npx cypress run

# 執行特定測試檔
npx cypress run --spec "cypress/e2e/{{feature_name}}.cy.js"

# 指定瀏覽器執行
npx cypress run --browser chrome
```

完成測試程式碼後，請執行下列事項：

1. **建立或更新筆記檔**：在 `docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md` 新增或更新 Red 階段內容
   - 若已有筆記檔，請更新 Red 階段區塊
   - 若筆記檔不存在，請新建
2. 將測試程式設計內容寫入 `docs/implements/{要件名}/{{task_id}}/{feature_name}-red-phase.md`（若已存在則追加）
3. 更新 TODO 狀態（標記 Red 階段完成）
4. **品質判定**：依下列基準評估測試程式品質
   - 測試可執行且確認會失敗
   - 期待值明確具體
   - 斷言適切
   - 實作方針清楚
5. **提示下一步**：無論判定結果為何，都請顯示下一個建議指令
   - 「下一步建議：請執行 `/tdd-green` 開始 Green 階段（最小實作）。」

## TDD 筆記檔格式

`docs/implements/{要件名}/{{task_id}}/{feature_name}-memo.md` 的格式：

```markdown
# TDD開発メモ: {feature_name}

## 概要

- 機能名: [功能名稱]
- 開発開始: [日期時間]
- 現在のフェーズ: [Red/Green/Refactor]

## 関連ファイル

- 元タスクファイル: `docs/tasks/{taskファイルのパス}.md`
- 要件定義: `docs/implements/{要件名}/{{task_id}}/{feature_name}-requirements.md`
- テストケース定義: `docs/implements/{要件名}/{{task_id}}/{feature_name}-testcases.md`
- 実装ファイル: `[實作檔案路徑]`
- テストファイル: `[測試檔案路徑]`

## Redフェーズ（失敗するテスト作成）

### 作成日時

[日期時間]

### テストケース

[建立的測試案例概要]

### テストコード

[實際的測試程式碼]

### 期待される失敗

[預期出現哪些失敗]

### 次のフェーズへの要求事項

[Green 階段需實作的內容]

## Greenフェーズ（最小実装）

### 実装日時

[日期時間]

### 実装方針

[最小實作方針]

### 実装コード

[實際的實作程式碼]

### テスト結果

[測試通過結果]

### 課題・改善点

[Refactor 階段需改善的事項]

## Refactorフェーズ（品質改善）

### リファクタ日時

[日期時間]

### 改善内容

[具體改善內容]

### セキュリティレビュー

[安全性檢查結果]

### パフォーマンスレビュー

[效能檢查結果]

### 最終コード

[重構後的程式碼]

### 品質評価

[最終品質評估]
```

## 品質判定基準

```
✅ 高品質：
- 測試可執行，且已確認會失敗
- 期待值明確且具體
- 斷言適切
- 實作方針清楚

⚠️ 需改善：
- 測試無法執行
- 期待值含糊
- 實作策略不明
- 測試案例過度複雜
```

## TODO 更新樣板

```
- 將目前的 TODO「Red 階段（失敗測試建立）」標記為 completed
- 在 TODO 內容記錄本階段已完成
- 在 TODO 內容註記品質評估結果
- 新增下一階段「Green 階段（最小實作）」的 TODO
```

下一步：請執行 `/tdd-green` 進行最小實作以讓測試通過。
