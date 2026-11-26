import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { MISSION_STAGES } from '../data/missionData';
import { useScroll as useLenisScroll } from '../context/ScrollContext';

interface RocketScrollTrackProps {
  activeStageId: string;
}

const SPARK_CHARS = ['*', '+', ':', '·', '^'];

const RocketScrollTrack: React.FC<RocketScrollTrackProps> = ({ activeStageId }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const prefersReduced = useReducedMotion();
  const { lenis } = useLenisScroll() as { lenis: { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void } | null };

  const { scrollY, scrollYProgress } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.25,
  });
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 160,
    damping: 22,
    mass: 0.25,
  });

  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [percentReadout, setPercentReadout] = useState('000');
  const [sparkTick, setSparkTick] = useState(0);
  const [thrustLevel, setThrustLevel] = useState(0);

  // Rocket position along vertical rail (0% -> 100%)
  const rocketTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  // Mobile horizontal rocket progress (0% -> 100%)
  const rocketLeft = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Exhaust flame scale driven by scroll velocity magnitude
  const flameScaleY = useTransform(smoothVelocity, (v) => {
    if (prefersReduced) return 0.5;
    const boost = Math.min(2.3, Math.abs(v) / 650);
    return 0.45 + boost;
  });

  const flameOpacity = useTransform(smoothVelocity, (v) => {
    if (prefersReduced) return 0.55;
    const active = Math.min(1, 0.45 + Math.abs(v) / 700);
    return active;
  });

  useEffect(() => {
    const unsubProgress = scrollYProgress.on('change', (p) => {
      const pct = Math.round(Math.max(0, Math.min(1, p)) * 100);
      setPercentReadout(String(pct).padStart(3, '0'));
    });

    const unsubVel = smoothVelocity.on('change', (v) => {
      if (v > 18) setDirection('down');
      else if (v < -18) setDirection('up');
      const level = Math.min(1, Math.abs(v) / 900);
      setThrustLevel(level);
      if (Math.abs(v) > 35) {
        setSparkTick((t) => (t + 1) % 1000);
      }
    });

    return () => {
      unsubProgress();
      unsubVel();
    };
  }, [scrollYProgress, smoothVelocity]);

  const scrollToRatio = (ratio: number, immediate = false) => {
    const clamped = Math.max(0, Math.min(1, ratio));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = clamped * maxScroll;
    if (lenis) {
      lenis.scrollTo(targetY, immediate ? { immediate: true } : { duration: 1.05 });
    } else {
      window.scrollTo({ top: targetY, behavior: immediate ? 'auto' : 'smooth' });
    }
  };

  const jumpToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -76, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const rail = trackRef.current;
    if (!rail) return;
    isDraggingRef.current = true;
    rail.setPointerCapture(e.pointerId);
    const rect = rail.getBoundingClientRect();
    scrollToRatio((e.clientY - rect.top) / rect.height, false);
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    scrollToRatio((e.clientY - rect.top) / rect.height, true);
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const activeStage = MISSION_STAGES.find((s) => s.id === activeStageId) || MISSION_STAGES[0];
  const sparkA = SPARK_CHARS[sparkTick % SPARK_CHARS.length];
  const sparkB = SPARK_CHARS[(sparkTick + 2) % SPARK_CHARS.length];

  return (
    <>
      {/* Desktop Vertical Rocket Mission Rail (Replaces plain browser scrollbar) */}
      <aside
        aria-label="Mission stage rocket scroll control"
        className="fixed right-2.5 top-24 bottom-8 z-40 hidden w-16 select-none flex-col items-end justify-between lg:right-5 md:flex"
      >
        {/* Top Telemetry Altitude Readout */}
        <div className="mb-2 rounded border border-sky-400/25 bg-[#07090f]/90 px-2 py-1 text-right font-telemetry text-[10px] leading-tight tracking-wider backdrop-blur-md">
          <div className="text-sky-400">TRJ {percentReadout}%</div>
          <div className="text-[9px] text-slate-400">{direction === 'down' ? 'DSC ▾' : 'ASC ▴'}</div>
        </div>

        {/* Interactive Scrubbable Trajectory Track */}
        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handleTrackPointerUp}
          onPointerCancel={handleTrackPointerUp}
          title="Click or drag along orbital track to scrub mission altitude"
          className="relative my-1 flex-1 w-10 cursor-pointer flex justify-center"
        >
          {/* Base rail line */}
          <div className="relative h-full w-[2px] rounded-full bg-slate-700/55">
            {/* Illuminated traversed trajectory trail */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="h-full w-full rounded-full bg-gradient-to-b from-sky-400 via-cyan-300 to-amber-300 shadow-[0_0_10px_rgba(56,189,248,0.55)]"
            />
          </div>

          {/* Stage Waypoint Nodes */}
          {MISSION_STAGES.map((stage, idx) => {
            const pct = (idx / (MISSION_STAGES.length - 1)) * 100;
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => jumpToStage(stage.id)}
                style={{ top: `${pct}%` }}
                aria-label={`Jump to ${stage.fullLabel}`}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1.5"
              >
                <span
                  className={`block h-2 w-2 rounded-full border transition-all duration-150 ${
                    isActive
                      ? 'scale-125 border-sky-300 bg-sky-400 shadow-[0_0_10px_#38bdf8]'
                      : 'border-slate-500 bg-[#07090f] group-hover:border-sky-400 group-hover:bg-sky-400/50'
                  }`}
                />
                {/* Hover / Active HUD Stage Callout */}
                <span
                  className={`pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border px-2 py-0.5 font-telemetry text-[10px] tracking-[0.12em] transition-all duration-150 ${
                    isActive
                      ? 'border-sky-400/40 bg-[#0b0e17]/95 text-sky-300 opacity-100'
                      : 'border-slate-700/80 bg-[#07090f]/95 text-slate-300 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {stage.code} // {stage.shortLabel}
                </span>
              </button>
            );
          })}

          {/* Live Scroll-Linked Rocket Craft + Velocity Exhaust Plume */}
          <motion.div
            style={{ top: rocketTop }}
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: prefersReduced ? 180 : direction === 'down' ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative flex flex-col items-center"
            >
              {/* Sleek Mission-Control Vector Rocket */}
              <svg
                width="22"
                height="28"
                viewBox="0 0 24 30"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.65)]"
              >
                {/* Nose cone & fuselage */}
                <path
                  d="M12 2C12 2 6.5 8.2 6.5 16.5V21.5L3.5 24.5V26.5L7.8 24.8H16.2L20.5 26.5V24.5L17.5 21.5V16.5C17.5 8.2 12 2 12 2Z"
                  fill="#0f172a"
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Telemetry viewport window */}
                <circle cx="12" cy="12.5" r="2.3" fill="#38bdf8" />
                {/* Engine nozzle */}
                <rect x="9.5" y="24.8" width="5" height="2.2" rx="0.8" fill="#94a3b8" />
              </svg>

              {/* Dynamic Velocity-Linked Thruster Exhaust & ASCII Sparks */}
              <motion.div
                style={{
                  scaleY: flameScaleY,
                  opacity: flameOpacity,
                  transformOrigin: 'top center',
                }}
                className="-mt-0.5 flex flex-col items-center"
              >
                <div className="h-4 w-2 rounded-b-full bg-gradient-to-b from-amber-300 via-sky-400 to-transparent blur-[0.5px]" />
                {!prefersReduced && thrustLevel > 0.06 && (
                  <div className="-mt-1 flex flex-col items-center font-telemetry text-[9px] leading-[7px] text-amber-300">
                    <span>{sparkA}</span>
                    <span className="text-sky-300">{sparkB}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Active Stage Tag */}
        <button
          type="button"
          onClick={() => scrollToRatio(percentReadout === '100' ? 0 : 1)}
          className="mt-2 cursor-pointer rounded border border-slate-700/70 bg-[#07090f]/90 px-2 py-1 font-telemetry text-[10px] tracking-wider text-slate-300 transition-colors hover:border-sky-400/50 hover:text-sky-300"
        >
          STG {activeStage.code}
        </button>
      </aside>

      {/* Mobile Compact Rocket Progress Rail below Navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[57px] right-0 left-0 z-30 h-5 overflow-visible px-3 md:hidden"
      >
        <div className="relative h-[2px] w-full bg-slate-800/80">
          <motion.div
            style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
            className="h-full w-full bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300"
          />
          <motion.div
            style={{ left: rocketLeft }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="inline-flex items-center gap-0.5 rounded-full border border-sky-400/40 bg-[#07090f] px-1.5 py-0.5 font-telemetry text-[9px] text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.4)]">
              {thrustLevel > 0.08 ? (direction === 'down' ? '✶▸' : '◂✶') : '▸'} {percentReadout}%
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RocketScrollTrack;
