"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

interface LampTextProps {
  isOn: boolean;
  accentColor: string;
}

export function LampText({ isOn, accentColor }: LampTextProps) {
  const glowShadow = `0 0 40px ${accentColor}AA, 0 0 100px ${accentColor}55, 0 0 200px ${accentColor}22`;
  const [titleScope, titleAnimate] = useAnimate();
  const [nameScope, nameAnimate] = useAnimate();
  const prevIsOn = useRef(isOn);

  useEffect(() => {
    const wasOff = !prevIsOn.current;
    prevIsOn.current = isOn;

    if (isOn && wasOff) {
      titleAnimate(
        titleScope.current,
        { opacity: [0.03, 0.2, 0.06, 0.5, 0.3, 1] },
        { duration: 0.5, delay: 0.1 },
      );
      nameAnimate(
        nameScope.current,
        { opacity: [0.03, 0.15, 0.05, 0.4, 0.25, 1] },
        { duration: 0.5, delay: 0.15 },
      );
    }
  }, [isOn, titleAnimate, nameAnimate, titleScope, nameScope]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center gap-4">
      <motion.p
        ref={titleScope}
        animate={
          isOn
            ? { opacity: 0.9, color: "#ffffff" }
            : { opacity: 0.03, color: "#1a1a1a" }
        }
        transition={isOn ? { duration: 0.5, delay: 0.1 } : { duration: 0.4 }}
        style={{ textShadow: isOn ? glowShadow : "none" }}
        className="text-base font-medium uppercase tracking-[0.3em] md:text-lg"
      >
        Frontend Developer
      </motion.p>
      <motion.h1
        ref={nameScope}
        animate={
          isOn
            ? { opacity: 1, color: "#ffffff" }
            : { opacity: 0.03, color: "#1a1a1a" }
        }
        transition={isOn ? { duration: 0.5, delay: 0.15 } : { duration: 0.4 }}
        style={{ textShadow: isOn ? glowShadow : "none" }}
        className="text-[3.5rem] font-black leading-none tracking-tight md:text-[7rem]"
      >
        GOO HEE YOUNG
      </motion.h1>
    </div>
  );
}
