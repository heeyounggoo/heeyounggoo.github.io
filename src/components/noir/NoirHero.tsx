"use client";

import { useEffect, useRef, useCallback } from "react";
import opentype from "opentype.js";

interface SamplePoint {
  x: number;
  y: number;
}

interface ContourData {
  restPoints: SamplePoint[];
  currentPoints: SamplePoint[];
  springs: { vx: number; vy: number; dx: number; dy: number }[];
  closed: boolean;
}

export function NoirHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const contoursRef = useRef<ContourData[]>([]);
  const rafRef = useRef<number>(0);
  const fontRef = useRef<opentype.Font | null>(null);
  const scaleRef = useRef(1);

  const text = "→hello.";

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    if (fontRef.current) {
      buildGlyphs(fontRef.current);
    }
  }, []);

  // Sample a path into evenly-spaced points per contour
  const buildGlyphs = useCallback((font: opentype.Font) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const targetWidth = w * 0.35;
    const testSize = 100;
    const testPath = font.getPath(text, 0, 0, testSize);
    const bb = testPath.getBoundingBox();
    const testWidth = bb.x2 - bb.x1;
    const fontSize = (targetWidth / testWidth) * testSize;

    const path = font.getPath(text, 0, 0, fontSize);
    const bounds = path.getBoundingBox();
    const textW = bounds.x2 - bounds.x1;
    const textH = bounds.y2 - bounds.y1;

    const ox = (w - textW) / 2 - bounds.x1;
    const oy = (h - textH) / 2 - bounds.y1;

    scaleRef.current = dpr;

    // Split commands into contours and sample each
    const SAMPLE_STEP = 3; // pixels between samples — smaller = smoother
    const contours: ContourData[] = [];
    let currentContourCmds: opentype.PathCommand[] = [];

    const flushContour = () => {
      if (currentContourCmds.length === 0) return;
      const samples = sampleContour(currentContourCmds, ox, oy, SAMPLE_STEP);
      if (samples.length > 0) {
        contours.push({
          restPoints: samples.map((p) => ({ ...p })),
          currentPoints: samples,
          springs: samples.map(() => ({ vx: 0, vy: 0, dx: 0, dy: 0 })),
          closed: currentContourCmds[currentContourCmds.length - 1].type === "Z",
        });
      }
      currentContourCmds = [];
    };

    for (const cmd of path.commands) {
      if (cmd.type === "M" && currentContourCmds.length > 0) {
        flushContour();
      }
      currentContourCmds.push(cmd);
    }
    flushContour();

    contoursRef.current = contours;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const fontUrl =
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf";

    opentype.load(fontUrl, (err, font) => {
      if (err || !font) {
        console.error("Font load error:", err);
        return;
      }
      fontRef.current = font;
      buildGlyphs(font);
    });

    const stiffness = 0.04;
    const damping = 0.82;
    const radius = 100;
    const strength = 45;

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || contoursRef.current.length === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const dpr = scaleRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const mouse = mouseRef.current;

      // Update spring physics for every sample point
      for (const contour of contoursRef.current) {
        const { restPoints, currentPoints, springs } = contour;

        for (let i = 0; i < restPoints.length; i++) {
          const rp = restPoints[i];
          const dx = mouse.x - rp.x;
          const dy = mouse.y - rp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const t = Math.max(0, 1 - dist / radius);
          const force = t * t * (3 - 2 * t); // smoothstep

          const angle = Math.atan2(dy, dx);
          const targetDx = -Math.cos(angle) * force * strength;
          const targetDy = -Math.sin(angle) * force * strength;

          const s = springs[i];
          s.vx = (s.vx + (targetDx - s.dx) * stiffness) * damping;
          s.vy = (s.vy + (targetDy - s.dy) * stiffness) * damping;
          s.dx += s.vx;
          s.dy += s.vy;

          currentPoints[i] = {
            x: rp.x + s.dx,
            y: rp.y + s.dy,
          };
        }
      }

      // Draw using Catmull-Rom splines for smooth curves through sample points
      ctx.beginPath();
      ctx.fillStyle = "#000";

      for (const contour of contoursRef.current) {
        const pts = contour.currentPoints;
        if (pts.length < 2) continue;

        if (contour.closed) {
          drawClosedCatmullRom(ctx, pts);
        } else {
          drawOpenCatmullRom(ctx, pts);
        }
      }

      ctx.fill("evenodd");

      // ─── Liquid glass cursor ───────────────────────────
      if (mouse.x > -999 && mouse.y > -999) {
        const glassR = radius;
        ctx.save();

        // Outer soft glow
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, glassR * 0.6,
          mouse.x, mouse.y, glassR,
        );
        glow.addColorStop(0, "rgba(255,255,255,0.04)");
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glassR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Glass body — very subtle tinted fill
        const glass = ctx.createRadialGradient(
          mouse.x - glassR * 0.25, mouse.y - glassR * 0.3, 0,
          mouse.x, mouse.y, glassR * 0.85,
        );
        glass.addColorStop(0, "rgba(255,255,255,0.08)");
        glass.addColorStop(0.5, "rgba(240,245,255,0.04)");
        glass.addColorStop(1, "rgba(200,220,255,0.02)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glassR * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = glass;
        ctx.fill();

        // Rim / edge highlight
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glassR * 0.84, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Specular highlight — small crescent at top-left
        const specX = mouse.x - glassR * 0.28;
        const specY = mouse.y - glassR * 0.3;
        const spec = ctx.createRadialGradient(
          specX, specY, 0,
          specX, specY, glassR * 0.35,
        );
        spec.addColorStop(0, "rgba(255,255,255,0.15)");
        spec.addColorStop(0.5, "rgba(255,255,255,0.04)");
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(specX, specY, glassR * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = spec;
        ctx.fill();

        // Bottom caustic — faint light refraction
        const cauX = mouse.x + glassR * 0.15;
        const cauY = mouse.y + glassR * 0.35;
        const cau = ctx.createRadialGradient(
          cauX, cauY, 0,
          cauX, cauY, glassR * 0.25,
        );
        cau.addColorStop(0, "rgba(255,255,255,0.06)");
        cau.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(cauX, cauY, glassR * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = cau;
        ctx.fill();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleResize, buildGlyphs]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <span className="text-sm font-medium tracking-wide">HY</span>
        <nav className="flex gap-10 text-sm">
          <a href="/resume" className="transition-opacity hover:opacity-50">
            resume
          </a>
          <a href="/blog" className="transition-opacity hover:opacity-50">
            blog
          </a>
        </nav>
        <a
          href="/resume"
          className="text-sm transition-opacity hover:opacity-50"
        >
          about
        </a>
      </header>

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <footer className="relative z-10 mt-auto flex items-center justify-between px-8 py-6">
        <a
          href="mailto:heeyoung.goo@gmail.com"
          className="text-sm transition-opacity hover:opacity-50"
        >
          e-mail
        </a>
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/heeyounggoo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
          >
            Gh
          </a>
          <a
            href="https://linkedin.com/in/heeyounggoo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-50"
          >
            In
          </a>
        </div>
      </footer>
    </div>
  );
}

// ─── Sampling helpers ────────────────────────────────────────

function sampleContour(
  cmds: opentype.PathCommand[],
  ox: number,
  oy: number,
  step: number,
): SamplePoint[] {
  const points: SamplePoint[] = [];
  let cx = 0,
    cy = 0;
  let startX = 0,
    startY = 0;

  for (const cmd of cmds) {
    switch (cmd.type) {
      case "M":
        cx = cmd.x + ox;
        cy = cmd.y + oy;
        startX = cx;
        startY = cy;
        points.push({ x: cx, y: cy });
        break;

      case "L": {
        const tx = cmd.x + ox;
        const ty = cmd.y + oy;
        const len = Math.hypot(tx - cx, ty - cy);
        const steps = Math.max(1, Math.round(len / step));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          points.push({
            x: cx + (tx - cx) * t,
            y: cy + (ty - cy) * t,
          });
        }
        cx = tx;
        cy = ty;
        break;
      }

      case "Q": {
        const x1 = cmd.x1 + ox,
          y1 = cmd.y1 + oy;
        const tx = cmd.x + ox,
          ty = cmd.y + oy;
        const len = approxQuadLen(cx, cy, x1, y1, tx, ty);
        const steps = Math.max(2, Math.round(len / step));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const mt = 1 - t;
          points.push({
            x: mt * mt * cx + 2 * mt * t * x1 + t * t * tx,
            y: mt * mt * cy + 2 * mt * t * y1 + t * t * ty,
          });
        }
        cx = tx;
        cy = ty;
        break;
      }

      case "C": {
        const x1 = cmd.x1 + ox,
          y1 = cmd.y1 + oy;
        const x2 = cmd.x2 + ox,
          y2 = cmd.y2 + oy;
        const tx = cmd.x + ox,
          ty = cmd.y + oy;
        const len = approxCubicLen(cx, cy, x1, y1, x2, y2, tx, ty);
        const steps = Math.max(2, Math.round(len / step));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const mt = 1 - t;
          points.push({
            x:
              mt * mt * mt * cx +
              3 * mt * mt * t * x1 +
              3 * mt * t * t * x2 +
              t * t * t * tx,
            y:
              mt * mt * mt * cy +
              3 * mt * mt * t * y1 +
              3 * mt * t * t * y2 +
              t * t * t * ty,
          });
        }
        cx = tx;
        cy = ty;
        break;
      }

      case "Z": {
        // Close: sample line back to start if not already there
        const d = Math.hypot(startX - cx, startY - cy);
        if (d > 1) {
          const steps = Math.max(1, Math.round(d / step));
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            points.push({
              x: cx + (startX - cx) * t,
              y: cy + (startY - cy) * t,
            });
          }
        }
        // Don't push the start point again — drawClosedCatmullRom wraps around
        cx = startX;
        cy = startY;
        break;
      }
    }
  }

  return points;
}

function approxQuadLen(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  // Chord + control polygon average
  const chord = Math.hypot(x2 - x0, y2 - y0);
  const poly = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(x2 - x1, y2 - y1);
  return (chord + poly) / 2;
}

function approxCubicLen(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): number {
  const chord = Math.hypot(x3 - x0, y3 - y0);
  const poly =
    Math.hypot(x1 - x0, y1 - y0) +
    Math.hypot(x2 - x1, y2 - y1) +
    Math.hypot(x3 - x2, y3 - y2);
  return (chord + poly) / 2;
}

// ─── Catmull-Rom drawing ─────────────────────────────────────

function drawClosedCatmullRom(
  ctx: CanvasRenderingContext2D,
  pts: SamplePoint[],
) {
  const n = pts.length;
  if (n < 3) return;

  ctx.moveTo(pts[0].x, pts[0].y);

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }

  ctx.closePath();
}

function drawOpenCatmullRom(
  ctx: CanvasRenderingContext2D,
  pts: SamplePoint[],
) {
  const n = pts.length;
  if (n < 2) return;

  ctx.moveTo(pts[0].x, pts[0].y);

  if (n === 2) {
    ctx.lineTo(pts[1].x, pts[1].y);
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
}
