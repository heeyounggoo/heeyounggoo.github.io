## Skill Reference

### `/post`

블로그 포스트 퍼블리싱 파이프라인. 변경 감지 → frontmatter 검증 → 빌드 → 링크 검증 → 브랜치 → 커밋 → PR → 머지.

```
사용법: /post [파일경로]
예시:   /post src/content/blog/react-19.mdx
```

### `/feature`

Feature 개발 워크플로우 오케스트레이터. 요구사항 수집 → 브랜치 생성 → 단계별 구현 → 빌드 검증 → PR → 머지.

```
사용법: /feature
        (실행 후 요구사항을 대화로 입력)
```

### `/deploy`

master 브랜치에서 직접 배포가 필요할 때 사용. 빌드 검증 후 push.

```
사용법: /deploy
```

### `/branch` (서브스킬)

`/post`, `/feature`에서 내부 호출. 브랜치 명명 규칙 적용 후 master 기준 브랜치 생성.

```
입력: blog {yyyy-mm-dd}       → blog-2026-02-22
입력: feature {kebab-name}    → feature/add-dark-mode
```

### `/commit` (서브스킬)

`/post`, `/feature`에서 내부 호출. 커밋 메시지 형식 검증 후 커밋.

```
입력: {type}: {description}
예시: blog: new-react-19
```

### `/pr` (서브스킬)

`/post`, `/feature`에서 내부 호출. 템플릿 기반 PR 생성. blog 타입은 Title/Date/URL/빌드 결과를 템플릿에 치환.

```
입력: {type} {branch} {title} [TITLE=... DATE=... URL=... BUILD_RESULT=... LINK_RESULT=...]
예시: blog blog-2026-02-22 "blog: My Post" TITLE="My Post" DATE=2026-02-22 ...
예시: feature feature/add-dark-mode "feat: Add dark mode"
```

### `/merge` (서브스킬)

`/post`, `/feature`에서 파이프라인 마지막 단계. `review.yml` 통과 확인 → squash merge → 브랜치 정리.

```
입력: {pr-number} {branch-name} [live-url]
예시: /merge 42 blog-2026-02-22 https://heeyounggoo.github.io/blog/react-19
```

### `/wrap`

세션 마무리 요약. 브랜치 상태, 열린 PR, 최근 Actions 현황 + 다음 액션 제안.

```
사용법: /wrap
```
