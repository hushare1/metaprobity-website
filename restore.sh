#!/usr/bin/env bash
# ============================================================
# restore.sh — One-shot dark theme restore for metaprobity-website
# Run this any time you suspect the dark theme has been
# overwritten by an AI suggestion or accidental edit.
#
# Usage:  ./restore.sh
# ============================================================
set -euo pipefail

cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"

RED='\033[0;31m'
YEL='\033[1;33m'
GRN='\033[0;32m'
NC='\033[0m'

FILES=("styles.css" "script.js")
RESTORED=()

echo ""
echo -e "${YEL}Checking dark theme integrity...${NC}"

for f in "${FILES[@]}"; do
  if ! git diff --quiet -- "$f" 2>/dev/null; then
    echo -e "  ${YEL}⚠  $f has local modifications — restoring from HEAD${NC}"
    git checkout -- "$f"
    RESTORED+=("$f")
  else
    echo -e "  ${GRN}✔  $f is clean${NC}"
  fi
done

# Extra check: make sure dark markers are in styles.css even if no diff
if ! grep -q "#0d1117" styles.css; then
  echo -e "  ${RED}✗  styles.css dark marker missing even after restore — HEAD may be corrupt${NC}"
  echo -e "  Run: git log --oneline styles.css  to find a good commit and restore manually"
  exit 1
fi

echo ""
if [ ${#RESTORED[@]} -gt 0 ]; then
  echo -e "${GRN}Restored: ${RESTORED[*]}${NC}"
else
  echo -e "${GRN}Nothing to restore — dark theme is intact.${NC}"
fi
echo ""
