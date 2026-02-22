## Hook Behavior

### PostToolUse: Auto Format

`Edit` 또는 `Write` 도구 사용 후 `npx prettier --write`로 자동 포맷.

설정 파일: `.claude/settings.json`

### PreToolUse: File Protection

`Edit` 도구 사용 전 보호 대상 파일 변경 차단. 아래 파일/경로는 수동 편집만 허용.

**보호 파일:**

- `CLAUDE.md`
- `package-lock.json`

**보호 경로:**

- `.github/workflows/`
- `.github/PULL_REQUEST_TEMPLATE/`

스크립트: `.claude/hooks/protect-files.sh`
