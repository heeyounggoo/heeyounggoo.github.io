"use client";

import { motion } from "framer-motion";

interface GlowEffectProps {
  isOn: boolean;
  accentColor: string;
}

export function GlowEffect({ isOn, accentColor }: GlowEffectProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: isOn ? 0.6 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 60%)`,
          filter: "blur(80px)",
          willChange: "opacity",
        }}
      />

      {/* Middle glow */}
      <motion.div
        animate={{ opacity: isOn ? 0.7 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 50%)`,
          filter: "blur(40px)",
          willChange: "opacity",
        }}
      />

      {/* Inner glow — brightest */}
      <motion.div
        animate={{ opacity: isOn ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${accentColor}50 0%, transparent 40%)`,
          filter: "blur(20px)",
          willChange: "opacity",
        }}
      />
    </div>
  );
}
