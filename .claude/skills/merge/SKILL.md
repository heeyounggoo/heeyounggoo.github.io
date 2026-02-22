---
name: merge
description: PR을 squash merge하고 브랜치를 정리한다. review.yml 체크 통과 후 머지하며, remote/local 브랜치 삭제 후 master를 최신화한다. /post와 /feature 스킬에서 파이프라인 마지막 단계로 호출된다.
allowed-tools: Bash
---

# /merge — PR 머지 + 정리

## 사용법

`$ARGUMENTS` 형식: `{pr-number} {branch-name} {live-url(선택)}`

예시:

- `42 blog-2026-02-22 https://heeyounggoo.github.io/blog/set-methods`
- `43 feature/add-dark-mode`

## 절차

### Step 1: PR 리뷰 체크 대기

```bash
gh pr checks {pr-number} --watch
```

- `review.yml` 완료 대기 (타임아웃: 10분)
- **FAIL**: 아래 메시지 출력 후 중단 (머지하지 않음)

```
리뷰 실패: PR #{pr-number}의 review.yml 체크가 실패했습니다.
PR 코멘트에서 세부 내용을 확인하세요.
머지를 진행하지 않습니다.
```

- **PASS**: Step 2로 진행

### Step 2: Squash Merge

```bash
gh pr merge {pr-number} --squash --delete-branch
```

실패 시: 에러 내용 출력 후 중단

### Step 3: master 최신화

```bash
git checkout master
git pull origin master
```

### Step 4: 로컬 브랜치 삭제

```bash
git branch -d "{branch-name}" 2>/dev/null || true
```

### Step 5: 최종 보고

```
✅ 머지 완료
  PR: #{pr-number} (squash merge)
  브랜치: '{branch-name}' 삭제 (remote + local)
  master: 최신화 완료
  [live-url이 제공된 경우] 라이브 URL: {live-url}
  GitHub Actions 배포: https://github.com/gooheeyoung/heeyounggoo.github.io/actions
```
