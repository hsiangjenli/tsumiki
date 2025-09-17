# 2.3 建立開發環境與工作流程

本章說明如何打造適合 AITDD 的開發環境與工作流程。除了準備工具，更重要的是將整個開發過程系統化，確保品質與效率並重。

## 導入 AITDD 的實際歷程與方法演進

### 導入時間軸

#### 2025 年初開始的正式嘗試
**起點：**
- Claude Sonnet 3.5 與 DeepSeek R1 蒸餾模型問世
- 確認 AI 已能處理一定程度的實作工作
- 強烈感受到手動開發的瓶頸

**約 5～6 個月的累積經驗：**
- 從嘗試到逐步建立方法論
- 探索出提示設計的最佳化模式
- 透過失敗案例淬鍊出最佳實務

### 方法演進

#### 第一階段：即時協作（Live Coding）
**特色：**
- 與 AI 同步對話、即時寫程式
- 在小型功能實作上效果佳
- 可隨時調整並獲得快速回饋

**適合的情境：**
- 單一檔案的小改動
- 快速建立原型
- 技術研究與樣板程式

**遇到的瓶頸：**
- 一旦規模變大容易失控
- 難以管理複雜依賴
- 品質一致性不足

#### 第二階段：結合 TDD（現行方法）
**問題意識：**
- Live Coding 難以支撐大型專案
- 缺乏明確的品質保證機制
- 需要維持架構一致性的流程

**解方：**
- 結合 **TDD**（測試驅動開發）
- 建立 **Red-Green-Refactor-Validation** 循環
- 打造完整且可複製的工作流程

**導入前後比較：**
```
過去（Live Coding）：
需求 → 直接實作 → 測試 → 修正 → 完成

現在（AITDD）：
需求 → 建立 TODO → Red → Green → Refactor → Validation → 完成
           ↑                                           ↓
           ←←←←←←←←← 形成穩定的回饋迴圈 ←←←←←←←←←
```

### 實際建立工作流程的經驗

#### 最佳化專案結構
**初期問題：**
- 每個專案檔案結構各自為政
- TODO 顆粒度不一
- Git 紀錄難以追蹤

**調整後的結構：**
```
project-root/
├── todo.md                    # 核心 TODO 清單
├── docs/                      # 系統化的文件
│   ├── requirements.md        # 需求定義
│   ├── architecture.md        # 架構設計
│   └── api-spec.md            # API 詳細規格
├── src/                       # 程式碼（依職責分類）
├── tests/                     # 測試程式
└── scripts/                   # 自動化腳本
```

#### TODO 管理的進化

**常見失誤：**
- TODO 顆粒度過大（例：實作整個系統）
- 依賴關係不明
- 進度無法清楚呈現

**改良作法：**
```markdown
# 建議顆粒度（30～60 分鐘）
- [x] 實作使用者註冊 API
- [x] 密碼驗證邏輯
- [ ] JWT 認證中介層
- [ ] 登入功能測試補強

# 應避免的顆粒度
❌ 實作整個系統（過大）
❌ 修改變數名稱（過小）
```

**執行策略：**
1. 依序處理 TODO
2. 完成一項再進入下一項
3. 遇到依賴時調整順序
4. 避免超過一小時的單位

### Git 工作流程

#### 專用分支策略
```bash
# 為每個 TODO 建立分支
git checkout -b feature/user-registration
git checkout -b feature/auth-middleware
git checkout -b feature/password-validation
```

#### 對應 AITDD 循環的提交策略
```bash
# Red（撰寫失敗測試）
git add tests/user-registration.test.js
git commit -m "Red: Add failing tests for user registration"

# Green（撰寫最小實作）
git add src/controllers/user.js
git commit -m "Green: Implement basic user registration"

# Refactor（重構改善）
git add src/controllers/user.js src/models/user.js
git commit -m "Refactor: Extract user validation logic"

# Validation（最終檢核）
git add docs/api-spec.md
git commit -m "Validation: Complete user registration with docs"
```

#### 實際的回復策略
```bash
# 情境 1：差異不大，可修正
→ 調整提示後重新執行

# 情境 2：偏差很大
→ git reset --hard HEAD~1

# 情境 3：連續失敗
→ git reset --hard <last_good_commit>
→ 重新設計做法
```

### 顯著的心得與教訓

**1. 分階段推進的價值**
- 以小步快跑確保穩定
- 每個階段都確認品質
- 發生問題時影響範圍有限

