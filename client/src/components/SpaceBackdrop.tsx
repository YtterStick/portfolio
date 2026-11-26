import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  glyph: string | null;
  twinklePhase: number;
}

const GLYPHS = ['·', ':', '+', '*'];

const SpaceBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 120, damping: 28, mass: 0.4 });

  // Continuous scroll-linked orbital ring rotations & vertical parallax
  const outerRingRotate = useTransform(scrollYProgress, [0, 1], [0, 135]);
  const innerRingRotate = useTransform(scrollYProgress, [0, 1], [0, -190]);
  const outerRingY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const secondaryOrbY = useTransform(scrollYProgress, [0, 1], ['12%', '-28%']);

  const scrollStateRef = useRef({ y: 0, vel: 0 });

  useEffect(() => {
    const unsubY = scrollY.on('change', (v) => {
      scrollStateRef.current.y = v;
    });
    const unsubV = smoothVelocity.on('change', (v) => {
      scrollStateRef.current.vel = v;
    });
    return () => {
      unsubY();
      unsubV();
    };
  }, [scrollY, smoothVelocity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let rafId = 0;

    const seedStars = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(170, Math.max(75, Math.floor((width * height) / 13000)));
      stars = Array.from({ length: count }, (_, i) => {
        const tier = i % 3; // 0 = far, 1 = mid, 2 = near telemetry specks
        const speed = tier === 0 ? 0.05 : tier === 1 ? 0.14 : 0.28;
        const isGlyph = i % 5 === 0;
        return {
          x: ((Math.sin(i * 91.7) * 43758.5453) % 1 + 1) % 1 * width,
          y: ((Math.cos(i * 47.3) * 24634.6345) % 1 + 1) % 1 * height,
          size: tier === 0 ? 1 : tier === 1 ? 1.35 : 1.75,
          alpha: tier === 0 ? 0.18 : tier === 1 ? 0.32 : 0.48,
          speed,
          glyph: isGlyph ? GLYPHS[i % GLYPHS.length] : null,
          twinklePhase: i * 1.37,
        };
      });
    };

    const renderFrame = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle telemetry coordinate crosshairs at wide intervals
      const gridStep = 96;
      const offsetY = prefersReduced ? 0 : -(scrollStateRef.current.y * 0.08) % gridStep;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.035)';
      ctx.lineWidth = 1;

      for (let gx = (width % gridStep) / 2; gx < width; gx += gridStep) {
        for (let gy = offsetY; gy < height + gridStep; gy += gridStep) {
          ctx.beginPath();
          ctx.moveTo(gx - 3, gy);
          ctx.lineTo(gx + 3, gy);
          ctx.moveTo(gx, gy - 3);
          ctx.lineTo(gx, gy + 3);
          ctx.stroke();
        }
      }

      const t = now * 0.001;
      const sy = prefersReduced ? 0 : scrollStateRef.current.y;
      const vel = prefersReduced ? 0 : scrollStateRef.current.vel;
      const streak = Math.min(14, Math.abs(vel) * 0.0045);

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        let py = (s.y - sy * s.speed) % height;
        if (py < 0) py += height;

        const twinkle = prefersReduced ? 0.85 : 0.65 + 0.35 * Math.sin(t * 1.4 + s.twinklePhase);
        const a = s.alpha * twinkle;

        if (s.glyph) {
          ctx.fillStyle = i % 10 === 0 ? `rgba(56, 189, 248, ${a})` : `rgba(226, 232, 240, ${a * 0.85})`;
          ctx.fillText(s.glyph, s.x, py);
        } else if (streak > 1.2 && s.speed > 0.1) {
          // Scroll-velocity warp streak
          ctx.strokeStyle = `rgba(186, 230, 253, ${Math.min(0.65, a + 0.12)})`;
          ctx.lineWidth = s.size;
          ctx.beginPath();
          ctx.moveTo(s.x, py - streak * s.speed * 2.4);
          ctx.lineTo(s.x, py + streak * s.speed * 2.4);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(241, 245, 249, ${a})`;
          ctx.fillRect(s.x, py, s.size, s.size);
        }
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    seedStars();
    renderFrame(performance.now());

    const onResize = () => {
      seedStars();
      if (prefersReduced) renderFrame(performance.now());
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Primary Orbital Coordinate Ring — scrubs rotation & altitude with scroll */}
      <motion.div
        style={{
          y: prefersReduced ? 0 : outerRingY,
          rotate: prefersReduced ? 0 : outerRingRotate,
        }}
        className="absolute -top-[26rem] left-1/2 h-[64rem] w-[64rem] -translate-x-1/2 opacity-45"
      >
        <svg viewBox="0 0 800 800" className="h-full w-full fill-none">
          <circle cx="400" cy="400" r="380" stroke="rgba(56, 189, 248, 0.09)" strokeWidth="1" />
          <circle
            cx="400"
            cy="400"
            r="332"
            stroke="rgba(148, 163, 184, 0.09)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
          <circle cx="400" cy="400" r="265" stroke="rgba(56, 189, 248, 0.06)" strokeWidth="1" />
          {/* Cardinal orbital ticks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="400"
              y1="14"
              x2="400"
              y2="30"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.2"
              transform={`rotate(${deg} 400 400)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Counter-rotating Deep-Space Declination Arc */}
      <motion.div
        style={{
          y: prefersReduced ? 0 : secondaryOrbY,
          rotate: prefersReduced ? 0 : innerRingRotate,
        }}
        className="absolute -right-[22rem] top-[34vh] h-[48rem] w-[48rem] opacity-35"
      >
        <svg viewBox="0 0 600 600" className="h-full w-full fill-none">
          <circle
            cx="300"
            cy="300"
            r="280"
            stroke="rgba(56, 189, 248, 0.08)"
            strokeWidth="1"
            strokeDasharray="14 8 2 8"
          />
          <circle cx="300" cy="300" r="210" stroke="rgba(148, 163, 184, 0.06)" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};

export default SpaceBackdrop;
