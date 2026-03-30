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
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="absolute top-6 z-20 flex w-full justify-between px-8">
        <Link
          href="/blog"
          className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-300"
        >
          Blog
        </Link>
        <Link
          href="/resume"
          className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-300"
        >
          Resume
        </Link>
      </nav>

      {/* Glow */}
      <GlowEffect isOn={isOn} accentColor={accentColor} />

      {/* Text */}
      <LampText isOn={isOn} accentColor={accentColor} />

      {/* Pull Cord */}
      <PullCord onToggle={handleToggle} />

      {/* Color Picker */}
      <ColorPicker
        currentColor={accentColor}
        onColorChange={setAccentColor}
      />
    </div>
  );
}
