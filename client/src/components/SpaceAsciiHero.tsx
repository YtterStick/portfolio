import React, { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useVelocity } from 'framer-motion';

interface MatrixCell {
  x: number;
  y: number;
  nx: number;
  ny: number;
  alpha: number;
  rim: boolean;
  seed: number;
}

interface AmbientSpeck {
  x: number;
  y: number;
  speed: number;
  seed: number;
}

const DENSITY_GLYPHS = ['·', ':', '+', '*', '#', '@'];

const SpaceAsciiHero: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const liveScrollRef = useRef({ y: 0, vel: 0 });
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const unsubY = scrollY.on('change', (v) => {
      liveScrollRef.current.y = v;
    });
    const unsubVel = scrollVelocity.on('change', (v) => {
      liveScrollRef.current.vel = v;
    });
    return () => {
      unsubY();
      unsubVel();
    };
  }, [scrollY, scrollVelocity]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let disposed = false;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let cellSize = 8;
    let cells: MatrixCell[] = [];
    let specks: AmbientSpeck[] = [];

    const buildMatrix = () => {
      if (disposed || !wrap) return;
      const rect = wrap.getBoundingClientRect();
      width = Math.max(280, Math.floor(rect.width));
      const isCompact = width < 720;
      height = isCompact ? 196 : Math.min(270, Math.max(195, Math.round(width * 0.2)));

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellSize = isCompact ? 5.5 : width < 1040 ? 6.5 : 7.5;

      // Offscreen high-contrast text mask
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');
      if (!octx) return;

      octx.clearRect(0, 0, width, height);
      octx.fillStyle = '#ffffff';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';

      if (isCompact) {
        const fs = Math.min(82, Math.floor(width * 0.22));
        octx.font = `800 ${fs}px "Geist", "Arial Black", sans-serif`;
        octx.fillText('ANDREI', width / 2, height * 0.33);
        octx.fillText('DILAG', width / 2, height * 0.72);
      } else {
        // Fit single-line "ANDREI DILAG" cleanly across stage width
        const testFs = 160;
        octx.font = `800 ${testFs}px "Geist", "Arial Black", sans-serif`;
        const measured = octx.measureText('ANDREI DILAG').width || width;
        const fs = Math.min(Math.floor(height * 0.72), Math.floor((testFs * width * 0.93) / measured));
        octx.font = `800 ${fs}px "Geist", "Arial Black", sans-serif`;
        octx.fillText('ANDREI DILAG', width / 2, height * 0.53);
      }

      const img = octx.getImageData(0, 0, width, height).data;
      const sampleAlpha = (px: number, py: number) => {
        const ix = Math.max(0, Math.min(width - 1, px | 0));
        const iy = Math.max(0, Math.min(height - 1, py | 0));
        return img[(iy * width + ix) * 4 + 3] / 255;
      };

      const nextCells: MatrixCell[] = [];
      const stepX = cellSize;
      const stepY = cellSize * 1.18;

      for (let y = stepY * 0.5; y < height - stepY * 0.3; y += stepY) {
        for (let x = stepX * 0.5; x < width - stepX * 0.3; x += stepX) {
          const aCenter = sampleAlpha(x, y);
          const aAvg =
            (aCenter * 2 +
              sampleAlpha(x - stepX * 0.35, y) +
              sampleAlpha(x + stepX * 0.35, y) +
              sampleAlpha(x, y - stepY * 0.35) +
              sampleAlpha(x, y + stepY * 0.35)) /
            6;

          if (aAvg > 0.14) {
            const neighborMin = Math.min(
              sampleAlpha(x - stepX, y),
              sampleAlpha(x + stepX, y),
              sampleAlpha(x, y - stepY),
              sampleAlpha(x, y + stepY)
            );
            const seed = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1;
            nextCells.push({
              x,
              y,
              nx: x / width,
              ny: y / height,
              alpha: Math.min(1, aAvg * 1.15),
              rim: neighborMin < 0.25,
              seed,
            });
          }
        }
      }

      cells = nextCells;
      specks = Array.from({ length: 42 }, (_, i) => ({
        x: (((Math.sin(i * 51.3) * 19531.7) % 1 + 1) % 1) * width,
        y: (((Math.cos(i * 23.9) * 31987.3) % 1 + 1) % 1) * height,
        speed: 0.12 + (i % 4) * 0.08,
        seed: i * 0.77,
      }));
    };

    const draw = (now: number) => {
      if (disposed) return;
      ctx.clearRect(0, 0, width, height);

      const t = prefersReduced ? 0 : now * 0.001;
      const sy = prefersReduced ? 0 : liveScrollRef.current.y;
      const vel = prefersReduced ? 0 : liveScrollRef.current.vel;
      const heroScrollFactor = Math.min(1, Math.max(0, sy / 620));
      const velNorm = Math.min(1, Math.abs(vel) / 1800);

      // Subtle orbital horizon arc behind hero matrix
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 2.35 - heroScrollFactor * 28, width * 0.92, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();

      // Ambient starfield specks inside hero frame with scroll parallax
      ctx.font = `500 ${Math.max(8, cellSize * 0.95)}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < specks.length; i++) {
        const sp = specks[i];
        let py = (sp.y - sy * sp.speed) % height;
        if (py < 0) py += height;
        const pulse = prefersReduced ? 0.5 : 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.8 + sp.seed));
        ctx.fillStyle = `rgba(56, 189, 248, ${(pulse * 0.35).toFixed(3)})`;
        ctx.fillText(i % 2 === 0 ? '·' : '+', sp.x, py);
      }

      // Main ASCII Pixel-Matrix Wordmark
      const fontPx = Math.max(8.5, cellSize * 1.16);
      ctx.font = `600 ${fontPx}px "JetBrains Mono", monospace`;

      const ptr = pointerRef.current;
      const rippleRadius = Math.max(95, width * 0.11);
      const scrollDriftY = -heroScrollFactor * 22;
      const scrollPhase = sy * 0.022;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];

        // Continuous wave + scroll-linked phase & turbulence
        const wave = Math.sin(c.nx * 9.5 - t * 2.1 + scrollPhase + c.ny * 3.2);
        const scrollScatter =
          heroScrollFactor > 0.02
            ? Math.sin(c.seed * 40 + sy * 0.015) * heroScrollFactor * (c.rim ? 14 : 4.5)
            : 0;
        const velJitter = velNorm > 0.04 ? (c.seed - 0.5) * velNorm * 9 : 0;

        let dx = scrollScatter * 0.45;
        let dy = scrollDriftY + wave * (prefersReduced ? 0 : 1.4) + velJitter;
        let boost = 0;

        if (ptr.active && !prefersReduced) {
          const pdx = c.x - ptr.x;
          const pdy = c.y + scrollDriftY - ptr.y;
          const dist = Math.hypot(pdx, pdy);
          if (dist < rippleRadius) {
            const falloff = 1 - dist / rippleRadius;
            boost = falloff * falloff;
            const push = boost * 7.5;
            const angle = Math.atan2(pdy, pdx);
            dx += Math.cos(angle) * push;
            dy += Math.sin(angle) * push;
          }
        }

        // Map density + wave + scroll velocity + cursor boost -> ASCII glyph
        const densityShift =
          c.alpha * 0.78 +
          (wave * 0.5 + 0.5) * 0.18 +
          boost * 0.45 -
          heroScrollFactor * (c.rim ? 0.32 : 0.12) +
          velNorm * 0.15;

        const maxIdx = DENSITY_GLYPHS.length - 1;
        let gIdx = Math.round(Math.max(0, Math.min(1, densityShift)) * maxIdx);
        if (!prefersReduced && (boost > 0.25 || velNorm > 0.25) && ((i + Math.floor(t * 14 + sy * 0.08)) % 5 === 0)) {
          gIdx = Math.max(1, (gIdx + 2) % DENSITY_GLYPHS.length);
        }

        const glyph = DENSITY_GLYPHS[gIdx];
        const lum = Math.min(1, (0.58 + c.alpha * 0.42 + boost * 0.4) * (1 - heroScrollFactor * 0.28));

        if (boost > 0.16) {
          ctx.fillStyle = `rgba(125, 211, 252, ${Math.min(1, lum + 0.2).toFixed(3)})`;
        } else if (c.rim && (wave > 0.55 || velNorm > 0.18)) {
          ctx.fillStyle = `rgba(56, 189, 248, ${(lum * 0.92).toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(241, 245, 249, ${lum.toFixed(3)})`;
        }

        ctx.fillText(glyph, c.x + dx, c.y + dy);
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    const initFontsAndBuild = async () => {
      if (document.fonts?.ready) {
        try {
          await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))]);
        } catch {
          // ignore
        }
      }
      if (disposed) return;
      buildMatrix();
      draw(performance.now());
    };

    // Build immediately with fallback metrics, then refine once web fonts settle
    buildMatrix();
    draw(performance.now());
    initFontsAndBuild();

    const onResize = () => {
      buildMatrix();
      if (prefersReduced) draw(performance.now());
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="telemetry-panel hud-scanlines relative w-full overflow-hidden rounded-sm px-3 py-4 sm:px-6 sm:py-5"
    >
      {/* Top HUD Telemetry Strip inside Hero Stage */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-400/10 pb-2.5 font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase sm:text-[11px]">
        <span className="flex items-center gap-2 text-sky-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          LIVE ASCII // ORBITAL PIXEL-MATRIX
        </span>
        <span className="hidden text-slate-500 md:inline">SWEEP CURSOR OR SCROLL TO MODULATE TELEMETRY</span>
        <span className="text-slate-400">QC 14.70°N · 121.04°E</span>
      </div>

      <h1 className="sr-only">Andrei Dilag — IT Faculty Teacher and Full-Stack Engineer</h1>
      <canvas ref={canvasRef} className="block w-full select-none" aria-hidden="true" />

      {/* Bottom coordinate ruler */}
      <div className="mt-2 flex items-center justify-between border-t border-slate-400/10 pt-2 font-telemetry text-[10px] tracking-[0.14em] text-slate-500 uppercase">
        <span>AZM 000.0° ─── 090.0° ─── 180.0°</span>
        <span className="text-sky-400/80">GLYPH MATRIX: @ # * + : ·</span>
      </div>
    </div>
  );
};

export default SpaceAsciiHero;
