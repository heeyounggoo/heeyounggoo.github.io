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
  category?: string; // 없으면 flat list (ANTLabs)
  items: SubItem[];
}

export interface ProjectPage {
  company: string;
  companySummary: string;
  service: string;
  period: string;
  contribution: string;
  title: string;
  techs: string[];
  background: string[];
  detailsPageA: DetailCategory[];
  detailsPageB?: DetailCategory[]; // 핏투게더만 사용
  results: string[];
  pageNum: string;
  pageNumB?: string; // 핏투게더 A-4b
}

export const career: CareerItem[] = [
  {
    company: "라이드",
    period: "2023.10 – 현재",
    duration: "재직 중",
    position: "프론트엔드 개발자",
    bullets: [
      "모빌리티 서비스 프론트엔드 개발 (사용자 서비스, 관리자)",
      "Turborepo 모노레포 도입, vanilla-extract 기반 디자인시스템 구축",
    ],
  },
  {
    company: "핏투게더",
    period: "2021.08 – 2023.08",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: [
      "스포츠 선수 리포트 서비스 프론트엔드 개발",
      "번들 최적화(빌드 용량 20% 감소), i18n 자동화 시스템 구축",
    ],
  },
  {
    company: "ANTLabs",
    period: "2019.03 – 2021.07",
    duration: "2년",
    position: "프론트엔드 개발자",
    bullets: ["Flex 레거시 → Vue.js SPA 전환, 공통 컴포넌트 모듈화"],
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
      "컴포넌트 설계 패턴과 스타일 아키텍처로 서비스 전반의 UI 일관성을 확보한 경험",
    service: "디자인시스템",
    period: "2023.10 - 현재",
    contribution: "40%",
    title: "디자인시스템 구축",
    techs: ["React", "TypeScript", "vanilla-extract", "Storybook"],
    background: [
      "서비스 확장에 따라 UI 일관성 유지 어려움 및 중복 컴포넌트 증가",
      "디자인-개발 간 커뮤니케이션 비용 증가",
      "새로운 UI 개발 시 매번 처음부터 구현하는 비효율로 팀 전체 개발 속도 저하",
    ],
    detailsPageA: [
      {
        category: "컴포넌트 아키텍처 설계",
        items: [
          {
            text: "Compound Pattern, As-Child Pattern 등 컴포넌트 특성에 맞는 설계 패턴 적용",
            subItems: [
              {
                text: "Input, Select, Control(Radio, Checkbox), FileUploader, ImageUploader, Notification 등 구현",
              },
            ],
          },
          {
            text: "Storybook을 이용한 컴포넌트 단위 개발 — 독립 환경에서 다양한 상태·변형을 시각적으로 검증",
          },
          {
            text: "Storybook 기반 컴포넌트 카탈로그 제공으로 디자인-개발 간 스펙 확인 비용 절감",
          },
        ],
      },
      {
        category: "CSS Layer 기반 스타일 격리 전략",
        items: [
          {
            text: "CSS Layer (@layer) 활용하여 스타일 충돌 없는 컴포넌트 제공",
            subItems: [
              {
                text: "vanilla-extract 사용 시 발생하는 CSS 우선순위 문제 해결",
              },
              {
                text: "reset / global / component / page 순서로 통일된 layer 규칙을 디자인 시스템에서 정의",
              },
            ],
          },
          {
            text: "Design Token을 vanilla-extract Theme, Vars로 구조화하여 서비스 간 일관된 시각 언어 제공",
          },
        ],
      },
      {
        category: "패키지 운영 및 배포",
        items: [
          {
            text: "npm private package로 버전 제어 — 점진적 마이그레이션 지원으로 레거시·신규 코드 동시 대응",
          },
          {
            text: "전용 빌드 스크립트로 수백 개 SVG → React 컴포넌트 자동 변환, Tree-shaking 지원",
          },
          {
            text: "빌드·배포·릴리즈 문서 생성까지 CI/CD 자동화",
          },
        ],
      },
    ],
    results: [
      "공통 컴포넌트 활용으로 신규 화면 개발 시간 단축, 팀 전체 생산성 향상",
      "토큰 기반 디자인 시스템으로 서비스 간 일관된 UX 제공",
      "Storybook 기반 컴포넌트 문서화로 디자인-개발 간 커뮤니케이션 비용 절감",
    ],
    pageNum: "2 / 6",
  },
  {
    company: "라이드",
    companySummary:
      "아키텍처 설계와 DX 개선으로 팀 전체의 개발 생산성을 높인 경험 — 모노레포 도입, 공통 패키지",
    service: "모빌리티 서비스 개발",
    period: "2023.10 - 현재",
    contribution: "80%",
    title: "프론트엔드 개발 환경 설계",
    techs: ["Turborepo", "pnpm", "React 19", "Next.js", "zod"],
    background: [
      "개별 레포지토리 관리로 인한 중복 기능 발생",
      "신규 도메인 확장 시 web/admin에서 공통으로 사용되는 부분들이 많아짐에 따라 개발 생산성 고려",
    ],
    detailsPageA: [
      {
        category: "모노레포 아키텍처 설계",
        items: [
          {
            text: "<strong>Turborepo</strong>와 <strong>pnpm</strong> 기반의 모노레포 도입 제안하여 프론트엔드 개발 환경 통합",
          },
          {
            text: "서비스 특성에 따른 프레임워크 분리 — Admin은 SPA, Web은 SSR로 선택",
            subItems: [
              {
                text: "<strong>React 19 SPA(Admin)</strong> — 비즈니스 로직 복잡도가 높아 서버/클라이언트 경계 관리 부담을 줄이고 클라이언트 상태 관리에 집중",
              },
              {
                text: "<strong>Next.js SSR(Web)</strong> — 차량 구매 도메인 특성상 검색 유입이 핵심, SEO 최적화를 위해 SSR 채택",
              },
            ],
          },
          {
            text: "<code>pnpm catalog</code>를 통한 의존성 최적화 및 버전 일관성 유지",
          },
          {
            text: "CI/CD 효율화 — Turborepo의 캐싱 및 필터링 기능을 활용하여 변경된 내용만 빌드/배포",
          },
          { text: "zod를 이용한 API 요청/응답값 type 검증하여 안정성 확보" },
          {
            text: "husky + lint-staged 활용해 커밋 전 lint/type 오류 사전 검증",
          },
        ],
      },
    ],
    results: [
      "프론트엔드 모노레포로 도입, 개별 서비스 배포 지원으로 리소스 절감",
      "공통 패키지 분리로 코드 중복 제거 및 일관성 확보",
    ],
    pageNum: "3 / 6",
  },
  {
    company: "핏투게더",
    companySummary:
      "성능 병목 분석부터 번들 최적화·다국어 자동화까지, 서비스 품질을 직접 끌어올린 경험",
    service: "스포츠 선수 리포트 서비스",
    period: "2021.08 - 2023.08",
    contribution: "60%",
    title: "스포츠 선수 리포트 서비스 개발",
    techs: ["Vue.js", "Vuex", "Vue Router", "D3.js", "i18n", "webpack"],
    background: [
      "초기 로드 시간이 길어 사용성 저하 발생",
      "공통 컴포넌트 중복 및 파편화로 인한 코드 품질 저하와 개발 생산성 하락",
      "과도한 props-drilling으로 컴포넌트 간 의존성 증가",
      "다국어 관리 방안 미흡으로 커뮤니케이션 비용 발생",
      "차트 라이브러리 용량 문제 및 커스터마이징 한계로 인한 UI 구현 어려움",
    ],
    detailsPageA: [
      {
        category: "서비스 리팩토링",
        items: [
          {
            text: "리포트 데이터 관리 방식 리팩토링",
            subItems: [
              {
                text: "[1차] props-drilling 방지를 위해 Vuex에 데이터 관리",
              },
              {
                text: "[2차] 리포트별 데이터가 서로 독립적이어서 전역 store가 불필요하다 판단, 동적 store 방식으로 전환하여 리포트 단위 상태 격리",
              },
            ],
          },
          {
            text: "ROLE 기반 Vue Router 가드닝 적용으로 역할별 메뉴 접근 제어",
          },
          {
            text: "런타임 동적 라우터 등록으로 초기 로드 용량 경량화",
            subItems: [
              {
                text: "dynamic import 사용 시에도 선언된 라우터는 일괄 등록됨을 확인, 사용자 권한에 맞게 동적 등록하도록 변경",
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
          { text: "Lazy Loading, Prefetch 적용으로 초기 로드 용량 개선" },
          {
            text: "Webpack Bundle Analyzer로 최적화 필요 라이브러리 분석",
            subItems: [
              {
                text: "tree-shaking을 지원하지 않는 moment, lodash를 date-fns, lodash-es로 대체",
              },
            ],
          },
          { text: "TerserPlugin 적용하여 코드 경량화" },
          { text: "webpack splitChunks 옵션 설정 테스트" },
        ],
      },
    ],
    detailsPageB: [
      {
        category: "다국어 지원",
        items: [
          {
            text: "하드코딩된 번역 데이터에 i18n 적용하여 변수화, 관리 주체를 비즈니스팀으로 변경",
          },
          {
            text: "Google Sheets API 활용하여 빌드 시 번역 데이터 자동 JSON 변환",
          },
          { text: "사용자 언어 설정값만 호출하여 초기 로드 최적화" },
        ],
      },
    ],
    results: [
      "DOMContentLoaded·Load 속도 10% 감소, 빌드 용량 20% 감소",
      "Google Sheets 기반 i18n 자동화로 번역 관리 주체를 비즈니스팀으로 이관, 개발 의존성 제거",
      "Vuex → 동적 store 전환으로 리포트별 독립적 상태 관리 구현, 컴포넌트 간 의존성 해소",
    ],
    pageNum: "4 / 6",
    pageNumB: "5 / 6",
  },
  {
    company: "ANTLabs",
    companySummary:
      "Flex 레거시 시스템을 Vue.js SPA로 전환하며 컴포넌트 설계 기초를 쌓은 경험",
    service: "대학교 학사 시스템",
    period: "2019.03 - 2021.07",
    contribution: "40%",
    title: "대학교 학사 시스템 개발",
    techs: ["Vue.js", "SCSS", "D3.js"],
    background: [
      "기존 레거시 학사/교원 시스템의 복잡성과 비효율성 개선 필요",
      "노후화된 UI와 레거시 시스템으로 인해 전반적인 사용성 저하",
      "시스템 복잡성 대비 낮은 개발 생산성과 사용자 만족도로 전면적인 개선 필요",
    ],
    detailsPageA: [
      {
        // category 없음 → flat list
        items: [
          { text: "Flex 기반 레거시를 SPA 구조로 전환" },
          { text: "교원 시스템 강의 시간표 개발 및 교원 기능 개발" },
          { text: "공통 컴포넌트 개발 (Editor, FileUploader, TimeTable)" },
          { text: "DataTable 키보드 이벤트 기능 지원" },
          { text: "도서관 관리 게시판 기능 개발" },
        ],
      },
    ],
    results: [
      "Flex 기반 레거시 → Vue.js SPA 전환으로 사용자 경험 및 유지보수성 개선",
      "공통 컴포넌트(Editor, FileUploader, TimeTable 등) 모듈화로 신규 화면 개발 시 재사용",
    ],
    pageNum: "6 / 6",
  },
];
