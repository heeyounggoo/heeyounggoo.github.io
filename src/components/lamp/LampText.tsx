"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

interface LampTextProps {
  isOn: boolean;
  accentColor: string;
}

export function LampText({ isOn, accentColor }: LampTextProps) {
  const glowShadow = `0 0 20px ${accentColor}80, 0 0 60px ${accentColor}40, 0 0 100px ${accentColor}20`;
  const [titleScope, titleAnimate] = useAnimate();
  const [subtitleScope, subtitleAnimate] = useAnimate();
  const prevIsOn = useRef(isOn);

  useEffect(() => {
    const wasOff = !prevIsOn.current;
    prevIsOn.current = isOn;

    if (isOn && wasOff) {
      // Flicker on: incandescent warm-up effect
      titleAnimate(
        titleScope.current,
        { opacity: [0.05, 0.3, 0.1, 0.7, 0.4, 1] },
        { duration: 0.4, delay: 0.15 },
      );
      subtitleAnimate(
        subtitleScope.current,
        { opacity: [0.05, 0.25, 0.08, 0.6, 0.35, 1] },
        { duration: 0.4, delay: 0.2 },
      );
    }
  }, [isOn, titleAnimate, subtitleAnimate, titleScope, subtitleScope]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
      <motion.p
        ref={titleScope}
        animate={
          isOn
            ? { opacity: 1, textShadow: glowShadow, color: "#ffffff" }
            : { opacity: 0.05, textShadow: "none", color: "#1a1a1a" }
        }
        transition={isOn ? { duration: 0.4, delay: 0.15 } : { duration: 0.3 }}
        className="text-lg font-light uppercase tracking-[0.2em] md:text-xl"
      >
        Frontend Developer
      </motion.p>
      <motion.h1
        ref={subtitleScope}
        animate={
          isOn
            ? { opacity: 1, textShadow: glowShadow, color: "#ffffff" }
            : { opacity: 0.05, textShadow: "none", color: "#1a1a1a" }
        }
        transition={isOn ? { duration: 0.4, delay: 0.2 } : { duration: 0.3 }}
        className="text-4xl font-bold tracking-wider md:text-6xl"
      >
        Goo Hee Young
      </motion.h1>
    </div>
  );
}
