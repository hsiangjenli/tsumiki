---
description: 執行 DIRECT 任務的環境設定作業。依設計文件完成環境建置、設定檔建立、依賴安裝等工作。
---

# direct-setup

## 目的

執行 DIRECT 任務所需的設定作業，依設計文件進行環境建置、設定檔建立與依賴安裝。

## 前提條件

- 已提供 task_id
- 相關設計文件已備妥
- 擁有必要權限與環境

## 執行內容

1. **讀取追加規範**
   - 若存在 `docs/rule` 目錄，請讀取
   - 若存在 `docs/rule/direct` 目錄，請讀取  
   - 若存在 `docs/rule/direct/setup` 目錄，請讀取
   - 讀取各目錄內所有檔案並套用規範

2. **讀取技術堆疊定義**
   - 若存在 `docs/tech-stack.md`，請讀取
   - 若不存在，請自 `CLAUDE.md` 讀取技術堆疊章節  
   - 若兩者皆無，使用 `.claude/commands/tech-stack.md` 預設定義

3. **確認設計文件**
   - 依技術堆疊定義鎖定相關檔案
   - 使用 @agent-symbol-searcher 搜尋並讀取相關設計與設定範例
   - 使用 Read 工具讀取 `docs/design/{要件名}/architecture.md`
   - 使用 Read 工具讀取 `docs/design/{要件名}/database-schema.sql`
   - 視需要讀取其他設計文件

4. **執行設定作業**
   - 使用 @agent-symbol-searcher 搜尋既有設定檔或環境變數，並讀取
   - 設定環境變數
   - 建立或更新設定檔
   - 安裝依賴套件
   - 初始化資料庫
   - 設定服務啟動方式
   - 調整權限

5. **撰寫作業記錄**
   - 紀錄執行的指令
   - 紀錄設定變更
   - 紀錄遇到的問題與解法

## 輸出位置

請在 `docs/implements/{要件名}/{TASK-ID}/` 目錄建立以下檔案：
- `setup-report.md`：設定作業報告

## 輸出格式範例

````markdown
# {TASK-ID} 設定作業

## 作業概要

- **タスクID**: {TASK-ID}
- **作業内容**: {設定作業概要}
- **実行日時**: {執行時間}
- **実行者**: {執行者}

## 設計文書参照

- **參考文件**: {參考的設計文件清單}
- **相關需求**: {REQ-XXX, REQ-YYY}

## 実行した作業

### 1. 環境變數設定

```bash
# 執行指令
export NODE_ENV=development
export DATABASE_URL=postgresql://localhost:5432/mydb
```
````

**設定內容**：

- NODE_ENV：設定為開發環境
- DATABASE_URL：PostgreSQL 連線字串

### 2. 建立設定檔

**檔案**：`config/database.json`

```json
{
  "development": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb"
  }
}
```

### 3. 安裝依賴

```bash
# 執行指令
npm install express pg
```

**安裝內容**：

- express：Web 框架
- pg：PostgreSQL 客戶端

### 4. 初始化資料庫

```bash
# 執行指令
createdb mydb
psql -d mydb -f database-schema.sql
```

**執行內容**：

- 建立資料庫
- 套用資料庫結構

## 作業結果

- [ ] 環境變數設定完成
- [ ] 設定檔建立完成
- [ ] 依賴安裝完成
- [ ] 資料庫初始化完成
- [ ] 服務啟動設定完成

## 遭遇問題與解法

### 問題 1：{問題概要}

- **發生情況**：{問題發生時的情境}
- **錯誤訊息**：{錯誤訊息}
- **解決方式**：{解法}

## 下一步

- 執行 `direct-verify.md` 確認設定
- 視需要調整設定

## 執行後確認
- 確認 `docs/implements/{要件名}/{TASK-ID}/setup-report.md` 已建立
- 確認設定已正確套用
- 準備好執行下一步（direct-verify）

## 建立目錄

執行前請建立必要目錄：
```bash
mkdir -p docs/implements/{要件名}/{TASK-ID}
```
