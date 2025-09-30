#!/bin/bash
# Usage: ./scripts/tdd-cycle.sh [-i TDD_ISSUE] [-n TEST_NAME] [--skip-requirements] [--skip-testcases]
# 依序呼叫 .github/prompts/ 內的 TDD 子流程：
#   1. tdd-requirements
#   2. tdd-testcases
#   3. tdd-red
#   4. tdd-green
#   5. tdd-refactor
#   6. tdd-verify
# 可透過 PROMPT_CLI 環境變數覆寫預設的執行指令（預設為 `claude`）。

set -euo pipefail

on_error() {
  local exit_code=$?
  echo "\n❌ TDD 自動流程中斷，exit code: $exit_code" >&2
  echo "請檢查上一個 Prompt 的輸出，並在 TDD Issue 更新阻塞與連續錯誤計數。" >&2
  if [[ -n "${TDD_ISSUE:-}" ]]; then
    echo "若為相同錯誤重複發生，請依規則透過 MCP 在 Issue #${TDD_ISSUE} 留言／調整標籤。" >&2
  fi
}

trap on_error ERR

PROMPT_CLI=${PROMPT_CLI:-claude}
PROMPT_ROOT=".github/prompts"

print_usage() {
  cat <<USAGE
Usage: $0 [-i TDD_ISSUE] [-n TEST_NAME] [--skip-requirements] [--skip-testcases]

Options:
  -i, --issue ID        指定要操作的 TDD Issue 編號（例如 123）。
  -n, --name NAME       指定此次循環的測試案例或模組名稱，將會以變數傳給每個 Prompt。
      --skip-requirements  已完成需求盤點時可跳過 tdd-requirements。
      --skip-testcases     已完成測試案例整理時可跳過 tdd-testcases。
  -h, --help           顯示本說明。

環境變數：
  PROMPT_CLI  預設為 "claude"。若使用其他 CLI，請設定，例如：
               PROMPT_CLI="prompt-cli" ./scripts/tdd-cycle.sh -i 123
USAGE
}

TDD_ISSUE=""
TEST_NAME=""
RUN_REQUIREMENTS=true
RUN_TESTCASES=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    -i|--issue)
      TDD_ISSUE="$2"
      shift 2
      ;;
    -n|--name)
      TEST_NAME="$2"
      shift 2
      ;;
    --skip-requirements)
      RUN_REQUIREMENTS=false
      shift
      ;;
    --skip-testcases)
      RUN_TESTCASES=false
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      print_usage >&2
      exit 1
      ;;
  esac
done

COMMON_ARGS=()
if [[ -n "$TDD_ISSUE" ]]; then
  COMMON_ARGS+=(--var TDD_ISSUE="$TDD_ISSUE")
fi
if [[ -n "$TEST_NAME" ]]; then
  COMMON_ARGS+=(--var TEST_NAME="$TEST_NAME")
fi

run_prompt() {
  local prompt_file="$1"
  local label="$2"
  shift 2
  local extra_args=("$@")

  echo "\n========================================"
  echo "➡️  執行階段：$label ($prompt_file)"
  echo "========================================\n"

  "$PROMPT_CLI" -p "$PROMPT_ROOT/$prompt_file" "${COMMON_ARGS[@]}" "${extra_args[@]}"
}

start_time=$(date +%s)

if $RUN_REQUIREMENTS; then
  run_prompt "tdd-requirements.prompt.md" "需求盤點"
else
  echo "跳過 tdd-requirements 階段"
fi

if $RUN_TESTCASES; then
  run_prompt "tdd-testcases.prompt.md" "測試案例整理"
else
  echo "跳過 tdd-testcases 階段"
fi

run_prompt "tdd-red.prompt.md" "RED：撰寫失敗測試"
run_prompt "tdd-green.prompt.md" "GREEN：實作讓測試轉綠"
run_prompt "tdd-refactor.prompt.md" "REFACTOR：重構與品質提升"
run_prompt "tdd-verify.prompt.md" "VERIFY：總驗證"

end_time=$(date +%s)
duration=$((end_time - start_time))

printf '\n✅ TDD 全流程執行完畢。耗時 %02d:%02d:%02d\n' \
  $((duration/3600)) $(((duration%3600)/60)) $((duration%60))

if [[ -n "$TDD_ISSUE" ]]; then
  echo "請確認 GitHub Issue #$TDD_ISSUE 已更新各階段摘要與必要留言（連續錯誤須透過 MCP 留言，達 5 次請透過 MCP 將標籤改為 human_required）。"
fi
