"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const CORD_REST_Y = 0;
const DRAG_THRESHOLD = 80;
const CORD_TOP = 0;
const CORD_BASE_LENGTH = 180;
const HANDLE_SIZE = 18;

interface PullCordProps {
  onToggle: () => void;
}

export function PullCord({ onToggle }: PullCordProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(CORD_REST_Y);

  // Cord end position follows the handle
  const cordEndY = useTransform(y, (v) => CORD_BASE_LENGTH + v);

  // Slight horizontal sway when dragging for natural feel
  const swayX = useTransform(y, [0, 60, 150], [0, 2, -1]);

  const handleDragEnd = () => {
    if (y.get() > DRAG_THRESHOLD) {
      onToggle();
    }
    // Spring back
    animate(y, CORD_REST_Y, {
      type: "spring",
      stiffness: 400,
      damping: 12,
    });
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="relative mx-auto w-0" style={{ height: "100%" }}>
        {/* SVG cord line */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 overflow-visible"
          width="4"
          height="400"
          style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.1))" }}
        >
          <motion.line
            x1={2}
            y1={CORD_TOP}
            x2={2}
            y2={cordEndY}
            stroke="#666"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>

        {/* Draggable handle */}
        <div ref={constraintsRef} className="absolute left-1/2 top-0 -translate-x-1/2 h-[340px] w-12" />
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 150 }}
          dragElastic={0.05}
          style={{
            y,
            x: swayX,
            top: CORD_BASE_LENGTH - HANDLE_SIZE / 2,
          }}
          onDragEnd={handleDragEnd}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing touch-none"
        >
          {/* Bead handle */}
          <div
            className="rounded-full bg-neutral-400 shadow-md"
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          />
          {/* Small bead at bottom of cord */}
          <div
            className="mx-auto mt-0.5 rounded-full bg-neutral-500"
            style={{ width: 6, height: 6 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
