---
name: deploy
description: 현재 브랜치를 빌드 검증 후 master에 push
allowed-tools: Bash, Read
---

# /deploy — 수동 배포

포스트가 아닌 일반 변경사항(컴포넌트, 레이아웃, 스타일 등)을 배포한다.

## 사용법

```
/deploy
```

## 파이프라인

### Step 1: 빌드 검증

```bash
npm run build
```

- 성공 → Step 2로
- 실패 → 에러 출력 + 중단

### Step 2: 변경사항 확인

```bash
git status
git diff --stat
```

- 변경사항이 없으면 → "변경사항이 없습니다." 출력 + 중단

### Step 3: Staging + Commit

```bash
git add -A
git commit -m "deploy: 변경 내용 요약"
```

커밋 메시지는 변경된 파일을 분석하여 자동 생성:
- 컴포넌트 변경 → `"update: Component 이름 수정"`
- 레이아웃 변경 → `"update: 레이아웃 개선"`
- 스타일 변경 → `"style: 스타일 수정"`
- 복합 변경 → `"update: 변경 요약"`

### Step 4: Push

```bash
git push origin master
```

### Step 5: 배포 상태 확인

```bash
# 최신 워크플로우 실행 상태 확인
gh api repos/gooheeyoung/heeyounggoo.github.io/actions/runs \
  --jq '.workflow_runs[0] | {status, conclusion, html_url}'
```

최종 출력:

```
✅ 배포가 시작되었습니다.
Actions: {workflow_url}
```
