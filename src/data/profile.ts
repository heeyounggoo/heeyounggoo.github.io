export const profile = {
  name: "구희영",
  role: "Frontend Developer · 7년차",
  bio: "디자인시스템과 모노레포 아키텍처를 설계하여 팀 공통 개발 기반을 구축하고, 수치 기반으로 성능을 개선하는 프론트엔드 개발자입니다.",
  email: "gmldud628@gmail.com",
  github: "https://github.com/heeyounggoo",
  skills: {
    Frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
    ],
    "State & Data": ["TanStack Query", "Zustand", "Vuex", "zod"],
    Styling: ["vanilla-extract", "Tailwind CSS", "SCSS"],
    "Build & Infra": ["Turborepo", "pnpm", "Vite", "webpack"],
    "Testing & DX": ["Storybook", "Jest", "Playwright"],
    Tools: ["Git", "Figma", "AWS"],
  } as Record<string, string[]>,
};
