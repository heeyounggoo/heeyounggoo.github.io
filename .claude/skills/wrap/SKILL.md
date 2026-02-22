---
name: wrap
description: 세션 마무리 요약. 미커밋 변경사항, 현재 브랜치 상태, 열린 PR, 최근 Actions 실행 현황을 한 번에 확인하고 다음 액션을 제안한다.
allowed-tools: Bash
---

# /wrap — 세션 요약

작업 세션 종료 전 현재 상태를 요약하고 다음 액션을 제안한다.

## 절차

### Step 1: 브랜치 상태 확인

```bash
git status --short
git log master..HEAD --oneline
git branch --show-current
```

### Step 2: 열린 PR 목록

```bash
gh pr list --author "@me" --state open
```

### Step 3: 최근 Actions 실행

```bash
gh run list --limit 5
```

### Step 4: 미커밋 변경사항 경고

`git status`에 dirty working tree가 있으면:

- 변경된 파일 목록 출력
- 제안:
  - `.mdx` 변경 → `/post` 실행 권장
  - `.astro`/`.ts` 변경 → `/commit` 또는 `/feature` 권장

### Step 5: 요약 출력

```
─────────────────────────────────────
  세션 요약
─────────────────────────────────────
  브랜치:  {current-branch}
  master 대비 커밋: {n}개 앞
  미스테이징 파일: {n}개

  열린 PR:
    #{number} {title} ({status})

  최근 Actions:
    {workflow}: {status} ({duration})

  다음 액션:
    {contextual suggestions}
─────────────────────────────────────
```
