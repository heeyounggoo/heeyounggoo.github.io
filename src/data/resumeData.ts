export interface CareerItem {
  company: string;
  description: string;
  period: string;
  duration: string;
  position: string;
  bullets: string[];
}

export interface EducationItem {
  period: string;
  school: string;
  major: string;
}

export interface SubSubItem {
  text: string; // HTML 허용 (set:html)
}

export interface SubItem {
  text: string; // HTML 허용 (set:html)
  subItems?: SubSubItem[];
}

export interface DetailCategory {
  category?: string; // 없으면 flat list
  items: SubItem[];
}

export interface ProjectSection {
  title: string;
  techs?: string[];
  background: string[];
  details: DetailCategory[];
  results: string[];
}

export interface ProjectPage {
  company: string;
  companySummary: string;
  period: string;
  contribution: string;
  sections: ProjectSection[];
  pageNum: string;
}

export const career: CareerItem[] = [
  {
    company: "라이드",
    description: "차량 렌트·구독 모빌리티 플랫폼",
    period: "2023.10 – 현재",
    duration: "재직 중",
    position: "프론트엔드 개발자",
    bullets: [
      "모노레포 아키텍처 설계 및 프론트엔드 개발 환경 통합 주도",
      "사내 디자인시스템 구축 (토큰, 컴포넌트, CI/CD)",
      "온라인 계약 도메인 설계 및 개발",
    ],
  },
  {
    company: "핏투게더",
    description: "프로 스포츠 선수 퍼포먼스 분석 B2B SaaS",
    period: "2021.08 – 2023.08",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "스포츠 선수 리포트 서비스 개발 및 성능 최적화",
      "D3.js 기반 데이터 시각화 컴포넌트 개발",
      "i18n + Google Sheets API 연동 다국어 시스템 구축",
    ],
  },
  {
    company: "ANTLabs",
    description: "대학교 학사행정 SI",
    period: "2019.03 – 2021.07",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "Flex 레거시 → Vue.js SPA 전환",
      "공통 컴포넌트 설계 (Editor, FileUploader, TimeTable 등)",
    ],
  },
];

export const education: EducationItem[] = [
  {
    period: "2018.03 – 2023.08",
    school: "한국방송통신대학교",
    major: "컴퓨터과학과",
  },
  {
    period: "2014.03 – 2016.02",
    school: "인덕대학교",
    major: "미디어아트앤디자인과",
  },
];

