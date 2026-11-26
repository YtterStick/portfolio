import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

interface ScrollMissionBlockProps {
  children: React.ReactNode;
  className?: string;
  parallaxOffset?: number;
  enableVelocityTilt?: boolean;
  alwaysBright?: boolean;
}

export const ScrollMissionBlock: React.FC<ScrollMissionBlockProps> = ({
  children,
  className = '',
  parallaxOffset = 38,
  enableVelocityTilt = true,
  alwaysBright = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 150, damping: 26, mass: 0.3 });

  const y = useTransform(
    scrollYProgress,
    [0, 0.38, 0.65, 1],
    [alwaysBright ? 0 : parallaxOffset, 0, 0, -parallaxOffset * 0.7]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.14, 0.86, 1],
    [alwaysBright ? 1 : 0.965, 1, 1, 0.975]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [alwaysBright ? 1 : 0.38, 1, 1, 0.45]
  );
  const skewY = useTransform(smoothVelocity, [-2200, 0, 2200], [-1.35, 0, 1.35]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        opacity,
        skewY: enableVelocityTilt ? skewY : 0,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface StageHeaderHudProps {
  stageLabel: string;
  altitude: string;
  headlineRegular: string;
  headlineItalic: string;
  summary?: string;
}

export const StageHeaderHud: React.FC<StageHeaderHudProps> = ({
  stageLabel,
  altitude,
  headlineRegular,
  headlineItalic,
  summary,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const tagX = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const titleY = useTransform(scrollYProgress, [0, 0.45, 1], [28, 0, -20]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.45], [0.15, 1]);

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <motion.div
          style={{ x: prefersReduced ? 0 : tagX }}
          className="inline-flex items-center gap-2.5 rounded-sm border border-sky-400/30 bg-sky-950/30 px-3 py-1 font-telemetry text-[11px] tracking-[0.14em] text-sky-300 uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span>{stageLabel}</span>
        </motion.div>
        <span className="font-telemetry text-[11px] tracking-[0.14em] text-slate-500 uppercase">
          ALT // {altitude}
        </span>
      </div>

      <motion.div
        style={{ scaleX: prefersReduced ? 1 : lineScale, transformOrigin: 'left' }}
        className="mb-6 h-[1px] w-full bg-gradient-to-r from-sky-400/50 via-slate-500/25 to-transparent"
      />

      <motion.div
        style={{ y: prefersReduced ? 0 : titleY }}
        className="grid gap-4 lg:grid-cols-12 lg:items-end"
      >
        <h2 className="font-editorial text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-slate-100 lg:col-span-8">
          {headlineRegular}{' '}
          <em className="text-sky-300 italic">{headlineItalic}</em>
        </h2>
        {summary && (
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base lg:col-span-4">
            {summary}
          </p>
        )}
      </motion.div>
    </div>
  );
};
