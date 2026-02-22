#!/usr/bin/env bash
# protect-files.sh — PreToolUse hook for Edit tool
# Reads JSON from stdin, extracts file_path, blocks edits to protected files.
# Exit 2 = block the tool call with a message.

set -euo pipefail

PROTECTED_FILES=(
  "CLAUDE.md"
  "package-lock.json"
)

PROTECTED_PATTERNS=(
  ".github/workflows/"
)

# Read JSON from stdin
INPUT=$(cat)

# Extract file_path from tool_input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Normalize: strip leading ./ if present
FILE_PATH="${FILE_PATH#./}"

# Also get just the filename for root-level checks
BASENAME=$(basename "$FILE_PATH")

# Check exact protected files
for PROTECTED in "${PROTECTED_FILES[@]}"; do
  if [ "$FILE_PATH" = "$PROTECTED" ] || [ "$BASENAME" = "$PROTECTED" ]; then
    echo "BLOCKED: '$FILE_PATH' is a protected file. Manual editing is not allowed."
    exit 2
  fi
done

# Check protected patterns (directory prefixes)
for PATTERN in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$PATTERN"* ]]; then
    echo "BLOCKED: '$FILE_PATH' matches protected pattern '$PATTERN'. Manual editing is not allowed."
    exit 2
  fi
done

exit 0