export const projects: ProjectPage[] = [
  {
    company: "라이드",
    companySummary:
      "모노레포 도입과 공통 패키지 구축으로 팀 개발 환경 개선",
    period: "2023.10 - 현재",
    contribution: "FE 3명",
    sections: [
      {
        title: "프론트엔드 개발 환경 설계",
        techs: ["Turborepo", "pnpm", "React 19", "Next.js", "Vite"],
        background: [
          "개별 레포지토리 관리로 중복 기능 발생, 공통 로직 파편화",
          "git submodule 기반 공유 코드의 버전 동기화 이슈",
        ],
        details: [
          {
            items: [
              {
                text: "<strong>프론트엔드 개발 환경 통합</strong>",
                subItems: [
                  {
                    text: "Turborepo + pnpm 모노레포 도입 제안",
                  },
                  {
                    text: "pnpm catalog를 통한 의존성 최적화 및 버전 일관성 유지",
                  },
                  {
                    text: "Turborepo 활용하여 개별 패키지만 빌드/배포 지원하여 CI/CD 효율화",
                  },
                ]
              },
              {
                text: "<strong>서비스 특성에 따른 프레임워크 분리 의사결정</strong>",
                subItems: [
                  {
                    text: "React 19 (Admin): 비즈니스 로직 복잡도가 높아 CSR에 집중, TanStack Query 기반 Optimistic Update",
                  },
                  {
                    text: "Next.js (Web): 차량 구매 도메인 SEO 최적화, SSR 초기 렌더링 속도 개선",
                  },
                ],
              },
              {
                text: "<strong>git submodule → npm private package 전환</strong>",
                subItems: [
                  {
                    text: "Vite 기반 공통 모듈 패키지 구축 (CJS/ESM 동시 지원)"
                  },
                  {
                    text: "semantic versioning 도입, 개발 환경 셋업 복잡도 감소"
                  },
                ]
              },
              {
                text: "zod 스키마로 API 요청/응답값 런타임 검증, 백엔드 스펙 불일치 시 프론트에서 조기 감지",
              },
            ],
          },
        ],
        results: [
          "Turborepo 캐싱으로 CI 빌드 시간 {X}분 → {Y}분 단축, 변경된 패키지만 배포하여 불필요한 빌드 제거",
          "신규 개발자 온보딩 시 레포 셋업 {X}일 → {Y}일 간소화",
          "공통 모듈을 패키지로 분리하여 web/admin 간 중복 코드 제거, 수정 시 한 곳만 변경",
        ],
      },
    ],
    pageNum: "2 / 6",
  },
  {
    company: "라이드",
    companySummary:
      "일관성 있는 UI와 확장 가능한 컴포넌트 구조를 위한 사내 디자인시스템 설계·배포",
    period: "2023.10 - 현재",
    contribution: "FE 3명",
    sections: [
      {
        title: "디자인시스템",
        techs: ["React", "Vanilla Extract", "Storybook"],
        background: [
          "서비스 확장에 따라 UI 일관성 유지 어려움, 중복 컴포넌트 증가",
          "CSR/SSR 환경에서 ThemeProvider 적용 시 깜빡임 이슈",
        ],
        details: [
          {
            category: "CSS Layer 아키텍처 설계 및 토큰 시스템",
            items: [
              {
                text: "CSS Layer (@layer) 기반 스타일 계층 구조 설계",
                subItems: [
                  {
                    text: "Vanilla Extract 사용 시 발생하는 CSS 우선순위 문제 해결",
                  },
                  {
                    text: "reset / global / component / page 순서의 통일된 layer 규칙을 디자인 시스템에서 제공",
                  },
                ],
              },
              {
                text: "디자인 토큰을 Vanilla Extract Theme, Vars로 제공하여 테마 변경 시 전체 서비스 일괄 반영",
              },
              {
                text: "ThemeProvider SSR 대응",
                subItems: [
                  {
                    text: "useServerInsertedHTML 활용, Next.js App Router 깜빡임 해결",
                  },
                ],
              },
            ],
          },
          {
            category: "유연하고 견고한 컴포넌트 설계",
            items: [
              {
                text: "Compound Pattern, As-Child Pattern 적용으로 유연한 확장을 위한 컴포넌트 API 설계",
              },
              {
                text: "컴포넌트별 인터랙션·접근성 규칙 정의 (키보드 내비게이션, 포커스 트랩, 로딩 상태, aria 속성)",
              },
              {
                text: "Input, Select, Control(Radio, Checkbox), FileUploader, ImageUploader, Notification",
              },
            ],
          },
          {
            category: "패키지 배포 및 최적화",
            items: [
              {
                text: "npm private package 관리, GitHub Actions CI/CD 자동화",
                subItems: [
                  {
                    text: "빌드, 패키지 배포, Storybook 배포, 릴리즈 문서 및 태그 생성 자동화",
                  },
                ],
              },
              {
                text: "빌드 최적화",
                subItems: [
                  {
                    text: "전용 빌드 스크립트를 작성하여 수백 개의 SVG를 React 컴포넌트로 자동화",
                  },
                  {
                    text: "Tree-shaking 지원하여 번들 사이즈 최적화",
                  },
                ],
              },
            ],
          },
        ],
        results: [
          "Storybook으로 컴포넌트 상태 시각적 공유, 디자이너와의 핸드오프 사이클 {X}일 → {Y}일 단축",
          "토큰 기반 테마 변경 시 전체 서비스 일괄 반영 구조 확보",
          "신규 페이지 UI 구현 시 디자인시스템 컴포넌트 조합으로 개발 시간 {X}% 단축",
        ],
      },
    ],
    pageNum: "3 / 6",
  },
  {
    company: "라이드",
    companySummary:
      "오프라인 중심 모빌리티 도메인을 온라인 계약 시스템으로 전환·설계",
    period: "2023.10 - 현재",
    contribution: "FE 3명",
    sections: [
      {
        title: "모빌리티 서비스 개발",
        techs: ["React", "Next.js", "Jest"],
        background: [
          "오프라인 기반 모빌리티 시장을 온라인 기반으로 전환하는 서비스 개발",
        ],
        details: [
          {
            category: "온라인 계약 도메인",
            items: [
              {
                text: "자동차 온라인 계약 전 과정 개발 (계약서 서명, PG 결제, 인수금 수납, 서류 관리)",
              },
              {
                text: "<strong>계약 데이터 간 의존 관계를 파악하여 기획팀에 정책 보완 제안</strong>",
                subItems: [
                  {
                    text: "역방향 제약 조건 정의 → 데이터 정합성 확보",
                  },
                ],
              },
              { text: "Canvas 기반 전자 서명 기능 구현" },
            ],
          },
          {
            category: "공통 비즈니스 로직",
            items: [
              {
                text: "차량 옵션 선택 및 가격 최적화 기능 구현",
                subItems: [
                  {
                    text: "Set, Map `intersection`, `difference` 등 최신 메서드를 활용, Polyfill 별도 구현",
                  },
                ],
              },
              {
                text: "Jest 기반 단위 테스트 작성",
              },
            ],
          },
        ],
        results: [
          "계약 상태 흐름 구현 중 예외 케이스를 발견하고 기획팀에 정책 보완 제안",
          "Polyfill 직접 구현으로 브라우저 호환성 대응 경험 확보",
        ],
      },
    ],
    pageNum: "4 / 6",
  },
  {
    company: "핏투게더",
    companySummary:
      "초기 로드 성능 개선, 번들 최적화, 다국어 시스템 구축으로 서비스 품질 향상",
    period: "2021.08 - 2023.08",
    contribution: "FE 4명",
    sections: [
      {
        title: "스포츠 선수 리포트 서비스 개발",
        techs: ["Vue.js", "Vuex", "Vue Router", "D3.js", "i18n", "webpack"],
        background: [
          "초기 로드 시간 길어 사용성 저하",
          "과도한 props-drilling, 다국어 관리 미흡, 차트 커스터마이징 한계",
        ],
        details: [
          {
            category: "서비스 리팩토링",
            items: [
              {
                text: "리포트 데이터 관리 방식 리팩토링",
                subItems: [
                  {
                    text: "데이터 관리 2단계 리팩토링 (Vuex → 동적 store 방식)",
                  },
                ],
              },
              { text: "husky + lint-staged 적용하여 코드 컨벤션 유지" },
              { text: "D3.js를 이용하여 Column, Line, Negative Chart 개발" },
            ],
          },
          {
            category: "성능 개선",
            items: [
              { 
                text: "초기 로드 용량 개선 및 코드 경량화",
                subItems: [
                  {
                    text: "Lazy Loading, Prefetch 적용",
                  },
                  {
                    text: "런타임 동적 라우터 등록 처리(dynamic import 라우터를 사용자 권한에 맞게 동적 등록)",
                  },
                  {
                    text: "TerserPlugin 적용하여 코드 경량화"
                  }
                ]
              },
              {
                text: "Webpack Bundle Analyzer로 라이브러리 최적화",
                subItems: [
                  {
                    text: "tree-shaking을 지원하지 않는 moment, lodash를 date-fns, lodash-es로 대체",
                  },
                ],
              },
            ],
          },
          {
            category: "다국어 지원",
            items: [
              {
                text: "i18n + Google Sheets API 연동, 번역 데이터 JSON 자동화",
              },
              {
                text: "하드코딩된 번역 데이터에 i18n 적용하여 변수화, 관리 주체를 비즈니스팀으로 변경",
              },
              { text: "사용자 언어 설정값만 호출하여 초기 로드 최적화" },
            ],
          },
        ],
        results: [
          "초기 로드 {X}s → {Y}s ({Z}% 개선), 빌드 용량 20% 감소",
          "i18n 자동화로 번역 반영 리드타임 {X}일 → 빌드 시 자동 반영, 관리 주체를 비즈니스팀으로 이관",
          "동적 store 전환으로 리포트별 독립적 상태 관리, 위젯 간 데이터 충돌 해소",
        ],
      },
    ],
    pageNum: "5 / 6",
  },
  {
    company: "ANTLabs",
    companySummary:
      "Flex 레거시 시스템을 Vue.js SPA로 전환, 공통 컴포넌트 설계",
    period: "2019.03 - 2021.07",
    contribution: "FE 2명",
    sections: [
      {
        title: "대학교 학사 시스템 개발",
        techs: ["Vue.js", "SCSS", "D3.js"],
        background: [
          "Flex 기반 레거시 시스템의 사용성 저하 및 낮은 개발 생산성",
        ],
        details: [
          {
            items: [
              { text: "Flex → SPA 구조 전환" },
              { text: "교원 시스템 기능 개발 (강의 시간표 등)" },
              {
                text: "공통 컴포넌트 개발 (Editor, FileUploader, TimeTable)",
              },
              { text: "DataTable 키보드 이벤트 지원" },
            ],
          },
        ],
        results: [
          "Flex 기반 레거시를 Vue.js SPA로 전환하여 페이지 전환 속도 및 사용성 개선",
          "Editor, FileUploader, TimeTable 등 공통 컴포넌트를 모듈화하여 교원 시스템 내 반복 개발 제거",
        ],
      },
    ],
    pageNum: "6 / 6",
  },
];
