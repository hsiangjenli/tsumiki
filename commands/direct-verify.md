---
description: 確認 DIRECT 任務的設定作業是否正確套用，並透過測試驗證系統行為。
---

# direct-verify

## 目的

檢查 `direct-setup` 完成的設定是否正確，並驗證系統是否依預期運作。

## 前提

- 已執行 `direct-setup.md`
- 提供 task_id
- 有設定作業記錄

## 執行內容

**重要**：若偵測到 `direct-setup` 建立的檔案存在編譯或語法錯誤，會嘗試自動修正。

1. **讀取追加規範**：`docs/rule` → `docs/rule/direct` → `docs/rule/direct/verify`
2. **讀取技術堆疊定義**：`docs/tech-stack.md` → `CLAUDE.md` → `.claude/commands/tech-stack.md`
3. **檢查設定**：
   - 依技術堆疊決定檢查項目
   - 搜尋設定範例並讀取
   - 檢視 `docs/implements/{要件名}/{TASK-ID}/setup-report.md`
   - 確認環境變數、設定檔、依賴安裝、服務啟動狀態
4. **語法／編譯檢查**：
   - TypeScript/JavaScript
   - JSON、YAML 等設定檔
   - SQL（如適用）
5. **動作測試**：
   - 搜尋既有測試指令並執行
   - 基本動作、連線、權限、錯誤案例
6. **品質檢查**：
   - 安全設定
   - 效能基準
   - 日誌狀態

## 輸出位置

在 `docs/implements/{要件名}/{TASK-ID}/` 建立 `verify-report.md` 紀錄檢查結果。

## 輸出範例

````markdown
# {TASK-ID} 設定檢查與動作測試

## 確認概要
- **任務 ID**：{TASK-ID}
- **檢查內容**：{概要}
- **執行時間**：{時間}
- **執行者**：{負責人}

## 設定確認結果

### 1. 環境變數
```bash
echo $NODE_ENV
echo $DATABASE_URL
```
- [x] NODE_ENV: development
- [x] DATABASE_URL: postgresql://localhost:5432/mydb

### 2. 設定檔
- 檔案：`config/database.json`
```bash
cat config/database.json | jq .
```
- [x] 檔案存在
- [x] JSON 語法正確
- [x] 含必要設定

## 結構／語法檢查

### TypeScript / JavaScript
```bash
npx tsc --noEmit --skipLibCheck
node --check *.js
```
- [x] TS 語法正常
- [x] JS 語法正常

### 設定檔
```bash
cat config/*.json | jq empty
yamllint config/*.yml
```
- [x] JSON 正常
- [x] YAML 正常

### SQL（如適用）
```bash
psql -d mydb --single-transaction --set ON_ERROR_STOP=on -f schema.sql --dry-run
```
- [x] SQL 語法正常

### 依賴套件
```bash
npm list express pg
```
- [x] express 已安裝
- [x] pg 已安裝

### 資料庫連線
```bash
psql -d mydb -c "SELECT 1;"
```
- [x] 連線成功

## 動作測試

### 基本測試
```bash
node -e "console.log('Hello, World!');"
```
- [x] Node.js 環境正常

### 資料庫測試
```javascript
const { Pool } = require('pg');
...
```
- [x] 連線、查詢、結束皆正常

### 安全性檢查
```bash
ls -la config/
ps aux | grep node
```
- [x] 檔案權限適當
- [x] 程式權限合理
- [x] 機敏資訊受到保護

## 品質檢查
- [x] 啟動時間 ≤ 2 秒
- [x] 記憶體 ≤ 256MB
- [x] CPU ≤ 10%
- [x] 日誌無異常

## 總結
- [x] 設定套用成功
- [x] 動作測試通過
- [x] 品質標準符合
- [x] 可承接下一任務

## 問題與解法
- 若偵測到錯誤會嘗試自動修正（TS/JS、JSON/YAML、SQL、import/require）
- 例：
```bash
sed -i 's/typo/correct/g' config.js
npm install missing-package
jq '.port = 3000' config.json > tmp.json && mv tmp.json config.json
```
- 紀錄每項問題的狀態（已解決／仍需人工）

## 建議事項
- {必要時填寫}

## 下一步
- 任務完工報告
- 準備後續任務
- 視需要調整設定
````

## 執行後檢查
- 已建立 `verify-report.md`
- 所有檢查項目皆完成
- 問題已處理或列入建議
- 任務完成條件符合
- 下一步準備就緒

## 目錄確認
`docs/implements/{要件名}/{TASK-ID}/` 應存在（由 direct-setup 建立）。

## 自動標記任務完成
滿足下列條件即自動更新 `docs/tasks/` 的對應任務勾選狀態：
- [ ] 設定檢查全部通過
- [ ] 語法／編譯無錯（或已修正）
- [ ] 動作測試全部成功
