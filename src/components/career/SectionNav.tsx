"use client";

import { useEffect, useMemo, useState } from "react";

export function SectionNav({ companies }: { companies: string[] }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-spread-index]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.spreadIndex,
            );
            setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const uniqueCompanies = useMemo(() => {
    const seen = new Set<string>();
    return companies.reduce<{ name: string; index: number }[]>((acc, name, i) => {
      if (!seen.has(name)) {
        seen.add(name);
        acc.push({ name, index: i });
      }
      return acc;
    }, []);
  }, [companies]);

  return (
    <nav className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
      {uniqueCompanies.map(({ name, index }) => {
        const isActive =
          activeIndex >= 0 && companies[activeIndex] === name;

        return (
          <button
            key={name + index}
            onClick={() => {
              const el = document.querySelector(
                `[data-spread-index="${index}"]`,
              );
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <span
              className={`text-xs tracking-wide transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-black opacity-100"
                  : "translate-x-2 text-neutral-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {name}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-black"
                  : "h-1.5 w-1.5 bg-neutral-300"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
