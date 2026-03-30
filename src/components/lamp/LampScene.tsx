"use client";

import { useState } from "react";
import Link from "next/link";
import { PullCord } from "./PullCord";
import { GlowEffect } from "./GlowEffect";
import { LampText } from "./LampText";
import { ColorPicker } from "./ColorPicker";

export function LampScene() {
  const [isOn, setIsOn] = useState(false);
  const [accentColor, setAccentColor] = useState("#F97316");

  const handleToggle = () => setIsOn((prev) => !prev);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#060606]">
      {/* Navigation */}
      <nav className="absolute top-0 z-20 flex w-full justify-between px-8 py-6">
        <Link
          href="/blog"
          className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 transition-colors duration-300 hover:text-white/60"
        >
          Blog
        </Link>
        <Link
          href="/resume"
          className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 transition-colors duration-300 hover:text-white/60"
        >
          Resume
        </Link>
      </nav>

      {/* Light */}
      <GlowEffect isOn={isOn} accentColor={accentColor} />

      {/* Text */}
      <LampText isOn={isOn} accentColor={accentColor} />

      {/* Rope (canvas-based physics) */}
      <PullCord onToggle={handleToggle} />

      {/* Color Picker */}
      <ColorPicker currentColor={accentColor} onColorChange={setAccentColor} />
    </div>
  );
}
