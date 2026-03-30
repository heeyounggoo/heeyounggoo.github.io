"use client";

import { useRef, useEffect, useCallback } from "react";

const NUM_SEGMENTS = 28;
const GRAVITY = 0.3;
const DAMPING = 0.985;
const ITERATIONS = 12;
const HANDLE_RADIUS = 8;
const DRAG_THRESHOLD = 40;

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

interface PullCordProps {
  onToggle: () => void;
}

export function PullCord({ onToggle }: PullCordProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const isDraggingRef = useRef(false);
  const dragIndexRef = useRef(-1);
  const animFrameRef = useRef<number>(0);
  const segLenRef = useRef(16);
  const cssWidthRef = useRef(0);
  const cssHeightRef = useRef(0);

  const initRope = useCallback(() => {
    const w = cssWidthRef.current;
    const h = cssHeightRef.current;
    if (w === 0 || h === 0) return;

    const cx = w / 2;
    const totalLength = h * 0.52;
    const segLen = totalLength / NUM_SEGMENTS;
    segLenRef.current = segLen;

    const points: Point[] = [];
    for (let i = 0; i <= NUM_SEGMENTS; i++) {
      points.push({
        x: cx,
        y: i * segLen,
        oldX: cx,
        oldY: i * segLen,
        pinned: i === 0,
      });
    }
    pointsRef.current = points;
  }, []);

  const simulate = useCallback(() => {
    const points = pointsRef.current;
    if (points.length === 0) return;
    const segLen = segLenRef.current;
    const cx = cssWidthRef.current / 2;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.pinned) continue;
      const vx = (p.x - p.oldX) * DAMPING;
      const vy = (p.y - p.oldY) * DAMPING;
      p.oldX = p.x;
      p.oldY = p.y;
      p.x += vx;
      p.y += vy + GRAVITY;
    }

    for (let iter = 0; iter < ITERATIONS; iter++) {
      points[0].x = cx;
      points[0].y = 0;

      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) continue;
        const diff = (segLen - dist) / dist;
        const ox = dx * diff * 0.5;
        const oy = dy * diff * 0.5;
        if (!a.pinned) { a.x -= ox; a.y -= oy; }
        if (!b.pinned) { b.x += ox; b.y += oy; }
      }
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const points = pointsRef.current;
    if (points.length < 2) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Rope curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      ctx.bezierCurveTo(
        p1.x + (p2.x - p0.x) / 6,
        p1.y + (p2.y - p0.y) / 6,
        p2.x - (p3.x - p1.x) / 6,
        p2.y - (p3.y - p1.y) / 6,
        p2.x, p2.y,
      );
    }
    ctx.strokeStyle = "rgba(200,200,200,0.5)";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.stroke();

    // Handle bead
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y + 1, HANDLE_RADIUS + 1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    const grad = ctx.createRadialGradient(
      last.x - HANDLE_RADIUS * 0.3, last.y - HANDLE_RADIUS * 0.3, 0,
      last.x, last.y, HANDLE_RADIUS,
    );
    grad.addColorStop(0, "#e0e0e0");
    grad.addColorStop(0.5, "#aaa");
    grad.addColorStop(1, "#666");
    ctx.beginPath();
    ctx.arc(last.x, last.y, HANDLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Top anchor
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,150,150,0.4)";
    ctx.fill();

    ctx.restore();
  }, []);

  const loop = useCallback(() => {
    simulate();
    draw();
    animFrameRef.current = requestAnimationFrame(loop);
  }, [simulate, draw]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    cssWidthRef.current = rect.width;
    cssHeightRef.current = rect.height;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }, []);

  useEffect(() => {
    const start = () => {
      resizeCanvas();
      initRope();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    // Wait for layout
    requestAnimationFrame(() => requestAnimationFrame(start));

    const onResize = () => {
      resizeCanvas();
      initRope();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [initRope, loop, resizeCanvas]);

  // --- Pointer events ---
  const getCSSPos = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }, [],
  );

  // Find closest point on rope to click position
  const findClosestPoint = useCallback((pos: { x: number; y: number }) => {
    const points = pointsRef.current;
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 1; i < points.length; i++) {
      const dx = pos.x - points[i].x;
      const dy = pos.y - points[i].y;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    // Allow grabbing if within 40px of any rope point
    return bestDist < 40 * 40 ? bestIdx : -1;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const pos = getCSSPos(e);
      const idx = findClosestPoint(pos);
      if (idx >= 0) {
        isDraggingRef.current = true;
        dragIndexRef.current = idx;
        pointsRef.current[idx].pinned = true;
        pointsRef.current[idx].x = pos.x;
        pointsRef.current[idx].y = pos.y;
        (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
      }
    },
    [getCSSPos, findClosestPoint],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDraggingRef.current) return;
      const pos = getCSSPos(e);
      const idx = dragIndexRef.current;
      if (idx >= 0 && pointsRef.current[idx]) {
        pointsRef.current[idx].x = pos.x;
        pointsRef.current[idx].y = pos.y;
      }
    },
    [getCSSPos],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const idx = dragIndexRef.current;
    if (idx >= 0 && pointsRef.current[idx]) {
      pointsRef.current[idx].pinned = false;
    }
    dragIndexRef.current = -1;

    // Toggle check — last point displacement from rest
    const last = pointsRef.current[pointsRef.current.length - 1];
    if (!last) return;
    const cx = cssWidthRef.current / 2;
    const restY = NUM_SEGMENTS * segLenRef.current;
    const dx = last.x - cx;
    const dy = last.y - restY;
    if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      onToggle();
    }
  }, [onToggle]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 z-10 h-full w-full touch-none"
      style={{ cursor: "grab" }}
    />
  );
}
