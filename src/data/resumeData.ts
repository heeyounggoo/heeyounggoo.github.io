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
  techs: string[];
  background: string[];
  details: DetailCategory[];
  results: string[];
}

export interface ProjectPage {
  company: string;
  companySummary: string;
  service: string;
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
      "모빌리티 서비스 프론트엔드 개발 — 온라인 계약 도메인, 어드민 권한 체계 설계",
      "모노레포 도입 및 프론트엔드 개발 환경 설계",
      "사내 디자인시스템 구축",
    ],
  },
  {
    company: "핏투게더",
    period: "2021.08 – 2023.08",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "스포츠 선수 리포트 서비스 개발 — 성능 최적화 및 다국어 시스템 구축",
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
      "아키텍처 설계와 DX 개선으로 팀 전체의 개발 생산성을 높인 경험 — 모노레포 도입, 공통 패키지",
    service: "모빌리티 서비스 개발",
    period: "2023.10 - 현재",
    contribution: "80%",
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
                text: "<strong>Turborepo + pnpm 모노레포 도입 제안</strong> — 프론트엔드 개발 환경 통합",
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
                text: "CI/CD 효율화 — Turborepo 캐싱으로 변경된 패키지만 빌드/배포",
              },
              {
                text: "<strong>git submodule → npm private package 전환</strong> — semantic versioning 도입, 개발 환경 셋업 복잡도 감소",
              },
              {
                text: "Vite 기반 공통 모듈 패키지 구축 (CJS/ESM 동시 지원)",
              },
              {
                text: "zod를 이용한 API 요청/응답값 type 검증",
              },
            ],
          },
        ],
        results: [
          "CI/CD 효율화로 배포 리소스 절감, 신규 개발자 온보딩 시간 단축",
          "프론트/백엔드 동일 로직 사용으로 정합성 확보, 코드 관리 포인트 최소화",
        ],
      },
      {
        title: "서비스 핵심 도메인 개발",
        techs: [
          "Next.js",
          "TypeScript",
          "Zustand",
          "react-query",
          "Next-Auth",
          "Jest",
        ],
        background: [
          "자동차 계약 과정이 오프라인 기반, 디지털 전환 필요",
          "어드민 권한 체계 미정의로 접근 제어 불완전",
        ],
        details: [
          {
            category: "온라인 계약 도메인",
            items: [
              {
                text: "자동차 온라인 계약 프로세스 디지털 전환 기능 개발",
              },
              {
                text: "계약 데이터 선형 의존 관계 분석 → 기획팀에 정책 보완 제안",
                subItems: [
                  {
                    text: "고객 인도 안내 발송 후 계약서 재발송 제한 → 데이터 정합성 확보",
                  },
                ],
              },
              { text: "계약서 서명 기능 개발" },
            ],
          },
          {
            category: "어드민 권한 체계",
            items: [
              {
                text: "RBAC 수립, Middleware 접근 제어, Next-Auth 세션 관리",
              },
              {
                text: "accessToken/refreshToken 갱신 플로우 정의 및 구현",
              },
              { text: "관리자 권한 확인 custom hook 제공" },
            ],
          },
          {
            category: "공통 비즈니스 로직",
            items: [
              {
                text: "차량 옵션 가격 산출 — Set, Map, 그래프 자료구조 활용, Polyfill 별도 구현",
              },
              {
                text: "Jest 단위 테스트로 엣지 케이스 포함 안정성 확보",
              },
            ],
          },
        ],
        results: [
          "복잡한 계약 상태 흐름 설계로 운영 이슈 최소화",
          "기획 단계에서 예외 케이스 사전 발굴, 정책 제안으로 팀 협업 기여",
          "엣지 케이스 테스트로 서비스 안정성 향상",
        ],
      },
    ],
    pageNum: "2 / 5",
  },
  {
    company: "라이드",
    companySummary:
      "디자인-개발 간 싱크 오류를 없애기 위해 전사 UI 라이브러리를 직접 설계·배포한 경험",
    service: "디자인시스템",
    period: "2023.10 - 현재",
    contribution: "40%",
    sections: [
      {
        title: "디자인시스템 구축",
        techs: ["React", "vanilla-extract", "Storybook"],
        background: [
          "서비스 확장에 따라 UI 일관성 유지 어려움, 중복 컴포넌트 증가",
          "CSR/SSR 환경에서 ThemeProvider 적용 시 깜빡임 이슈",
        ],
        details: [
          {
            items: [
              {
                text: "npm private package 버전 관리로 레거시/신규 코드 모두 대응",
              },
              {
                text: "SVG → React 컴포넌트 자동 변환 빌드 스크립트, Tree-shaking 지원",
              },
              {
                text: "빌드/패키지 배포/Storybook 배포/릴리즈 문서 생성 자동화",
              },
              {
                text: "<strong>CSS Layer (@layer)</strong> — vanilla-extract CSS 우선순위 문제 해결, reset/global/component/page 순서 통일",
              },
              {
                text: "<strong>Design Token</strong> — vanilla-extract Theme, Vars 활용",
              },
              {
                text: "<strong>ThemeProvider SSR 대응</strong> — useServerInsertedHTML 활용, Next.js App Router 깜빡임 해결",
              },
              {
                text: "Compound Pattern, As-Child Pattern 적용",
              },
              { text: "Storybook 기반 컴포넌트 단위 개발" },
            ],
          },
        ],
        results: [
          "컴포넌트 기반 개발로 개발 속도 향상, 디자이너 소통 효율화",
          "토큰 기반 일관된 UX 제공, SSR 환경 대응",
        ],
      },
    ],
    pageNum: "3 / 5",
  },
  {
    company: "핏투게더",
    companySummary:
      "성능 병목 분석부터 번들 최적화·다국어 자동화까지, 서비스 품질을 직접 끌어올린 경험",
    service: "스포츠 선수 리포트 서비스",
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
            items: [
              {
                text: "데이터 관리 2단계 리팩토링: Vuex → 동적 store 방식 (전역 관리 부적절 판단)",
              },
              {
                text: "<strong>Proxy 기반 Observer Pattern</strong> — 위젯 개별 로딩 지원",
              },
              {
                text: "ROLE 기반 Vue Router 가드닝, 런타임 동적 라우터 등록으로 초기 로드 경량화",
              },
              {
                text: "D3.js 기반 Column, Line, Negative Chart 직접 개발",
              },
              {
                text: "Lazy Loading, Prefetch, tree-shaking 미지원 라이브러리 대체 (moment→date-fns, lodash→lodash-es)",
              },
              {
                text: "i18n + Google Sheets API 연동 — 빌드 시 번역 데이터 자동 변환, 관리 주체를 비즈니스팀으로 이관",
              },
            ],
          },
        ],
        results: [
          "DOMContentLoaded, Load 속도 10% 감소, 빌드 용량 20% 감소",
          "다국어 관리 자동화로 커뮤니케이션 비용 감소",
        ],
      },
    ],
    pageNum: "4 / 5",
  },
  {
    company: "ANTLabs",
    companySummary:
      "Flex 레거시 시스템을 Vue.js SPA로 전환하며 컴포넌트 설계 기초를 쌓은 경험",
    service: "대학교 학사 시스템",
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
        results: ["사용자 경험 개선, 유지보수성 향상"],
      },
    ],
    pageNum: "5 / 5",
  },
];
