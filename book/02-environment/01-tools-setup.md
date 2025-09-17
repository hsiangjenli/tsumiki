# 2.1 必備工具與環境設定

本章介紹實踐 AITDD 所需的工具與環境。AITDD 無需特殊軟體，只要在既有的開發流程中加入 AI 支援工具即可上路。

## 工具一覽

### 必備工具

#### 1. Claude Sonnet 4 + Claude Code
**角色**：主要的 AI 開發助手  
**用途**：程式碼生成、測試撰寫、重構、驗證  
**取得方式**：透過 Claude Code 使用

#### 2. VS Code
**角色**：整合開發環境  
**用途**：程式編輯、除錯、專案管理  
**特色**：可與 Claude Code 深度整合

#### 3. Git + GitHub
**角色**：版本控制  
**用途**：管理程式碼、追蹤歷史、快速復原  
**重要性**：當 AI 產出不符合預期時的回復機制

### 輔助工具

#### Gemini（選用）
**角色**：調查與資訊蒐集  
**用途**：搜尋函式庫、查找技術資料  
**特色**：可處理長上下文、大量資訊

## 建置步驟

### 步驟 1：申請 Claude Pro 方案

1. **建立 Claude 帳號**  
   - 造訪 https://claude.ai，建立帳號

2. **升級至 Pro 方案**  
   - 訂閱月費 20 美元的 Pro 方案  
   - 可設定最高 200 美元的月上限，避免 API 式「無上限」費用

3. **啟用 Claude Code**  
   - Pro 方案即可使用  
   - 適用於開發情境的自由操作

### 步驟 2：設定 VS Code

1. **安裝 VS Code**
   ```bash
   # Windows
   winget install Microsoft.VisualStudioCode

   # macOS
   brew install --cask visual-studio-code

   # Linux
   sudo apt install code
   ```

2. **安裝常用擴充**
   - Git Graph（視覺化 Git 操作）
   - GitLens（加強 Git 資訊顯示）
   - 語言專用擴充（如 JavaScript、Python）

3. **設定與 Claude Code 的整合**
   - 安裝 VS Code 外掛或依 Claude Code 指引設定
   - 建立與專案目錄的連結

### 步驟 3：建立 Git 環境

1. **安裝並設定 Git**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   git config --global init.defaultBranch main
   ```

2. **準備 GitHub 帳號**
   - 建立 GitHub 帳號
   - 設定 SSH 金鑰或 Personal Access Token
   - 預備建立遠端儲存庫

3. **AITDD 推薦分支流程**
   ```bash
   git checkout -b feature/new-functionality
   # 進行 AITDD 實作
   git add .
   git commit -m "Implement feature with AITDD"
   git push origin feature/new-functionality
   ```

## AI 工具比較與選擇

### 為何選擇 Claude Sonnet 4

市面上 AI 工具眾多，本指南選擇 Claude Sonnet 4 作為主力的原因如下。

#### 綜合考量的結論

**主要評估面向：**
1. **成本效率**：AITDD 需要頻繁嘗試，費用必須可控
2. **程式能力**：追求穩定性而非單次極限
3. **使用門檻**：方案限制越少越好
4. **整合度**：需能與開發流程無縫串聯

**Claude Sonnet 4 的優勢：**
- **與 Claude Code 緊密整合**：可直接在 VS Code 使用
- **Pro 方案**：月費 20 美元並可設定 200 美元上限，避免費用暴衝
- **適合 AITDD**：支援多次試驗、流程重複
- **整體平衡佳**：在性能、成本、操作性間取得良好折衷

#### 與其他工具的比較

**曾評估的工具：**
- ChatGPT：性能強，但成本較難掌控
- GitHub Copilot：專注於補全，無法涵蓋整個 AITDD 流程
- 其他 AI：實測後綜合表現仍不及 Claude Sonnet 4

**比較結果：**
```
項目             Claude Sonnet 4    其他工具
────────────────────────────────────────
成本效率         ◎                △
程式能力         ○                ◎
使用門檻         ◎                △
整合度           ◎                ○
AITDD 適配性     ◎                △
────────────────────────────────────────
總評             最適合            尚有課題
```

### 與 Gemini 的分工策略

Claude Sonnet 4 作為主力，Gemini 作為輔助工具。

**Claude Sonnet 4（主力）**
- 完整實作流程（設計→測試→實作→重構→驗證）
- AITDD 各階段一體化處理
- 兼顧程式生成與品質檢查

**Gemini（輔助）**
- 技術資料搜集
- 處理大量文本與長上下文
- 查找需要的函式庫、規格

**連動範例：**
1. 由 Gemini 搜集新函式庫資訊
2. 將整理後的資訊提供給 Claude Sonnet 4
3. 由 Claude Sonnet 4 執行整個 AITDD 流程

## 回復與備援策略

當 AI 產出不符預期時的應對方式：

### 基本步驟

**步驟 1：還原狀態**
```bash
git reset --hard HEAD~1
# 或指定提交點
git reset --hard <commit-hash>
```

**步驟 2：調整提示**
- 明確定義要修正的問題
- 補充背景與限制條件
- 列出具體需求

**步驟 3：重新執行**
- 繼續使用同一工具（Claude Sonnet 4）重試
- 避免頻繁切換工具以保持一致性

### 何時使用 git reset
- 程式碼與預期差距過大
- 重寫比修修補補更快
- 多次嘗試仍無法改善

### 提示調整範例
```
# 調整前（模糊）
「請修正這段程式」

