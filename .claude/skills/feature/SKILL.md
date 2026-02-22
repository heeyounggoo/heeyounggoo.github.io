---
name: feature
description: Feature 개발 워크플로우 오케스트레이터. 요구사항 수집 → 브랜치 생성
  → Plan mode 단계별 구현 → 빌드 검증 → PR 생성 → 머지.
allowed-tools: Bash, Read, Glob, Grep, Edit, Write, Task
---

# /feature — Feature 개발 파이프라인

## 사용법

```
/feature {brief-description}
예시: /feature add dark mode toggle
     /feature PostCard 컴포넌트에 카테고리 필터 추가
```

## 파이프라인

### Step 1: 요구사항 수집

`$ARGUMENTS`가 비어있거나 모호하면: 3-5단어로 feature를 설명해달라고 요청.

SUMMARY = description을 kebab-case로 변환 (예: "add-dark-mode-toggle")

### Step 2: 병렬 초기화

아래 두 작업을 **동시에** 실행:

- **Task → requirements-analyst agent**: 요구사항 분석 → spec 생성
- **Skill → /branch**: `feature {SUMMARY}` (master에서 브랜치 생성)

두 작업 완료 대기.

requirements-analyst가 Questions를 반환하면: 사용자에게 질문 후 답변 수집.

### Step 3: Plan Mode 선언

출력:

```
feature/{SUMMARY} 시작합니다.
모든 변경은 Plan mode로 진행됩니다.
각 Phase마다 변경 내용을 제안하고 확인을 받은 후 구현합니다.
```

### Step 4: 단계별 구현

각 Phase별:

```
a. 변경 제안: 수정할 파일 목록과 변경 내용 요약 출력
b. 사용자 확인 대기
c. 구현: Edit/Write 도구로 변경
d. Phase 커밋: git add {관련 파일들}
              Skill → /commit "feat: {phase-description}"
```

### Step 5: 빌드 검증

모든 Phase 완료 후:

```
Task → builder agent: "빌드를 실행하고 에러를 분석하세요. 수정 가능한 에러는 수정 후 재빌드."
```

- PASS → Step 6으로
- FAIL (2회 시도 후) → 에러 출력 + 중단

### Step 6: PR 생성

```bash
git push -u origin "feature/{SUMMARY}"

gh pr create \
  --title "feat: {SUMMARY description}" \
  --body "$(cat .github/PULL_REQUEST_TEMPLATE/feature.md)" \
  --base master
```

PR 번호 저장: `PR_NUMBER`

### Step 7: 머지 (서브스킬 위임)

```
Skill → /merge: "{PR_NUMBER} feature/{SUMMARY}"
```

`/merge`가 review.yml 체크 대기 후 squash merge 수행.
