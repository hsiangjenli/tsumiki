#!/bin/bash

# TDD 全流程執行腳本
# 用法: ./tdd-cycle-full.sh <test_case_name>

# 紀錄開始時間
START_TIME=$(date +%s)

if [ $# -ne 1 ]; then
    echo "Usage: $0 <test_case_name>"
    exit 1
fi

TEST_CASE_NAME=$1

# 色彩定義
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Claude 指令共用設定
ALLOWED_TOOLS="Write,Edit,Bash(npm:*),Bash(node:*)"
DISALLOWED_TOOLS="Bash(git *)"
VERIFY_ALLOWED_TOOLS="Write,Edit,Bash(npm:*),Bash(node:*),Bash(git status),Bash(git diff)"
VERIFY_DISALLOWED_TOOLS="Bash(git add),Bash(git commit),Bash(git push)"

# TDD 流程執行函式
run_tdd_cycle() {
    local test_case=$1
    
    echo "🔴 RED 階段開始..."
    if ! claude -p "/tdd-red $test_case 補齊不足的測試" --allowedTools "$ALLOWED_TOOLS" --disallowedTools "$DISALLOWED_TOOLS"; then
        echo -e "${RED}❌ RED 階段失敗${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ RED 階段完成${NC}"

    echo "🟢 GREEN 階段開始..."
    if ! claude -p "/tdd-green $test_case" --allowedTools "$ALLOWED_TOOLS" --disallowedTools "$DISALLOWED_TOOLS"; then
        echo -e "${RED}❌ GREEN 階段失敗${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ GREEN 階段完成${NC}"

    echo "🔵 REFACTOR 階段開始..."
    if ! claude -p "/tdd-refactor $test_case" --allowedTools "$ALLOWED_TOOLS" --disallowedTools "$DISALLOWED_TOOLS"; then
        echo -e "${RED}❌ REFACTOR 階段失敗${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ REFACTOR 階段完成${NC}"

    echo "🔍 VERIFY COMPLETE 階段開始..."
    local verify_result
    verify_result=$(claude -p "/tdd-verify-complete $test_case" --allowedTools "$VERIFY_ALLOWED_TOOLS" --disallowedTools "$VERIFY_DISALLOWED_TOOLS" 2>&1)
    local verify_exit_code=$?
    
    if [ $verify_exit_code -ne 0 ]; then
        echo -e "${RED}❌ VERIFY COMPLETE 階段失敗${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ VERIFY COMPLETE 階段完成${NC}"
    echo -e "${verify_result}"
    
    # 判定結果
    if echo "$verify_result" | grep -E "(完全性驗證[:：]? ?合格|完全性檢驗[:：]? ?合格)" > /dev/null; then
        echo -e "${GREEN}🎉 TDD 流程完成${NC}: $test_case 的 TDD 流程已順利結束"
        return 0
    elif echo "$verify_result" | grep -E "(未實作|品質基準未達|需追加實作)" > /dev/null; then
        echo -e "${YELLOW}🔄 持續 TDD 流程${NC}: 發現未滿足品質基準的項目，將回到 RED 階段..."
        return 1
    else
        echo -e "${YELLOW}⚠️  判定結果不明確${NC}"
        echo "--- VERIFY COMPLETE 階段輸出 ---"
        echo "$verify_result"
        echo "--- 輸出結束 ---"
        echo ""
        echo -e "${BLUE}請選擇後續動作:${NC}"
        echo "1) 視為完成（結束流程）"
        echo "2) 從 RED 階段繼續"
        echo "3) 結束腳本"
        echo ""

        while true; do
            read -p "選項 (1/2/3): " choice
            case $choice in
                1)
                    echo -e "${GREEN}🎉 TDD 流程完成${NC}: 依使用者判定視為完成"
                    return 0
                    ;;
                2)
                    echo -e "${YELLOW}🔄 持續 TDD 流程${NC}: 依使用者判定返回 RED 階段"
                    return 1
                    ;;
                3)
                    echo -e "${BLUE}👋 結束腳本${NC}"
                    exit 0
                    ;;
                *)
                    echo "無效選項，請輸入 1、2 或 3。"
                    ;;
            esac
        done
    fi
}

# 顯示完成時間的函式
show_completion_time() {
    local exit_code=$1
    local end_time=$(date +%s)
    local duration=$((end_time - START_TIME))
    local hours=$((duration / 3600))
    local minutes=$(((duration % 3600) / 60))
    local seconds=$((duration % 60))
    
    printf "⏱️  執行時間: "
    if [ $hours -gt 0 ]; then
        printf "%d小時%d分%d秒\n" $hours $minutes $seconds
    elif [ $minutes -gt 0 ]; then
        printf "%d分%d秒\n" $minutes $seconds
    else
        printf "%d秒\n" $seconds
    fi

    printf "🕐 結束時間: %s\n" "$(date +'%Y-%m-%d %H:%M:%S')"

    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ 正常結束${NC}"
    else
        echo -e "${RED}❌ 錯誤結束${NC}"
    fi
}

# 設定 trap（即使錯誤也會顯示時間）
trap 'show_completion_time $?' EXIT

# 主迴圈
echo "啟動 TDD 全流程：$TEST_CASE_NAME"
max_cycles=5
cycle_count=0

while [ $cycle_count -lt $max_cycles ]; do
    cycle_count=$((cycle_count + 1))
    echo -e "${BLUE}=== 第 $cycle_count 次循環開始 ===${NC}"
    
    if run_tdd_cycle "$TEST_CASE_NAME"; then
        echo -e "${GREEN}🎉 全部完成：TDD 流程已順利結束${NC}"
        exit 0
    fi
    
    echo -e "${YELLOW}第 $cycle_count 次循環完成，進入下一循環...${NC}"
    echo ""
done

echo -e "${RED}❌ 已達最大循環次數($max_cycles)，請改以人工確認。${NC}"
exit 1
