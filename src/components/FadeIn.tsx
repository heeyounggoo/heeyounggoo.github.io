"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: FadeInProps) {
  const { ref, isVisible } = useFadeIn({ delay });

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
