"use client";

import type { CareerItem, EducationItem } from "@/data/resumeData";
import { FadeIn } from "@/components/FadeIn";

export function CareerTimeline({
  career,
  education,
}: {
  career: CareerItem[];
  education: EducationItem[];
}) {
  return (
    <div>
      <FadeIn>
        <h2 className="mb-12 text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
          Overview
        </h2>
      </FadeIn>

      {/* Career */}
      <div className="relative border-l border-neutral-200 pl-8">
        {career.map((c, i) => (
          <FadeIn key={c.company} delay={i * 120}>
            <div className="relative mb-10">
              {/* Dot on line */}
              <div className="absolute -left-[calc(2rem+4.5px)] top-1.5 size-[9px] rounded-full border-2 border-black bg-white" />

              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{c.company}</h3>
                  {c.companyDesc && (
                    <span className="text-xs text-neutral-400">{c.companyDesc}</span>
                  )}
                </div>
                <span className="shrink-0 text-xs text-neutral-400">
                  {c.period} &middot; {c.duration}
                </span>
              </div>

              <p className="mt-1 text-sm text-neutral-500">{c.position}</p>

              <ul className="mt-3 space-y-1">
                {c.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="relative pl-4 text-sm leading-relaxed text-neutral-600 before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-neutral-300"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}

        {/* Education */}
        {education.map((e, i) => (
          <FadeIn key={e.school} delay={(career.length + i) * 120}>
            <div className="relative mb-6">
              <div className="absolute -left-[calc(2rem+3.5px)] top-1.5 size-[7px] rounded-full bg-neutral-300" />
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-medium">{e.school}</span>
                  <span className="ml-2 text-sm text-neutral-400">{e.major}</span>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{e.period}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