# 調整後（具體）
「請修正以下問題：
1. 驗證錯誤未正確處理
2. 回傳型別不符合規格
3. 缺少邊界情境的測試」
```

### 策略特性
- **簡潔**：避免過度複雜的判斷流程
- **一致**：優先在同工具內完成修正
- **可學習**：多次實踐累積經驗

## 評估新 AI 工具的方式

### 評估流程

**資訊蒐集**
1. 持續追蹤新工具
2. 確認是否為短期熱潮或具長期價值
3. 觀察開發者社群的實際回饋

**決定是否試用**
- 能否融入 AITDD 工作流
- 成本是否具有競爭力
- 是否提供目前工具沒有的優勢

**採用準則**
- 先蒐集足夠資料，再評估導入
- 確保現有流程穩定後再嘗試
- 只有在明顯優於現況時才考慮替換

## 推薦技術堆疊

### 程式語言

**建議語言**
- **JavaScript／TypeScript**：透過 npm/yarn 管理依賴，AI 容易查詢
- **Python**：透過 pip/poetry 管理，資訊公開完整

**須留意的語言**
- **Java／C# 等編譯型語言**：因 jar/dll 無法輕易解析，需要額外人工協助

### 適合的專案類型
- CRUD 為主的應用程式
- Web API 開發
- 資料庫導向系統
- 中大型專案

### 成效最佳的程式模式
- 需大量產生類似程式碼
- 容易模板化的邏輯
- 依循標準設計模式的情境

## 成本掌控

### 主要成本
- **Claude Pro**：每月 20 美元
- **GitHub**：個人免費，團隊版 4 美元／人／月
- **VS Code**：免費
- **其他**：依專案所需依賴而定

### 成本優化建議
1. 為 Claude Pro 設定月上限（200 美元）
2. 明確定義目標，避免無效試驗
3. 良好地管理 Git 版本，減少重工

## 完成度自檢

- [ ] 已啟用 Claude Pro 方案
- [ ] 可使用 Claude Code
- [ ] 已安裝 VS Code
- [ ] 已安裝常用 VS Code 擴充
- [ ] Git 已設定完成
- [ ] GitHub 帳號可用
- [ ] 已建立專案目錄
- [ ] 選定技術堆疊的環境設定完成

## 常見問題排解

**無法使用 Claude Code**  
- 確認 Pro 方案是否有效  
- 清除瀏覽器快取  
- 檢查網路狀況

**VS Code 與 Claude Code 整合異常**  
- 重新安裝外掛  
- 重啟 VS Code  
- 檢查設定檔

**Git 操作失敗**  
- 重設認證資訊  
- 確認遠端儲存庫 URL  
- 檢查權限設定

## 下一步

完成工具設定後，請繼續閱讀下一章〈2.2 善用 Claude Sonnet 4〉，學習如何撰寫有效的提示並與 AI 協同作業，讓 AITDD 的實力徹底發揮。
