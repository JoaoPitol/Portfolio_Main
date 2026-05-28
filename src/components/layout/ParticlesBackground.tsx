'use client';

import { useEffect, useRef } from 'react';

// ── Sunset gradient palette – light mode (RGB tuples) ──────────────────────
const PALETTE: [number, number, number][] = [
  [255, 107, 53],  // #FF6B35  warm orange
  [255, 140, 66],  // #FF8C42  amber
  [255, 166, 43],  // #FFA62B  golden
  [230, 57, 70],  // #E63946  rose
  [255, 0, 110],   // #FF006E  hot pink
];

// ── Gray / black palette – dark mode ────────────────────────────────────────
const DARK_PALETTE: [number, number, number][] = [
  [20, 20, 20],  // near-black
  [50, 50, 50],  // very dark gray
  [80, 80, 80],  // dark gray
  [110, 110, 110], // medium gray
  [150, 150, 150], // light-medium gray
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;          // radius
  ci: number;         // color index into PALETTE
  opacity: number;
}

function particleCount() {
  if (typeof window === 'undefined') return 70;
  if (window.innerWidth < 640) return 28;
  if (window.innerWidth < 1024) return 50;
  return 70;
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    r: Math.random() * 1.5 + 5.5,
    ci: Math.floor(Math.random() * PALETTE.length),
    opacity: Math.random() * 0.45 + 0.12,
  };
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D;
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    let W = 0;
    let H = 0;

    // ── Setup / resize ────────────────────────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: particleCount() }, () => makeParticle(W, H));
    }

    // ── Draw loop ─────────────────────────────────────────────────────────
    const MAX_D = 140;          // max connection distance
    const MAX_D2 = MAX_D * MAX_D; // squared (avoids sqrt in culling)

    function draw() {
      const dark = document.documentElement.classList.contains('dark');
      const activePalette = dark ? DARK_PALETTE : PALETTE;
      const dotAlpha = dark ? 0.75 : 0.30;   // gray particles more visible in dark mode
      const lineAlpha = dark ? 0.18 : 0.07;
      const lineColor = dark ? '100,100,100' : '255,107,53';

      ctx.clearRect(0, 0, W, H);

      // ── Update & paint dots ──────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > W) { p.x = W; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > H) { p.y = H; p.vy *= -1; }

        const [r, g, b] = activePalette[p.ci];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(p.opacity * dotAlpha).toFixed(3)})`;
        ctx.fill();
      }

      // ── Connect nearby pairs ─────────────────────────────────────────
      for (let i = 0; i < particles.length - 1; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_D2) {
            const t = 1 - Math.sqrt(d2) / MAX_D; // 0 → 1, fades near edge
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineColor},${(t * lineAlpha).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Pause when tab is hidden to save resources ────────────────────────
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
  );
}
