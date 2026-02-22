---
name: commit
description: 커밋 메시지 컨벤션을 검증하고 커밋을 생성한다.
  파일 스테이징은 호출자가 처리한다. /post와 /feature 스킬에서 내부적으로 호출된다.
allowed-tools: Bash
---

# /commit — 컨벤션 커밋

## 사용법

파일 스테이징은 호출자(`/post`, `/feature`)가 먼저 수행.

`$ARGUMENTS` 형식: `{type}: {message}`

예시:

- `blog: new-set-methods`
- `feat: add PostCard component`
- `fix: correct internal link paths`

## 절차

### Step 1: 메시지 형식 검증

유효한 타입 접두어 확인: `blog | feat | fix | style | refactor | chore | docs`

```
형식: {type}: {description}
최대 72자
```

형식 위반 시: 에러 출력 + 수정 제안

```
에러: 커밋 메시지가 컨벤션을 따르지 않습니다.
올바른 형식: {type}: {description} (최대 72자)
유효한 타입: blog | feat | fix | style | refactor | chore | docs
```

### Step 2: 스테이징 확인

```bash
git diff --cached --name-only
```

출력이 비어있으면: 에러 출력 후 중단

```
에러: 스테이징된 파일이 없습니다. 먼저 git add를 실행하세요.
```

### Step 3: 커밋 생성

```bash
git commit -m "{type}: {message}"
```

### Step 4: 결과 보고

```
커밋 완료: '{type}: {message}'
스테이징된 파일:
  - {file1}
  - {file2}
```
