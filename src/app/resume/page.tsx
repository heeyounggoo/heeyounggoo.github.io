import Link from "next/link";
import { career, education, projects } from "@/data/resumeData";
import type { ProjectPage, ProjectSection, DetailCategory, SubItem } from "@/data/resumeData";
import { PrintButton } from "@/components/PrintButton";

export const metadata = {
  title: "이력서 | 구희영",
  description: "프론트엔드 개발자 구희영 이력서",
};

function SubItemList({ item }: { item: SubItem }) {
  return (
    <li className="mb-1">
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
      {item.subItems && (
        <ul className="ml-4 mt-1 list-disc text-neutral-600">
          {item.subItems.map((sub, i) => (
            <li key={i} className="mb-0.5" dangerouslySetInnerHTML={{ __html: sub.text }} />
          ))}
        </ul>
      )}
    </li>
  );
}

function DetailSection({ detail }: { detail: DetailCategory }) {
  return (
    <div className="mb-3">
      {detail.category && (
        <h5 className="mb-1 text-sm font-semibold text-neutral-700">{detail.category}</h5>
      )}
      <ul className="ml-4 list-disc text-sm leading-relaxed text-neutral-700">
        {detail.items.map((item, i) => (
          <SubItemList key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

function ProjectSectionBlock({ section }: { section: ProjectSection }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline gap-3">
        <h4 className="text-base font-bold text-neutral-900">{section.title}</h4>
        {section.techs && (
          <p className="text-xs text-neutral-400">{section.techs.join(" · ")}</p>
        )}
      </div>

      {/* Background */}
      <div className="mb-2 rounded bg-neutral-50 px-3 py-2">
        <p className="text-xs font-medium text-neutral-500 mb-1">배경</p>
        <ul className="ml-4 list-disc text-sm text-neutral-600">
          {section.background.map((bg, i) => (
            <li key={i}>{bg}</li>
          ))}
        </ul>
      </div>

      {/* Details */}
      {section.details.map((detail, i) => (
        <DetailSection key={i} detail={detail} />
      ))}

      {/* Results */}
      <div className="mt-2 rounded bg-orange-50 px-3 py-2">
        <p className="text-xs font-medium text-orange-600 mb-1">성과</p>
        <ul className="ml-4 list-disc text-sm text-orange-800">
          {section.results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectPageBlock({ page }: { page: ProjectPage }) {
  return (
    <section className="mb-10 break-inside-avoid">
      <div className="mb-4 border-l-4 border-orange-500 pl-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-bold text-neutral-900">{page.company}</h3>
          <span className="text-xs text-neutral-400">{page.period} · {page.contribution}</span>
        </div>
        <p className="mt-0.5 text-sm text-neutral-600">{page.companySummary}</p>
      </div>

      {page.sections.map((section, i) => (
        <ProjectSectionBlock key={i} section={section} />
      ))}
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 print:max-w-none print:px-8 print:py-6">
      <Link
        href="/"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-800 print:hidden"
      >
        &larr; Home
      </Link>

      {/* Header */}
      <header className="mt-6 mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">구희영</h1>
        <p className="mt-1 text-lg text-neutral-600">Frontend Developer</p>
        <div className="mt-2 flex gap-4 text-sm text-neutral-500">
          <a href="mailto:gmldud628@gmail.com" className="hover:text-orange-500">
            gmldud628@gmail.com
          </a>
          <a
            href="https://github.com/heeyounggoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Career */}
      <section className="mb-10">
        <h2 className="mb-4 border-b-2 border-neutral-900 pb-1 text-xl font-bold text-neutral-900">
          경력
        </h2>
        {career.map((c) => (
          <div key={c.company} className="mb-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <h3 className="font-bold text-neutral-900">{c.company}</h3>
                {c.companyDesc && (
                  <span className="text-xs text-neutral-400">{c.companyDesc}</span>
                )}
              </div>
              <span className="text-sm text-neutral-500">{c.period} ({c.duration})</span>
            </div>
            <p className="text-sm text-neutral-600">{c.position}</p>
            <ul className="ml-4 mt-1 list-disc text-sm text-neutral-600">
              {c.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-10">
        <h2 className="mb-4 border-b-2 border-neutral-900 pb-1 text-xl font-bold text-neutral-900">
          학력
        </h2>
        {education.map((e) => (
          <div key={e.school} className="mb-2 flex items-baseline justify-between">
            <div>
              <span className="font-medium text-neutral-900">{e.school}</span>
              <span className="ml-2 text-sm text-neutral-500">{e.major}</span>
            </div>
            <span className="text-sm text-neutral-500">{e.period}</span>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-6 border-b-2 border-neutral-900 pb-1 text-xl font-bold text-neutral-900">
          프로젝트
        </h2>
        {projects.map((page, i) => (
          <ProjectPageBlock key={i} page={page} />
        ))}
      </section>

      {/* Print button */}
      <div className="mt-8 text-center print:hidden">
        <PrintButton />
      </div>
    </main>
  );
}
