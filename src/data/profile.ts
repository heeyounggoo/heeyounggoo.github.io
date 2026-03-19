export const profile = {
  name: "구희영",
  role: "Frontend Developer",
  bio: "7년차 프론트엔드 개발자. React/Next.js 기반 서비스 개발과 모노레포·디자인시스템 등 개발 환경 설계 경험. Turborepo 모노레포 도입, vanilla-extract 기반 디자인시스템 구축, 번들 최적화를 통한 성능 개선 등 DX와 UX를 동시에 고려하는 개발을 지향합니다.",
  email: "gmldud628@gmail.com",
  github: "https://github.com/heeyounggoo",
  skills: {
    Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript"],
    "State Management": ["React Query (TanStack Query)", "Zustand", "Vuex"],
    Styling: ["vanilla-extract", "SCSS"],
    "Build / Infra": ["Turborepo", "pnpm", "Webpack", "Vite", "GitHub Actions"],
    Tools: ["Git", "Figma", "Storybook", "AWS"],
  } as Record<string, string[]>,
};
