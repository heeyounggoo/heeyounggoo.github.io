"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { name: "Orange", value: "#F97316" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#22C55E" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "White", value: "#E5E5E5" },
];

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-8 right-8 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 right-0 flex gap-2 rounded-full bg-neutral-900/80 px-3 py-2 backdrop-blur-sm"
          >
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  onColorChange(color.value);
                  setIsOpen(false);
                }}
                className="relative h-6 w-6 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: color.value }}
                aria-label={`${color.name} 색상 선택`}
              >
                {currentColor === color.value && (
                  <span className="absolute inset-0 rounded-full ring-2 ring-white ring-offset-2 ring-offset-neutral-900" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/60 backdrop-blur-sm transition-colors hover:bg-neutral-800/80"
        aria-label="색상 팔레트 열기"
      >
        <div
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: currentColor }}
        />
      </button>
    </div>
  );
}
