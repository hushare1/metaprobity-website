#!/usr/bin/env bash
# ============================================================
# setup-hooks.sh — Install git hooks for metaprobity-website
#
# Run ONCE after a fresh clone:
#   ./setup-hooks.sh
#
# Installs:
#   pre-commit   — rejects commits that overwrite the dark theme
#   post-checkout — auto-restores dark theme after git checkout
#   post-merge   — auto-restores dark theme after git pull/merge
# ============================================================
set -euo pipefail

cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"

GRN='\033[0;32m'
NC='\033[0m'

HOOKS_SRC="hooks"
HOOKS_DST=".git/hooks"

for hook in pre-commit post-checkout post-merge; do
  cp "$HOOKS_SRC/$hook" "$HOOKS_DST/$hook"
  chmod +x "$HOOKS_DST/$hook"
  echo -e "${GRN}✔ Installed $hook${NC}"
done

echo ""
echo -e "${GRN}All hooks installed. Dark theme is now permanently protected.${NC}"
echo ""
