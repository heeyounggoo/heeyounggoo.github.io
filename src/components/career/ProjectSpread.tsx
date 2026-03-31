"use client";

import type {
  ProjectPage,
  ProjectSection,
  DetailCategory,
  SubItem,
} from "@/data/resumeData";
import { FadeIn } from "@/components/FadeIn";

/* ─── Atomic detail blocks ────────────────────────────── */

function SubItemList({ item }: { item: SubItem }) {
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-neutral-300">
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
      {item.subItems && (
        <ul className="mt-1.5 space-y-1 text-neutral-500">
          {item.subItems.map((sub, i) => (
            <li
              key={i}
              className="relative pl-4 text-[13px] leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-1.5 before:bg-neutral-200"
              dangerouslySetInnerHTML={{ __html: sub.text }}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function DetailBlock({ detail }: { detail: DetailCategory }) {
  return (
    <div className="mb-5">
      {detail.category && (
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400">
          {detail.category}
        </p>
      )}
      <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-600">
        {detail.items.map((item, i) => (
          <SubItemList key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

function SectionBlock({ section, delay }: { section: ProjectSection; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="mb-10">
        {/* Title + tech */}
        <div className="mb-3">
          <h4 className="text-[15px] font-semibold tracking-tight text-black">
            {section.title}
          </h4>
          {section.techs && (
            <p className="mt-0.5 text-xs text-neutral-400">
              {section.techs.join(" / ")}
            </p>
          )}
        </div>

        {/* Background */}
        <div className="mb-5 border-l border-neutral-200 pl-4">
          <ul className="space-y-0.5 text-[13px] leading-relaxed text-neutral-500">
            {section.background.map((bg, i) => (
              <li key={i}>{bg}</li>
            ))}
          </ul>
        </div>

        {/* Details */}
        {section.details.map((detail, i) => (
          <DetailBlock key={i} detail={detail} />
        ))}

        {/* Results */}
        <div className="mt-4 border-t border-dashed border-neutral-200 pt-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400">
            Result
          </p>
          <ul className="space-y-1 text-sm text-neutral-700">
            {section.results.map((r, i) => (
              <li
                key={i}
                className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-black"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Main spread ─────────────────────────────────────── */

export function ProjectSpread({
  page,
  index,
}: {
  page: ProjectPage;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      data-spread-index={index}
      className="relative min-h-screen px-8 py-24 md:py-32"
    >
      <div
        className={`mx-auto flex max-w-[1100px] flex-col gap-12 md:flex-row md:gap-16 ${
          isEven ? "" : "md:flex-row-reverse"
        }`}
      >
        {/* Left: large company label */}
        <div
          className={`flex shrink-0 flex-col md:w-[35%] ${
            isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"
          }`}
        >
          <FadeIn>
            <div className="sticky top-32">
              <h3 className="text-5xl font-bold tracking-tighter md:text-6xl">
                {page.company}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {page.companySummary}
              </p>
              <div className="mt-4 space-y-0.5 text-xs text-neutral-400">
                <p>{page.period}</p>
                <p>{page.contribution}</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: project content */}
        <div className="flex-1">
          {page.sections.map((section, i) => (
            <SectionBlock key={i} section={section} delay={i * 150} />
          ))}
        </div>
      </div>

      {/* Subtle section divider */}
      <div className="mx-auto mt-16 h-px w-16 bg-neutral-200" />
    </section>
  );
}
