# 8.2 文件化與維護性

為了讓 AITDD 在專案中可長期運作，本章說明如何把文件策略融入流程，並有效紀錄 AI 參與開發的決策與成果。

## 與 TDD 流程聯動的文件策略

### 在每個階段自動產生文件

在擴充版 TDD（Red → Green → Refactor → Validation）流程中，於每個步驟要求 AI 生成對應文件，建立一致的紀錄鏈。

#### 各階段的文件重點

- **Red**：測試需求與案例設計文件
  - 測試案例設計意圖
  - 預期行為說明
  - 對應功能需求

- **Green**：實作說明與技術判斷
  - 實作方針與流程
  - 核心演算法或邏輯
  - 技術選擇與理由

- **Refactor**：重構策略與差異摘要
  - 目的與效益
  - 調整內容與影響
  - 品質提升觀察

- **Validation**：品質檢查報告
  - 檢查項目與結果
  - 發現問題與處理方式
  - 最終品質評估

### 實作方式示例

#### 在提示語中要求產生文件
```
# Green 階段提示語範例
請同時輸出以下文件：
- implementation-notes.md：說明實作方針與技術判斷
- api-spec.md：API 介面與參數說明
- deployment-guide.md：部署注意事項
```

#### 讓 AI 主動整理內容
- 開發者僅需指定檔名與目的
- AI 依上下文填入詳細內容
- 減少手動撰寫文件的負擔
- 藉由既有文本維持一致語氣與品質

### 文件間的串接

```
# 提示語範例：請讀取前一階段資料
請參考以下文件，維持前後一致：
- test-design.md（Red 階段）
- implementation-notes.md（Green 階段）
```

- 在提示語中約定檔名命名規則
- 指示 AI 自動讀取對應檔案
- 需要時可同時引用多個文件
- 讓每個階段承接上一階段成果

## AI 生成程式碼的註解策略

### 讓 AI 多寫註解

- 請 AI 產生程式碼時一併加入詳盡註解
- 說明函式或方法的目的與流程
- 註記為何採用此實作方式
- 補充使用方式與注意事項

#### 範例：提供註解範本
```typescript
/**
 * 處理使用者登入驗證
 * @param credentials 使用者名稱與密碼
 * @returns Promise<AuthResult> 認證結果
 * @throws AuthenticationError 驗證失敗時拋出
 */
async function authenticate(credentials: UserCredentials): Promise<AuthResult> {
    // 驗證輸入格式是否正確
    validateCredentials(credentials);

    // 從資料庫取得使用者資料
    const user = await userRepository.findByUsername(credentials.username);

    // 比對密碼
    const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

    if (!isValid) {
        throw new AuthenticationError('Invalid credentials');
    }

    return { success: true, user };
}
```

- 以範例教育 AI 使用一致的註解風格
- 在整個專案中維持統一格式
- 透過註解保留設計推理

### 註解分類與應用
- **概要註解**：描述檔案、類別、函式目的
- **程序註解**：針對複雜步驟補充說明
- **TODO 註解**：紀錄後續改善或待確認的事項
- **警示註解**：標示重要限制或副作用

## 追蹤性（Traceability）

### 紀錄設計決策

- 於各階段輸出說明檔，記錄決策過程
- 保存與 AI 的互動記錄與最終產出
- 清楚交代選擇某方案的原因

#### 範例：`design-decisions.md`
```markdown
## 認證系統的設計

### 決策內容
採用 JWT 進行 Session 管理

### 背景
- 架構需維持無狀態
- 支援微服務間的身份共享
- 必須與行動裝置應用合作

### 曾考慮的方案
1. 傳統 Session（放棄：不利於分散式環境）
2. OAuth 2.0（放棄：依賴外部服務）

### 實作注意事項
- Access Token 有效期 1 小時
- 搭配 Refresh Token 自動換發
```

- 讓後續人員能還原當時的脈絡
- 從宏觀決策追溯到實作細節
- 清楚標示每個重要判斷的依據

## 長期維護考量

- 定期檢視 AI 生成的文件是否需要人工補充
- 將文件與程式碼同步納入審查流程
- 建立文件版本管理與回顧節奏

妥善的文件與註解策略，能讓 AITDD 的開發成果更容易交接、擴充與迭代。
