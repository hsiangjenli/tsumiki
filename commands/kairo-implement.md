---
description: 依序或依使用者指定執行剩餘任務，並善用既有 TDD 指令完成高品質實作。
---
你是實作負責人。請檢視剩餘任務，並運用指令完成實作。

# kairo-implement

## 目的

依序或依使用者指派的任務進行實作，並善用現有 TDD 指令提升品質。

## 前提

- `docs/tasks/{要件名}-tasks.md` 已列出任務
- 使用者已同意開始實作
- TDD 系列指令可使用
- 已設定實作用工作目錄
- 任務 ID 採 `TASK-0000` 格式

## 執行內容

**【信賴等級指引】**：各項資訊請標示 🔵（確定）、🟡（推測）、🔴（臆測）。

1. **讀取追加規範**
   - `docs/rule`
   - `docs/rule/kairo`
   - `docs/rule/kairo/implement`

2. **讀取技術堆疊定義**
   - 優先使用 `docs/tech-stack.md`
   - 若無則使用 `CLAUDE.md`
   - 若皆無則使用 `.claude/commands/tech-stack.md`

3. **選擇任務**
   - 使用 @agent-symbol-searcher 搜尋指定 task_id
   - 若使用者指定任務則優先
   - 若未指定則依依存順序自動選擇
   - 顯示任務細節並依技術堆疊決定實作策略

4. **確認依存關係**
   - 搜尋依存任務狀態
   - 若存在未完成依存任務，提示使用者

5. **準備工作環境**
   - 於既有工作目錄作業
   - 視需要確認目錄結構

6. **判斷實作型態**
   - 分析任務是程式實作或設定作業
   - 決定採用 TDD 流程或直接作業流程

7. **執行實作流程**

   ### A. TDD 流程（程式實作）
   1. `@task general-purpose tdd-requirements.md`
   2. `@task general-purpose tdd-testcases.md`
   3. `@task general-purpose tdd-red.md`
   4. `@task general-purpose tdd-green.md`
   5. `@task general-purpose tdd-refactor.md`
   6. `@task general-purpose tdd-verify-complete.md`

   ### B. 直接作業流程（設定／文件等）
   1. `@task general-purpose direct-setup.md`
   2. `@task general-purpose direct-verify.md`

## 注意事項

### TDD 流程
- 先寫測試並確認失敗再實作
- 小步驟前進，避免一次實作過多
- 每一步都重新評估品質，避免新增技術債

### 直接作業流程
- 依依存順序逐步執行
- 建立或調整設定後務必驗證
- 同步更新文件讓其他開發者易懂

## 輸出格式

### 任務開始（TDD）
```
🚀 任務 {{task_id}}：開始實作 {{task_name}}

📋 任務細節：
- 對應需求：REQ-101, REQ-102
- 依賴任務：{{依賴任務ID}} ✅
- 預估時間：4 小時
- 實作類型：TDD 流程

🔄 啟動 TDD 流程...
```

### 任務開始（直接作業）
```
🚀 任務 {{task_id}}：開始實作 {{task_name}}

📋 任務細節：
- 對應需求：REQ-402, REQ-006
- 依賴任務：{{依賴任務ID}} ✅
- 預估時間：3 小時
- 實作類型：直接作業流程

🔧 開始準備作業...
```

### 流程進度（TDD 範例）
```
✅ Task 1/6: @task tdd-requirements 完成
   檔案：docs/implements/{要件名}/{{task_id}}/{要件名}-requirements.md
   Task 執行結果：需求定義文件已建立

🏃 Task 2/6: @task tdd-testcases 執行中...
```

### 流程進度（直接作業範例）
```
✅ Task 1/2: @task direct-work-execute 完成
   建立檔案：8 個，設定更新：3 項
   Task 執行結果：準備作業完成

🏃 Task 2/2: @task direct-work-verify 執行中...
```

### 任務完成（TDD）
```
🎉 任務 {{task_id}} 完成！

✅ 已更新任務檔的核取方塊
   - [ ] **任務完成** → [x] **任務完成**

📊 實作摘要：
- 實作類型：TDD 流程
- 執行步驟：6（全部成功）
- 建立檔案：12
- 測試案例：25（全部成功）
- 涵蓋率：95%
- 花費時間：3 小時 45 分

📝 下一個建議任務：
- {{下一任務ID}}：{{下一任務名稱}}
- {{相關任務ID}}：{{相關任務名稱}}

是否繼續實作？ (y/n)
```

### 任務完成（直接作業）
```
🎉 任務 {{task_id}} 完成！

✅ 已更新任務檔的核取方塊
   - [ ] **任務完成** → [x] **任務完成**

📊 實作摘要：
- 實作類型：直接作業流程
- 執行步驟：2（全部成功）
- 建立檔案：8
- 設定更新：3
- 環境檢查：正常
- 花費時間：2 小時 30 分
```

## 其他提醒

- 完成任務後請更新對應任務檔的核取方塊
- 若需持續實作其他任務，提示下一個建議任務
- 若遇到未完依存任務，請詢問使用者是否要改先處理
