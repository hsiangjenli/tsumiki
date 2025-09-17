---
description: 用於啟動與管理開發環境伺服器的指令。
---

# 開發伺服器啟動與管理

此指令用於啟動並管理開發環境的伺服器。

## 伺服器啟動確認與管理

在開始開發前請確認伺服器狀態，必要時啟動：

```bash
# 確認是否已有 Vite 伺服器
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# 若尚未啟動則啟動新的伺服器
if ! ps aux | grep -E "vite.*--port 3000" | grep -v grep > /dev/null; then
  echo "伺服器尚未啟動。正在啟動開發伺服器..."
  npm run dev &
  echo "伺服器啟動中... 請等待 5 秒"
  sleep 5
else
  echo "已找到既有伺服器，直接沿用。"
  ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print "PID: " $2 " - Vite 伺服器已在執行"}'
fi

# 伺服器運作確認
echo "確認伺服器狀態..."
curl -s http://localhost:3000 > /dev/null && echo "✅ 伺服器運作正常" || echo "⚠️ 無法連線至伺服器"
```

## 伺服器管理指令

### 查詢伺服器狀態

```bash
# 查看目前執行中的伺服器行程
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# 檢查連接埠使用情形
lsof -i :3000
```

### 停止伺服器

```bash
# 停止 Vite 伺服器
pkill -f "vite.*--port 3000"

# 若上述指令無效則強制停止
ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print $2}' | xargs kill -9
```

### 重新啟動伺服器

```bash
# 停止伺服器
pkill -f "vite.*--port 3000"

# 稍待片刻
sleep 2

# 重新啟動伺服器
npm run dev &

# 確認啟動
sleep 5
curl -s http://localhost:3000 > /dev/null && echo "✅ 伺服器運作正常" || echo "⚠️ 無法連線至伺服器"
```

## 適用情境

- TDD 開發前的環境準備
- 伺服器停止時的復原
- 需要確認伺服器狀態時
- 進行開發環境設定時

## 注意事項

- 若連接埠 3000 被其他行程占用，請先終止該行程
- 伺服器啟動後，可從瀏覽器存取 http://localhost:3000 以確認運作
- 建議在作業結束時停止背景執行的伺服器
