export interface CareerItem {
  company: string;
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
    period: "2023.10 – 현재",
    duration: "재직 중",
    position: "프론트엔드 개발자",
    bullets: [
      "모빌리티 서비스 프론트엔드 환경 설계, 개발",
      "사내 디자인시스템 구축",
    ],
  },
  {
    company: "핏투게더",
    period: "2021.08 – 2023.08",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "스포츠 선수 리포트 서비스 개발",
    ],
  },
  {
    company: "ANTLabs",
    period: "2019.03 – 2021.07",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: ["대학교 학사 시스템 SPA 전환"],
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
    contribution: "40%",
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
                    text: "React 19 (Admin): 비즈니스 로직 복잡도가 높아 CSR에 집중, react-query 기반 Optimistic Update",
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
                text: "zod를 이용한 API 요청/응답값 type 검증",
              },
            ],
          },
        ],
        results: [
          "Turborepo 캐싱 적용으로 CI 빌드 시간 단축, 변경된 패키지만 배포하여 불필요한 빌드 제거",
          "신규 개발자 온보딩 시 레포 셋업 과정 간소화",
          "공통 모듈을 패키지로 분리하여 web/admin 간 중복 코드 제거, 수정 시 한 곳만 변경",
        ],
      },
    ],
    pageNum: "2 / 6",
  },
  {
    company: "라이드",
    companySummary:
      "오프라인 중심 모빌리티 도메인을 온라인 계약 시스템으로 전환·설계",
    period: "2023.10 - 현재",
    contribution: "40%",
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
                text: "자동차 온라인 계약 기능 개발(차량 계약부터 인도까지 전 과정)",
              },
              {
                text: "<strong>계약 데이터 간 의존 관계를 파악하여 기획팀에 정책 보완 제안</strong>",
                subItems: [
                  {
                    text: "예: 인도 안내 발송 후 계약서 재발송 제한 등 역방향 제약 조건 정의 → 데이터 정합성 확보",
                  },
                ],
              },
              { text: "계약서 서명 기능" },
              { text: "인수금 PG(Toss Payment) 결제 / 어드민 수납 기능" },
              { text: "서명, 인수증 작성 등 funnel 뒤로가기 대응" },
              { text: "서류 다운로드/업로드 기능"}
            ],
          },
          {
            category: "공통 비즈니스 로직",
            items: [
              {
                text: "차량 옵션 선택 및 가격 최적화 기능 구현",
                subItems: [
                  {
                    text: "Set, Map `intersection`, `difference` 등 최신 메서드를 활용, Polyfill 별도 구현"
                  }
                ]
              },
              {
                text: "Jest 기반 단위 테스트 작성",
                subItems: [
                  {
                    text: "비즈니스 로직 중심 테스트 케이스 설계, 계약 상태 전이 검증",
                  },
                ],
              },
            ],
          },
        ],
        results: [
          "계약 상태 흐름 구현 중 예외 케이스를 발견하고 기획팀에 정책 보완 제안",
          "Polyfill 직접 구현으로 브라우저 호환성 대응 경험 확보"
        ],
      },
    ],
    pageNum: "3 / 6",
  },
  {
    company: "라이드",
    companySummary:
      "디자인-개발 간 불일치를 줄이기 위해 사내 UI 라이브러리 설계·배포",
    period: "2023.10 - 현재",
    contribution: "40%",
    sections: [
      {
        title: "디자인시스템",
        techs: ["React", "vanilla-extract", "Storybook"],
        background: [
          "서비스 확장에 따라 UI 일관성 유지 어려움, 중복 컴포넌트 증가",
          "CSR/SSR 환경에서 ThemeProvider 적용 시 깜빡임 이슈",
        ],
        details: [
          {
            category: "패키지 배포 및 최적화 전략",
            items: [
              {
                text: "npm private package 관리하여 버전 제어 및 재사용성 극대화",
              },
              {
                text: "GitHub Actions 배포 자동화, CI/CD 적용",
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
          {
            category: "유연하고 견고한 설계",
            items: [
              {
                text: "CSS Layer (@layer) 활용",
                subItems: [
                  {
                    text: "vanilla-extract 사용 시 발생하는 CSS 우선순위 문제 해결",
                  },
                  {
                    text: "reset / global / component / page 순서로 통일된 layer 규칙을 디자인 시스템에서 제공",
                  },
                ],
              },
              {
                text: "디자인 시스템 토큰 값을 vanilla-extract Theme, Vars를 활용하여 제공",
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
            category: "Storybook을 이용한 컴포넌트 단위 개발",
            items: [
              {
                text: "Compound Pattern, As-Child Pattern 등 적절한 컴포넌트 패턴 적용",
              },
              {
                text: "Input, Select, Control(Radio, Checkbox), FileUploader, ImageUploader, Notification",
              },
            ],
          },
        ],
        results: [
          "Storybook으로 컴포넌트 상태를 시각적으로 공유하여, 디자이너와 구현 확인 커뮤니케이션 횟수 감소",
          "토큰 기반으로 테마 변경 시 전체 서비스에 일괄 반영 가능한 구조 확보",
        ],
      },
    ],
    pageNum: "4 / 6",
  },
  {
    company: "핏투게더",
    companySummary:
      "D3.js 기반 데이터 시각화 차트 개발과 초기 로드 성능 최적화로 서비스 품질 향상",
    period: "2021.08 - 2023.08",
    contribution: "60%",
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
              {
                text: "D3.js 기반 커스텀 데이터 시각화 차트 설계 및 개발",
                subItems: [
                  {
                    text: "Column, Line, Negative 등 다양한 차트 타입 구현, 데이터 기반 동적 렌더링",
                  },
                  {
                    text: "선수 성과 데이터를 직관적으로 표현하는 인터랙티브 대시보드 구축",
                  },
                ],
              },
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
          "DOMContentLoaded·Load 속도 10% 감소, 빌드 용량 20% 감소",
          "Google Sheets 기반 i18n 자동화로 개발 생산성 향상",
          "Vuex 전역 store에서 동적 store로 전환하여 리포트별 독립적 상태 관리 구현, 위젯 간 데이터 충돌 해소",
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
    contribution: "40%",
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
