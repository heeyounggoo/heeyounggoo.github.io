"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Warm", value: "#FBBF24" },
];

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 right-6 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-12 right-0 flex gap-2.5 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-xl"
          >
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  onColorChange(color.value);
                  setIsOpen(false);
                }}
                className="group relative h-5 w-5 rounded-full transition-transform hover:scale-125"
                style={{ backgroundColor: color.value }}
                aria-label={`${color.name} 색상 선택`}
              >
                {currentColor === color.value && (
                  <span className="absolute -inset-1 rounded-full ring-1.5 ring-white/60" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10"
        aria-label="색상 팔레트"
      >
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: currentColor }}
        />
      </button>
    </div>
  );
}
