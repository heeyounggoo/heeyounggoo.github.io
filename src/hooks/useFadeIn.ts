"use client";

import { useEffect, useRef, useState } from "react";

interface UseFadeInOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export function useFadeIn({
  threshold = 0.15,
  delay = 0,
  once = true,
}: UseFadeInOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timerId = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, [threshold, delay, once]);

  return { ref, isVisible };
}
