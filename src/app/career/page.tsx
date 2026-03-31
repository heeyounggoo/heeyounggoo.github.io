import { career, education, projects } from "@/data/resumeData";
import { NavHeader } from "@/components/NavHeader";
import { CareerTimeline } from "@/components/career/CareerTimeline";
import { ProjectSpread } from "@/components/career/ProjectSpread";
import { SectionNav } from "@/components/career/SectionNav";

export const metadata = {
  title: "Career | 구희영",
  description: "프론트엔드 개발자 구희영 경력 상세",
};

export default function CareerPage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <NavHeader fixed />

      {/* Sticky section dots */}
      <SectionNav companies={projects.map((p) => p.company)} />

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
          Career
        </p>
        <h1 className="mt-4 text-6xl font-bold tracking-tighter md:text-8xl">
          Experience
        </h1>
        <p className="mt-6 text-sm text-neutral-400">scroll to explore</p>
        <div className="mt-8 h-12 w-px animate-pulse bg-neutral-300" />
      </section>

      {/* Career overview timeline */}
      <section className="mx-auto max-w-[900px] px-8 py-24" id="overview">
        <CareerTimeline career={career} education={education} />
      </section>

      {/* Project magazine spreads */}
      {projects.map((page, i) => (
        <ProjectSpread key={i} page={page} index={i} />
      ))}

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-12">
        <span className="text-xs text-neutral-300">
          &copy; 2026 Goo Hee Young
        </span>
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/heeyounggoo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
          >
            Gh
          </a>
          <a
            href="https://linkedin.com/in/heeyounggoo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
          >
            In
          </a>
        </div>
      </footer>
    </div>
  );
}
