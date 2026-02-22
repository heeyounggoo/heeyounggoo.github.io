---
name: branch
description: 프로젝트 브랜치 명명 규칙에 따라 master 기준 브랜치를 생성한다. /post와 /feature 스킬에서 내부적으로 호출된다.
allowed-tools: Bash
---

# /branch — 브랜치 생성

## 사용법

`$ARGUMENTS` 형식: `{type} {name}`

| 입력 예시               | 생성 브랜치             |
| ----------------------- | ----------------------- |
| `blog 2026-02-22`       | `blog-2026-02-22`       |
| `feature add-dark-mode` | `feature/add-dark-mode` |
| `fix broken-links`      | `fix/broken-links`      |

## 절차

### Step 1: master 최신화

```bash
git checkout master
git pull origin master
```

### Step 2: 미커밋 변경사항 확인

```bash
git status --porcelain
```

출력이 비어있지 않으면: 에러 출력 후 중단

```
에러: 미커밋 변경사항이 있습니다. stash 또는 commit 후 다시 시도하세요.
```

### Step 3: 브랜치명 구성

- `type = "blog"` → `blog-{name}`
- `type = "feature"` → `feature/{name}`
- `type = "fix"` → `fix/{name}`

### Step 4: 브랜치 생성

```bash
git checkout -b "{branch-name}"
```

### Step 5: 결과 보고

```
브랜치 '{branch-name}'이 master 기준으로 생성되었습니다.
```
