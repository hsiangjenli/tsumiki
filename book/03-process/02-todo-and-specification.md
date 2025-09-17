# 3.2 建立 TODO 與訂定規格

## 建立 TODO：開發的起點

### 為什麼 TODO 很重要
在 AITDD 中，清楚的 TODO 是成功關鍵。模糊的任務會讓後續流程全部卡關，因此必須建立「清楚、可執行」的 TODO。

### 高品質 TODO 的原則

#### 1. 具體說明
```markdown
❌ 不佳：「實作使用者管理功能」
✅ 合適：「實作使用者註冊（email/password 驗證）」
```

#### 2. 適當的顆粒度
- **過大**：一個 TODO 涵蓋多個功能
- **過小**：只處理單一函式或變數
- **最佳**：一項可完整交付的功能

#### 3. 明確的完成條件
```markdown
## TODO: 實作使用者註冊 API

### 完成條件
- [ ] POST /api/users 端點
- [ ] email/password 驗證
- [ ] 密碼雜湊
- [ ] 寫入資料庫
- [ ] 統一回應格式
```

### 建議的 TODO 檔案結構

```markdown
# 專案 TODO

## 計畫中
### 高優先順序
- [ ] **使用者認證功能**
  - 說明：利用 JWT 完成登入流程
  - 完成條件：登入／登出／驗證 Token
  - 依賴：資料庫設計完成

### 中優先順序
- [ ] **商品搜尋**
  - 說明：依關鍵字與類別搜尋
  - 完成條件：搜尋 API + 篩選功能

## 進行中
- [x] 設計資料庫（2024-06-21 完成）

## 已完成
- [x] 初始化專案（2024-06-20 完成）
```

#### 相關檔案建議
```
docs/
├── todo.md                      # 主 TODO
├── implements/
│   ├── TASK-101/
│   │   ├── user-auth-requirements.md
│   │   └── user-auth-testcases.md
│   └── TASK-201/
│       └── search-requirements.md
└── archive/
    └── completed-todos.md        # 歷史紀錄
```

## 訂定規格：設計的基礎

### 目的
將 TODO 轉為具體技術規格，避免後續實作時方向不明。

### 規格文件範本
```markdown
# [功能名稱] 要件定義

## 概要
簡述功能目的

## 功能需求
### 基本功能
- 核心需求

### 詳細規格
- 輸入項目與驗證
- 主要流程
- 輸出格式

### 非功能需求
- 效能
- 資安
- 可用性

## 技術規格
### API
- URL
- 請求／回應格式
- 狀態碼

### 資料庫
- 表格設計
- 索引
- 約束

### 錯誤處理
- 情境
- 訊息
- 日誌策略

## 限制條件
- 技術限制
- 商務限制
- 外部依賴

## 參考資料
- 相關文件
- 外部 API
```

### 範例：使用者註冊
```markdown
# 使用者註冊 要件定義

## 概要
提供 email/password 的新用戶註冊

## 功能需求
### 基本功能
- email/password 註冊
- email 重複驗證
- 密碼強度檢查

### 詳細規格
#### 輸入
- **email**：必填，符合 email 格式，最多 254 字
- **password**：必填，至少 8 字，含大小寫、數字、符號
- **password_confirmation**：必填，需與 password 相同

#### 驗證
- 查詢 email 是否已存在
- 密碼強度檢查
- CSRF Token 驗證

#### 流程
1. 驗證輸入
2. 檢查 email 重複
3. 用 bcrypt 雜湊密碼
4. 寫入資料庫
5. 回傳成功結果

### 非功能需求
- 回應時間 ≤ 2 秒
- 支援 100 req/sec 的併發
- 密碼必須雜湊

## 技術規格
### API
```http
POST /api/users
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}

Response (201):
{
  "id": 123,
  "email": "user@example.com",
  "created_at": "2024-06-21T10:00:00Z"
}

Response (400):
{
  "error": "validation_failed",
  "details": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

### 資料庫
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### 錯誤處理
- **400**：驗證錯誤、email 重複
- **429**：流量限制
- **500**：伺服器錯誤

## 限制
- 密碼禁止明文儲存
- 本階段不含 email 驗證
- 不含第三方登入
```

## 人工審查重點

### 檢查清單
- [ ] 功能是否完整
- [ ] 是否考慮所有邊界情境
- [ ] 錯誤處理是否合理
- [ ] 技術可行且符合效能與資安要求
- [ ] 與其他模組一致
- [ ] 易於維護與測試

### 審查建議
- 可參考 AI 建議，但最終決定由人掌控
- 採取「概要→細節→技術」的逐步細化模式

## 訂定規格的最佳實務

1. **用明確句子描述需求**  
   例如用「回傳 400 並附訊息」取代「妥善處理」。

2. **提供量化指標**  
   如「2 秒內回應」，而非「快速」。

3. **明列限制條件**  
   如「密碼必須經 bcrypt 雜湊」。

4. **考慮可測試性**  
   確保每項要求都能透過測試驗證。

## 下一步

完成規格後，即可進入 [測試案例設計](./03-test-case-creation.md)。

### 確認項目
- [ ] `todo.md` 已更新
- [ ] `requirements.md` 內容完整
- [ ] 無模糊描述
- [ ] 完成人工審查

### 常見問題
- **規格模糊** → 立即審查並提出問題
- **過度依賴 AI** → AI 只作為參考，最後由人決定
- **忽略非功能需求** → 使用檢查清單逐一確認

做好規格，後續撰寫測試與實作才會順利。
