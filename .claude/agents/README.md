## Agent Reference

### reviewer

- **용도**: MDX 블로그 포스트와 Astro 컴포넌트 품질 검증
- **호출**: `review.yml` GitHub Action에서 PR 생성 후 자동 실행
- **출력**: `RESULT: PASS` / `RESULT: FAIL + 사유`

### builder

- **용도**: Astro 빌드 실행 및 에러 분석
- **호출**: `/post` Step 3, `/feature` Step 5에서 Task 위임
- **출력**: 빌드 성공/실패 + 에러 분석

### requirements-analyst

- **용도**: Feature 요구사항 분석 → 구조화된 spec 생성
- **호출**: `/feature` Step 2에서 `/branch`와 병렬 실행
- **출력**: `{ summary, scope, phases[], files[], questions[] }`