**2. 文件的重要性**
- 明確的需求與規格有助於提高 AI 輸出品質
- API 規格成為撰寫測試的重要依據
- 進度可視化有助於維持動力

**3. 提示最佳化的累積效益**
- 重複使用成功的訊息模板
- 分析失敗案例後持續調整
- 累積領域知識與經驗

### 常見問題與對策

**問題 1：AI 輸出品質不穩**
- 原因：指令模糊、缺乏背景
- 對策：明確指定技術、格式與限制條件

**問題 2：大型專案中容易迷失方向**
- 原因：缺乏清楚的進度呈現
- 對策：在 TODO 中標註目前狀態與下一步

**問題 3：測試與實際行為不符**
- 原因：測試不足或理解錯誤
- 對策：撰寫更貼近真實情境的測試

## AITDD 開發流程概觀

### 基本流程
```
建立 TODO → 選擇項目 → 執行 AITDD → 審查 → 進入下一項
     ↑                                        ↓
     ←←←←←←← 依需要隨時調整 ←←←←←←←
```

### AITDD 內部循環
```
Red（測試） → Green（實作） → Refactor（重構） → Validation（驗證）
     ↑                                                     ↓
     ←←←←←←←←←←←←←←←←←←← 回饋迴圈 ←←←←←←←←←←←←←←←←←←
```

## 建議的專案結構
```
project-root/
├── todo.md
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   └── api-spec.md
├── src/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── scripts/
└── README.md
```

## 管理 TODO

### 典型 todo.md 範例
```markdown
# TODO

## 進行中
- [ ] 實作使用者註冊功能

## 已完成
- [x] 初始化專案
- [x] 設定資料庫連線

## 未開始（依優先順序）
1. [ ] 認證功能
   - [ ] 密碼雜湊
   - [ ] JWT 產生
   - [ ] 登入 API

2. [ ] 使用者管理
   - [ ] 更新個人資料
   - [ ] 刪除使用者
   - [ ] 使用者列表

3. [ ] 強化安全性
   - [ ] 流量限制
   - [ ] 輸入驗證
   - [ ] CORS 設定
```

### 執行策略與依賴管理

- 逐項完成，勿同時進行多個 TODO
- 遇到依賴時調整順序
- 以 30～60 分鐘可完成的單位為原則

```markdown
依賴範例：
- 使用者模型 → 註冊 API → 認證機制
- 資料庫 Schema → 遷移腳本 → API 實作
- 基礎功能 → 錯誤處理 → 資安強化
```

## Git 工作流程

### 推薦的分支模型
```bash
main        # 正式環境
├── develop # 整合開發
└── feature/todo-item # 針對每個 TODO 的實作分支
```

### 依 AITDD 循環提交
```bash
# Red
commit -m "Red: Add tests for user registration"
# Green
commit -m "Green: Implement user registration functionality"
# Refactor
commit -m "Refactor: Improve user registration code structure"
# Validation
commit -m "Validation: Complete user registration with documentation"
```

### 回復策略
```bash
git reset --hard HEAD~1        # 還原上一個提交
# 或
git reset --hard <commit-hash> # 回復至指定提交
```

## 下一步行動

### 完成環境建置後應做的事
1. 閱讀第 3 章，理解完整 AITDD 流程
2. 規劃第一個練習專案並撰寫 TODO
3. 持續練習提示設計、審查與品質控管

### 成功的關鍵
- 循序漸進、從小處開始
- 維持測試先行與審查習慣
- 團隊共用相同工具與經驗

## 完成度檢查

### 核對清單
- [ ] Claude Sonnet 4 / Claude Code 可用
- [ ] VS Code 與必要擴充已設定
- [ ] Git 與 GitHub 設定完成
- [ ] 採用推薦的專案結構
- [ ] 已建立 todo.md 與設定檔
- [ ] 制定 Git 分支與提交規範
- [ ] 測試環境可正常執行
- [ ] README 與紀錄檔已就緒

### 基礎測試
```bash
npm test
npm run test:coverage
git status
git log --oneline -5
```

## 總結

本章完成後，你已具備：
1. **工具環境**：以 Claude Sonnet 4 為核心的開發環境
2. **工作流程**：從 TODO 到 Git Flow 的標準化程序
3. **品質基礎**：測試、紀錄與除錯環境俱備

接下來的第 3 章將示範如何實際執行 AITDD 的流程，詳述 Red-Green-Refactor-Validation 的操作及與 AI 合作的技巧。準備好後，就能親身體驗 AITDD 的高效率開發模式。
