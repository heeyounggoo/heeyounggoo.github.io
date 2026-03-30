"use client";

import { motion } from "framer-motion";

interface GlowEffectProps {
  isOn: boolean;
  accentColor: string;
}

export function GlowEffect({ isOn, accentColor }: GlowEffectProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1: Full-screen ambient wash — extremely soft, fills the room */}
      <motion.div
        animate={{ opacity: isOn ? 0.4 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${accentColor}18 0%, transparent 100%)`,
        }}
      />

      {/* Layer 2: Wide soft bloom — the light "filling" the space */}
      <motion.div
        animate={{ opacity: isOn ? 0.7 : 0, scale: isOn ? 1 : 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-1/2 top-[10%] -translate-x-1/2"
        style={{
          width: "min(900px, 90vw)",
          height: "min(900px, 90vh)",
          background: `radial-gradient(ellipse 55% 55% at 50% 25%, ${accentColor}30 0%, ${accentColor}10 40%, transparent 70%)`,
          filter: "blur(60px)",
          willChange: "opacity, transform",
        }}
      />

      {/* Layer 3: Core glow — rich saturated center, the "bulb" light */}
      <motion.div
        animate={{ opacity: isOn ? 1 : 0, scale: isOn ? 1 : 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 top-[5%] -translate-x-1/2"
        style={{
          width: "min(600px, 70vw)",
          height: "min(700px, 70vh)",
          background: `radial-gradient(ellipse 45% 40% at 50% 20%, ${accentColor}70 0%, ${accentColor}25 35%, transparent 65%)`,
          filter: "blur(30px)",
          willChange: "opacity, transform",
        }}
      />

      {/* Layer 4: Bright hotspot — small intense center where the bulb is */}
      <motion.div
        animate={{ opacity: isOn ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 280,
          height: 220,
          background: `radial-gradient(ellipse 60% 70% at 50% 40%, ${accentColor} 0%, ${accentColor}80 30%, transparent 70%)`,
          filter: "blur(12px)",
          willChange: "opacity",
        }}
      />

      {/* Layer 5: Downward light spill — light falls below center */}
      <motion.div
        animate={{ opacity: isOn ? 0.5 : 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: "min(800px, 85vw)",
          height: "60vh",
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${accentColor}15 0%, transparent 70%)`,
          filter: "blur(50px)",
          willChange: "opacity",
        }}
      />
    </div>
  );
}
