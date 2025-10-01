---
mode: agent
description: 入口指令；盤點現況、找出缺口並推薦下一步 Prompt
inputs:
  summary: 需先掌握使用者當前問題與現有產出
  required:
    - 目前的卡關點、目標與時程限制
    - 現有文件與路徑（例如 docs/spec/, docs/prompts/, CHANGELOG.md）
    - 相關 GitHub Issue 編號與重點留言（可透過 MCP 取得）
    - 近期已執行的指令／Prompt 及其主要輸出
    - 語言或格式需求（預設繁體中文 + Markdown）
outputs:
  summary: 提供決策所需的全貌、推薦步驟與後續動作
  include:
    - 專案現況摘要（引用資料附 `#編號`，對推測或待確認的內容標註 🟡／🔴）
    - 近期變更重點（CHANGELOG、Git 提交或 Issue 摘要）
    - 推薦 Prompt 清單（建議 ≤3 項），說明目的、必要輸入、預期產出與 EARS/GWT 覆蓋
    - 建議動作：需建立或更新的 Issue／PR、需補文件、待確認事項（可用 MCP 直接建立）
    - 開放問題：列出尚待使用者提供的資訊
---

# index

## 目的

此指令作為流程入口，負責總覽專案現況、辨識需求缺口，並推薦接下來應執行的 Prompt。關鍵任務包含：
- 判斷 EARS 需求與 GWT 驗收是否齊備。
- 盤點是否已有 BDD / SDD / TDD 輸出及其完整度。
- 修正 Prompt 使用順序，避免重工。

## 流程

在進入 Phase 0 前，請確認：
- 可透過 MCP 或 API 存取 GitHub Issue／留言；若權限不足需在輸出中註明並向使用者索取資訊。
- 回覆語言設定為繁體中文。

### Phase 0：自動蒐集
1. 讀取 `README.md`（含技術堆疊章節）、`CHANGELOG.md`（或等效檔）、`docs/spec/`。記錄最新修改日期與版本。
2. 透過 MCP 取得相關 GitHub Issue / Comments，整理需求（REQ）、行為（BDD）、契約（SDD）、測試（TDD）等進度。
   - 若目前無法透過 MCP 存取 Issue，請改以向使用者詢問或手動輸入重點摘要，並在輸出中標示資料來源；對尚未確認的內容標註 🟡／🔴。
3. 將現有輸出整理成「狀態檢查表」，對每項標記 ✅（完成）、⚠️（部分）、❌（缺失），並附來源連結。
4. 依檢查表推論專案狀態：若需求、BDD、SDD、TDD 皆為 ❌，視為「新專案」；任一項為 ✅/⚠️ 則列為「既有專案」，記錄支援判斷的 Issue（使用 `#編號` 格式）與最近更新時間。

### Phase 1：使用者訪談
1. 根據狀態檢查表的 ⚠️／❌ 項目提出封閉式問題（EARS、GWT、BDD、SDD、TDD、CI/CD、技術堆疊）。
2. 根據 Phase 0 的專案狀態與使用者回覆確認情境：
   - **新專案 / 新需求**：檢查表顯示所有交付物為 ❌，且使用者確認尚未建立正式需求文件或 Issue。
   - **既有需求變更**：至少一項交付物已存在（✅／⚠️），且此次目標為新增或調整需求內容。
   - **測試 / 實作進行中**：需求明確，焦點在 BDD / SDD / TDD 任一階段的阻塞或缺口。
3. 確認技術堆疊是否需要重新盤點（例：新增子系統、部署目標改變）。
4. 確認交付時程、責任人與期望輸出載體（Issue / PR / Markdown）。

### Phase 2：決策與輸出
1. 依狀態檢查表與訪談結果套用以下決策矩陣：
   | 條件 | 推薦 Prompt | 附註 |
   | --- | --- | --- |
   | ❌ 無正式需求／EARS 未建立 | `requirements.prompt.md` | 若找到既有需求草稿，請先整理成基準文件 |
   | ✅ 已有需求但需增修 | `requirements-change.prompt.md` | 先整理既有 Issue（`#編號`）與交付物，於影響評估決定更新或新增 |
   | EARS/GWT 已確認，但 Scenario 缺或過時 | `bdd.prompt.md` | 同步產出 Scenario ↔ Issue 對照表 |
   | BDD 完整，需契約化或更新介面 | `sdd.prompt.md` | 標記需新建或更新的契約檔案 |
   | SDD 就緒，需要安排測試迭代 | `tdd-checkpoint.prompt.md` | 僅做進度盤點；若尚未建立 TDD Issue，請先跑 `tdd-requirements` |
   | 技術堆疊有重大變更或尚未定義 | `tech-stack.prompt.md` | 必須在需求或設計變更後 24h 內同步 README |
   | 任一 TDD 階段完成需要提交當前成果 | `commit-message.prompt.md` | 確認分支為 `tdd-*`，僅暫存該階段變更並產出 Angular 風格 commit |
2. 組成輸出：
   - 狀態檢查表摘要（附 `#編號`，對待確認項目標註 🟡／🔴）。
   - CHANGELOG／Issue 重點。
   - 推薦 Prompt（目的、需要的輸入、預期產出、EARS/GWT 覆蓋狀態）。
   - 建議動作：需建立或更新的 Issue／PR、需補文件、MCP 操作提醒。
   - 開放問題與待補資訊。

## 注意事項

- 先確認資訊是否完整；不足時應向使用者追問。
- 回覆需保持結構化，方便貼入 GitHub Issue。
- 若偵測輸出重複，提醒使用者檢視是否可沿用既有成果。
- 可使用自動化工具時，優先主動建立或更新 Issue 並附連結。
- 所有 Issue 皆以 `#編號` 表示，並在輸出中標示待確認事項（🟡／🔴）。
