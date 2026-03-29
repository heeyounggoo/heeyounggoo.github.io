export interface CareerItem {
  company: string;
  companyDesc?: string;
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
    companyDesc: "자동차 온라인 계약 플랫폼 (모빌리티 스타트업)",
    period: "2023.10 – 현재",
    duration: "재직 중",
    position: "프론트엔드 개발자",
    bullets: [
      "모노레포 전환 제안·설계로 4개 서비스의 공통 코드 통합, 온보딩 셋업 간소화",
      "디자인시스템(20+ 컴포넌트) 설계·배포, 4개 내부 서비스에 적용",
    ],
  },
  {
    company: "핏투게더",
    companyDesc: "스포츠 데이터 분석 서비스 (스포츠테크)",
    period: "2021.08 – 2023.08",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "K리그 프로 구단 대상 스포츠 데이터 분석 리포트 개발, i18n 구축으로 해외 계약 확대 기여",
    ],
  },
  {
    company: "ANTLabs",
    companyDesc: "대학교 학사 시스템 SI (교육 IT)",
    period: "2019.03 – 2021.07",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: ["대학 학사 시스템 Flex → Vue.js SPA 전환, 교원용 공통 컴포넌트 설계"],
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
      "모노레포 전환과 디자인시스템 구축으로 4개 서비스의 프론트엔드 개발 기반 설계",
    period: "2023.10 - 현재",
    contribution: "환경 설계 주도 (FE 3명)",
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
                text: "<strong>Turborepo + pnpm 모노레포 도입 제안·설계</strong>",
                subItems: [
                  {
                    text: "사용자/어드민 공통 컴포넌트·비즈니스 로직 공유 필요성과 팀 규모를 고려하여 모노레포 전환 제안",
                  },
                  {
                    text: "Turborepo 캐싱으로 변경된 패키지만 빌드/배포, CI 효율화",
                  },
                ],
              },
              {
                text: "<strong>서비스 특성에 따른 프레임워크 분리 의사결정</strong>",
                subItems: [
                  {
                    text: "React 19 (Admin): 비즈니스 로직 복잡도가 높아 CSR에 집중",
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
                    text: "Vite 기반 공통 모듈 패키지 구축 (CJS/ESM 동시 지원), semantic versioning 도입",
                  },
                ],
              },
            ],
          },
        ],
        results: [
          "신규 개발자 온보딩 시 레포 셋업 과정 간소화",
        ],
      },
      {
        title: "디자인시스템",
        techs: ["React", "vanilla-extract", "Storybook"],
        background: [
          "서비스 확장에 따라 UI 일관성 유지 어려움, 중복 컴포넌트 증가",
          "CSR/SSR 환경에서 ThemeProvider 적용 시 깜빡임 이슈",
        ],
        details: [
          {
            category: "패키지 배포 및 운영",
            items: [
              {
                text: "npm private package로 배포, GitHub Actions CI/CD 자동화",
              },
              {
                text: "아이콘 패키지: 빌드 스크립트로 수백 개 SVG를 React 컴포넌트로 자동 변환, Tree-shaking 지원",
              },
            ],
          },
          {
            category: "설계",
            items: [
              {
                text: "CSS Layer (@layer) 활용하여 vanilla-extract CSS 우선순위 문제 해결",
                subItems: [
                  {
                    text: "reset / global / component / page 순서로 통일된 layer 규칙 제공",
                  },
                ],
              },
              {
                text: "ThemeProvider SSR 대응: useServerInsertedHTML 활용, Next.js App Router 깜빡임 해결",
              },
              {
                text: "Compound Pattern, As-Child Pattern 등 컴포넌트 패턴 적용 (20+ 컴포넌트)",
              },
            ],
          },
        ],
        results: [
          "4개 내부 서비스에 디자인시스템 적용, 토큰 기반 테마 변경 시 전체 서비스 일괄 반영 구조 확보",
          "Storybook으로 컴포넌트 상태를 시각적으로 공유, 디자이너와 커뮤니케이션 비용 감소",
        ],
      },
    ],
    pageNum: "2 / 5",
  },
  {
    company: "라이드",
    companySummary:
      "오프라인 자동차 거래를 온라인으로 전환하는 플랫폼, 웹뷰 기반 계약 도메인 담당",
    period: "2023.10 - 현재",
    contribution: "계약 도메인 담당 (FE 3명)",
    sections: [
      {
        title: "모빌리티 서비스 개발",
        techs: ["React", "Next.js", "Zustand", "Jest"],
        background: [
          "오프라인 중심 모빌리티 시장을 온라인으로 전환, 웹뷰 기반 전환에 따라 계약 도메인 담당",
        ],
        details: [
          {
            category: "온라인 계약 도메인",
            items: [
              {
                text: "자동차 온라인 계약 전 과정 개발 (계약서 서명, PG 결제, 인수금 수납, 인도까지)",
              },
              {
                text: "<strong>계약 데이터 간 의존 관계를 파악하여 기획팀에 정책 보완 제안</strong>",
                subItems: [
                  {
                    text: "인도 안내 발송 후 계약서 재발송 제한 등 역방향 제약 조건 정의 → 데이터 정합성 확보",
                  },
                ],
              },
              {
                text: "계약 funnel 뒤로가기 대응 (서명, 인수증 작성 등 단계별 상태 관리)",
              },
            ],
          },
          {
            category: "공통 비즈니스 로직",
            items: [
              {
                text: "차량 옵션 선택 및 가격 최적화 기능 구현",
              },
              {
                text: "Jest 기반 단위 테스트 작성",
              },
            ],
          },
        ],
        results: [
          "계약 상태 흐름 구현 중 예외 케이스를 발견하고 기획팀에 정책 보완 제안 → 데이터 정합성 확보",
        ],
      },
    ],
    pageNum: "3 / 5",
  },
  {
    company: "핏투게더",
    companySummary:
      "K리그 프로 구단 대상 스포츠 데이터 분석 서비스, 성능 개선 및 다국어 시스템 구축",
    period: "2021.08 - 2023.08",
    contribution: "FE 4명",
    sections: [
      {
        title: "스포츠 선수 리포트 서비스 개발",
        techs: ["Vue.js", "Vuex", "D3.js", "i18n", "webpack", "Electron"],
        background: [
          "K리그 프로 구단 및 해외 팀 대상 축구 선수 신체 데이터 분석 서비스",
          "초기 로드 시간 길어 사용성 저하, 다국어 관리 미흡",
        ],
        details: [
          {
            category: "성능 개선",
            items: [
              {
                text: "Lazy Loading, Prefetch, 동적 라우터 등록으로 초기 로드 최적화",
              },
              {
                text: "Webpack Bundle Analyzer로 번들 분석, moment→date-fns / lodash→lodash-es 전환",
              },
              {
                text: "리포트 데이터 관리 리팩토링: Vuex 전역 store에서 동적 store로 전환, 위젯 간 데이터 충돌 해소",
              },
            ],
          },
          {
            category: "다국어 지원",
            items: [
              {
                text: "i18n + Google Sheets API 연동 번역 파이프라인 구축, 관리 주체를 비개발 팀으로 이관",
              },
              {
                text: "사용자 언어 설정값만 호출하여 초기 로드 최적화",
              },
            ],
          },
          {
            category: "기타",
            items: [
              {
                text: "D3.js 기반 Column, Line, Negative Chart 직접 구현",
              },
              {
                text: "Electron 앱으로 하드웨어 기기에서 선수 심박수(HR) 데이터 추출 기능 개발",
              },
            ],
          },
        ],
        results: [
          "DOMContentLoaded·Load 속도 10% 감소, 빌드 용량 20% 감소",
          "i18n 자동화로 중국·스페인어권 국가 계약 확대에 기여",
        ],
      },
    ],
    pageNum: "4 / 5",
  },
  {
    company: "ANTLabs",
    companySummary:
      "Flex 기반 대학 학사 시스템의 사용성 개선을 위한 Vue.js SPA 전환",
    period: "2019.03 - 2021.07",
    contribution: "FE 2명",
    sections: [
      {
        title: "대학교 학사 시스템 개발",
        techs: ["Vue.js", "SCSS"],
        background: [
          "Flex 기반 레거시 시스템의 사용성 저하, SPA 전환을 통한 UX 개선 목표",
        ],
        details: [
          {
            items: [
              {
                text: "Flex → Vue.js SPA 전환, 학사 메뉴 개발 및 공통 컴포넌트(Editor, FileUploader, TimeTable) 설계",
              },
              {
                text: "교수 성적 입력 UX 개선을 위해 DataTable 키보드 이벤트 + 실시간 저장 기능 구현 (자체 제안)",
              },
            ],
          },
        ],
        results: [
          "페이지 전환 속도 개선 및 교원 시스템 사용성 향상, 공통 컴포넌트 모듈화로 반복 개발 제거",
        ],
      },
    ],
    pageNum: "5 / 5",
  },
];
