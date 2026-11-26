import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import SpaceBackdrop from '../components/SpaceBackdrop';
import SpaceAsciiHero from '../components/SpaceAsciiHero';
import RocketScrollTrack from '../components/RocketScrollTrack';
import { ScrollMissionBlock, StageHeaderHud } from '../components/ScrollMissionBlock';
import { useActiveStage } from '../hooks/useActiveStage';
import { useScroll as useLenisScroll } from '../context/ScrollContext';
import {
  CAPABILITY_BAYS,
  FLIGHT_LOG,
  HONOR_RECORDS,
  PAYLOAD_SYSTEMS,
  PayloadSystem,
} from '../data/missionData';

interface ParallaxPayloadDeckProps {
  payload: PayloadSystem;
  index: number;
  onInspect: (payload: PayloadSystem) => void;
}

const ParallaxPayloadDeck: React.FC<ParallaxPayloadDeckProps> = ({ payload, index, onInspect }) => {
  const deckRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.01, 1.06]);
  const cardY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [44, 0, 0, -30]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.25, 1, 1, 0.4]);

  return (
    <motion.article
      ref={deckRef}
      style={prefersReduced ? undefined : { y: cardY, opacity: cardOpacity }}
      className="telemetry-panel rounded-sm p-4 sm:p-6 lg:p-8"
    >
      {/* Top Payload Telemetry Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-400/12 pb-3 font-telemetry text-[11px] tracking-[0.13em] uppercase">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-sm bg-sky-400/15 px-2 py-0.5 font-semibold text-sky-300">
            {payload.code}
          </span>
          <span className="text-slate-300">{payload.orbitTag}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden sm:inline">{payload.coordinates}</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            {payload.status}
          </span>
        </div>
      </div>

      {/* Asymmetric Split Deck */}
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-9">
        {/* Viewport Preview Column */}
        <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div
            onClick={() => onInspect(payload)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onInspect(payload);
              }
            }}
            aria-label={`Inspect ${payload.title} mission telemetry`}
            className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-sm border border-slate-700/75 bg-[#07090f]"
          >
            <motion.img
              src={payload.image}
              alt={`${payload.title} interface preview`}
              loading="lazy"
              style={prefersReduced ? undefined : { y: imgY, scale: imgScale }}
              className="h-[116%] w-full object-cover object-top transition-filter duration-300 group-hover:brightness-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090f]/80 via-transparent to-[#07090f]/25" />

            {/* HUD Corner Reticle Overlay */}
            <div className="pointer-events-none absolute top-3 left-3 rounded-sm border border-sky-400/35 bg-[#07090f]/85 px-2.5 py-1 font-telemetry text-[10px] tracking-[0.14em] text-sky-300 uppercase backdrop-blur-sm">
              {payload.liveDomain}
            </div>
            <div className="pointer-events-none absolute right-3 bottom-3 rounded-sm border border-slate-500/40 bg-[#07090f]/90 px-2.5 py-1 font-telemetry text-[10px] tracking-[0.14em] text-slate-200 uppercase transition-colors group-hover:border-sky-400 group-hover:text-sky-300">
              INSPECT BRIEFING ↗
            </div>
          </div>
        </div>

        {/* Mission Readout & Editorial Briefing Column */}
        <div className={`flex flex-col justify-between lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div>
            <p className="mb-1.5 font-telemetry text-[11px] tracking-[0.14em] text-amber-300/90 uppercase">
              ★ {payload.highlight}
            </p>
            <h3 className="mb-2 font-editorial text-4xl leading-none tracking-tight text-slate-100 sm:text-5xl">
              {payload.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              {payload.valueProp}
            </p>

            {/* 2x2 Compact Telemetry Readouts */}
            <div className="mb-5 grid grid-cols-2 gap-2">
              {payload.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-sm border border-slate-800/90 bg-[#07090f]/75 px-3 py-2"
                >
                  <div className="font-telemetry text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                    {m.label}
                  </div>
                  <div className="mt-0.5 font-telemetry text-xs font-medium text-slate-200">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {payload.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-sky-400/20 bg-sky-950/25 px-2 py-0.5 font-telemetry text-[10px] tracking-[0.08em] text-sky-200 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-800/90 pt-4">
            {payload.liveLink !== '#' && (
              <a
                href={payload.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm bg-sky-400 px-3.5 py-2 font-telemetry text-[11px] font-semibold tracking-[0.12em] text-[#07090f] uppercase transition-colors hover:bg-sky-300"
              >
                LAUNCH LIVE ↗
              </a>
            )}
            <button
              type="button"
              onClick={() => onInspect(payload)}
              className="cursor-pointer rounded-sm border border-slate-600/80 bg-[#0b0e17] px-3.5 py-2 font-telemetry text-[11px] tracking-[0.12em] text-slate-200 uppercase transition-colors hover:border-sky-400 hover:text-sky-300"
            >
              TELEMETRY LOG
            </button>
            {payload.githubLink !== '#' && (
              <a
                href={payload.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 font-telemetry text-[11px] tracking-[0.1em] text-slate-400 uppercase transition-colors hover:text-sky-300"
              >
                SOURCE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Home: React.FC = () => {
  const activeStageId = useActiveStage();
  const prefersReduced = useReducedMotion();
  const { lenis } = useLenisScroll() as {
    lenis: {
      scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
      stop?: () => void;
      start?: () => void;
    } | null;
  };

  const flightSectionRef = useRef<HTMLDivElement | null>(null);
  const portraitWrapRef = useRef<HTMLDivElement | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 140, damping: 24 });

  // Hero telemetry radar rotation & live readouts
  const radarRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Flight log vertical laser beam progress
  const { scrollYProgress: flightProgress } = useScroll({
    target: flightSectionRef,
    offset: ['start 75%', 'end 65%'],
  });
  const flightBeamScale = useSpring(flightProgress, { stiffness: 160, damping: 28 });

  // Portrait orbital ring scrub
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitWrapRef,
    offset: ['start end', 'end start'],
  });
  const portraitRingRotate = useTransform(portraitProgress, [0, 1], [-40, 95]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [velDisplay, setVelDisplay] = useState('0.00');
  const [progDisplay, setProgDisplay] = useState('000%');
  const [selectedPayload, setSelectedPayload] = useState<PayloadSystem | null>(null);
  const [lightboxHonor, setLightboxHonor] = useState<{ title: string; badge: string; image: string } | null>(null);

  // Comms transmission form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');

  useEffect(() => {
    const unsubVel = smoothVelocity.on('change', (v) => {
      setVelDisplay((Math.abs(v) / 250).toFixed(2));
    });
    const unsubProg = scrollYProgress.on('change', (p) => {
      setProgDisplay(`${String(Math.round(Math.max(0, Math.min(1, p)) * 100)).padStart(3, '0')}%`);
    });
    return () => {
      unsubVel();
      unsubProg();
    };
  }, [smoothVelocity, scrollYProgress]);

  // Modal scroll lock + Escape handler
  useEffect(() => {
    const isOpen = Boolean(selectedPayload || lightboxHonor);
    if (isOpen) {
      lenis?.stop?.();
    } else {
      lenis?.start?.();
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPayload(null);
        setLightboxHonor(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPayload, lightboxHonor, lenis]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('andreidilag12@gmail.com');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = 'mailto:andreidilag12@gmail.com';
    }
  };

  const jumpToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -74, duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };
    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      setFormFeedback('All telemetry fields are required before transmission.');
      return;
    }

    setFormStatus('sending');
    setFormFeedback('');

    const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
    const formEndpoint = (env.VITE_FORM_ENDPOINT || env.NEXT_PUBLIC_FORM_ENDPOINT || '').trim();
    const apiBase = (env.VITE_API_URL || '').replace(/\/$/, '');

    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(trimmed),
        });
        if (res.ok) {
          setFormStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      } catch {
        // continue fallback
      }
    }

    if (apiBase) {
      try {
        const res = await axios.post(`${apiBase}/api/inquiries`, trimmed, { timeout: 7000 });
        if (res.status >= 200 && res.status < 300) {
          setFormStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      } catch {
        // continue fallback
      }
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/andreidilag12@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: trimmed.name,
          email: trimmed.email,
          _subject: `[MISSION UPLINK] ${trimmed.subject} — from ${trimmed.name}`,
          message: trimmed.message,
        }),
      });
      const data = await res.json();
      if (res.ok && (data.success === true || data.success === 'true' || data.message)) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }
    } catch {
      // fallback below
    }

    setFormStatus('error');
    setFormFeedback('Direct relay blocked by network—use the Direct Mail Launch link below.');
  };

  const featuredPayloads = PAYLOAD_SYSTEMS.filter((p) => p.featured);
  const dockedPayloads = PAYLOAD_SYSTEMS.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Multi-Speed Starfield + Scroll-Scrubbed Orbital Coordinate Rings */}
      <SpaceBackdrop />

      {/* Interactive Velocity-Linked Rocket Scroll Track */}
      <RocketScrollTrack activeStageId={activeStageId} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-22 pb-20 sm:px-6 md:pt-24 lg:px-8 lg:pr-24">
        {/* ================================================================
            STAGE 01 // HELLO — COMMAND DECK & SCROLL-REACTIVE ASCII HERO
           ================================================================ */}
        <section id="stage-01" className="pb-24 sm:pb-32">
          {/* Mission Index Ribbon */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-telemetry text-[11px] tracking-[0.14em] uppercase">
            <span className="inline-flex items-center gap-2 rounded-sm border border-sky-400/35 bg-sky-950/35 px-3 py-1 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              STAGE 01 // HELLO
            </span>
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span>ROLE: IT FACULTY &amp; FULL-STACK ENGINEER</span>
              <span className="hidden text-emerald-400 sm:inline">● TELEMETRY NOMINAL</span>
            </div>
          </div>

          {/* Live Scroll & Cursor Reactive ASCII Pixel-Matrix Hero */}
          <SpaceAsciiHero />

          {/* Asymmetric Command Briefing + Live Telemetry Console */}
          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left 7 Cols: Editorial Headline + Bio + Mission Actions */}
            <ScrollMissionBlock
              parallaxOffset={24}
              enableVelocityTilt={false}
              alwaysBright
              className="telemetry-panel flex flex-col justify-between rounded-sm p-6 sm:p-8 lg:col-span-7"
            >
              <div>
                <p className="mb-3 font-telemetry text-[11px] tracking-[0.15em] text-sky-400 uppercase">
                  COMMAND BRIEFING // QUEZON CITY, PHILIPPINES (UTC+8)
                </p>
                <h2 className="mb-5 font-editorial text-[clamp(2.35rem,4.7vw,4.1rem)] leading-[1.03] tracking-[-0.02em] text-slate-100">
                  Engineering mission-critical systems with{' '}
                  <em className="text-sky-300 italic">orbital precision.</em>
                </h2>
                <p className="text-base leading-relaxed text-slate-300 sm:text-[17px]">
                  I’m <strong className="font-semibold text-white">Andrei Dilag</strong>—an{' '}
                  <strong className="font-medium text-slate-100">
                    IT Faculty Teacher for Advanced Database &amp; Network Technology 2 at STI College Fairview
                  </strong>{' '}
                  (Aug 2025 – Present) and a{' '}
                  <strong className="font-medium text-slate-100">Full-Stack Engineer</strong> building
                  scalable SaaS platforms, OpenCV computer-vision tools, and enterprise systems.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-800/90 pt-5">
                <button
                  type="button"
                  onClick={() => jumpToStage('stage-02')}
                  className="cursor-pointer rounded-sm bg-sky-400 px-4 py-2.5 font-telemetry text-xs font-semibold tracking-[0.12em] text-[#07090f] uppercase transition-colors hover:bg-sky-300"
                >
                  EXPLORE PAYLOADS ↘
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="cursor-pointer rounded-sm border border-sky-400/40 bg-sky-950/30 px-4 py-2.5 font-telemetry text-xs tracking-[0.12em] text-sky-200 uppercase transition-colors hover:border-sky-300 hover:bg-sky-400/15"
                >
                  {copiedEmail ? 'EMAIL COPIED ✓' : 'COPY EMAIL'}
                </button>
                <button
                  type="button"
                  onClick={() => jumpToStage('stage-06')}
                  className="cursor-pointer rounded-sm border border-slate-700 bg-[#0b0e17] px-4 py-2.5 font-telemetry text-xs tracking-[0.12em] text-slate-200 uppercase transition-colors hover:border-sky-400/50 hover:text-sky-300"
                >
                  OPEN COMMS
                </button>
                <a
                  href="/andrei_dilag_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 font-telemetry text-xs tracking-[0.12em] text-slate-400 uppercase transition-colors hover:text-sky-300"
                >
                  RESUME PDF ↗
                </a>
              </div>
            </ScrollMissionBlock>

            {/* Right 5 Cols: Angled Live Orbital Telemetry Readout Deck */}
            <ScrollMissionBlock
              parallaxOffset={34}
              alwaysBright
              className="telemetry-panel clip-chamfer flex flex-col justify-between p-6 sm:p-7 lg:col-span-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="font-telemetry text-[10px] tracking-[0.15em] text-slate-400 uppercase">
                    REAL-TIME FLIGHT TELEMETRY
                  </div>
                  <div className="mt-1 font-telemetry text-xs text-emerald-400">
                    ● ALL SUBSYSTEMS ONLINE
                  </div>
                </div>

                {/* Scroll-Rotating Mini Radar */}
                <motion.div
                  style={{ rotate: prefersReduced ? 0 : radarRotate }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-400/35 bg-[#07090f]"
                >
                  <svg viewBox="0 0 40 40" className="h-9 w-9 fill-none">
                    <circle cx="20" cy="20" r="16" stroke="rgba(56,189,248,0.28)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="20" cy="20" r="8" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                    <line x1="20" y1="20" x2="20" y2="4" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="2" fill="#38bdf8" />
                  </svg>
                </motion.div>
              </div>

              <div className="my-5 grid grid-cols-2 gap-3">
                <div className="rounded-sm border border-slate-800/90 bg-[#07090f]/80 p-3">
                  <div className="font-telemetry text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                    SCROLL VELOCITY
                  </div>
                  <div className="mt-1 font-telemetry text-lg font-semibold text-sky-300">
                    {velDisplay} <span className="text-[10px] text-slate-400">km/s</span>
                  </div>
                </div>
                <div className="rounded-sm border border-slate-800/90 bg-[#07090f]/80 p-3">
                  <div className="font-telemetry text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                    TRAJECTORY DEPTH
                  </div>
                  <div className="mt-1 font-telemetry text-lg font-semibold text-amber-300">
                    {progDisplay}
                  </div>
                </div>
                <div className="rounded-sm border border-slate-800/90 bg-[#07090f]/80 p-3">
                  <div className="font-telemetry text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                    CURRENT STATION
                  </div>
                  <div className="mt-1 font-telemetry text-xs font-medium text-slate-200">
                    STI College Fairview
                  </div>
                </div>
                <div className="rounded-sm border border-slate-800/90 bg-[#07090f]/80 p-3">
                  <div className="font-telemetry text-[9px] tracking-[0.14em] text-slate-500 uppercase">
                    DEPLOYED PAYLOADS
                  </div>
                  <div className="mt-1 font-telemetry text-xs font-medium text-slate-200">
                    05 Production Systems
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3 font-telemetry text-[10px] tracking-[0.12em] text-slate-400 uppercase">
                <span>UPLINK: andreidilag12@gmail.com</span>
                <span className="text-sky-400">ROCKET TRACK ▸</span>
              </div>
            </ScrollMissionBlock>
          </div>
        </section>

        {/* ================================================================
            STAGE 02 // PAYLOADS — ASYMMETRIC DEPLOYED SYSTEMS DECKS
           ================================================================ */}
        <section id="stage-02" className="py-20 sm:py-28">
          <StageHeaderHud
            stageLabel="STAGE 02 // PAYLOADS"
            altitude="1,240 KM MEO"
            headlineRegular="Production payloads"
            headlineItalic="in active orbit."
            summary="Full-stack platforms spanning AI proctoring & OpenCV grading, multi-tenant business SaaS, edge streaming, and enterprise logistics."
          />

          {/* Featured Alternating Split Decks */}
          <div className="space-y-8 sm:space-y-12">
            {featuredPayloads.map((payload, idx) => (
              <ParallaxPayloadDeck
                key={payload.id}
                payload={payload}
                index={idx}
                onInspect={setSelectedPayload}
              />
            ))}
          </div>

          {/* Docked Enterprise Modules (Asymmetric Dual Bay) */}
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between font-telemetry text-[11px] tracking-[0.14em] text-slate-400 uppercase">
              <span>DOCKED ENTERPRISE MODULES // LOGISTICS &amp; PAYROLL</span>
              <span>02 ADDITIONAL SYSTEMS</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              {dockedPayloads.map((payload, idx) => (
                <ScrollMissionBlock
                  key={payload.id}
                  parallaxOffset={idx === 0 ? 30 : 48}
                  className={`telemetry-panel flex flex-col justify-between rounded-sm p-5 sm:p-6 ${
                    idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  }`}
                >
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-telemetry text-[10px] tracking-[0.13em] uppercase">
                      <span className="text-sky-300">
                        {payload.code} // {payload.category}
                      </span>
                      <span className="text-slate-400">{payload.status}</span>
                    </div>

                    <div className="mb-4 grid gap-4 sm:grid-cols-12 sm:items-center">
                      <div
                        onClick={() => setSelectedPayload(payload)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedPayload(payload);
                          }
                        }}
                        className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-sm border border-slate-800 sm:col-span-5"
                      >
                        <img
                          src={payload.image}
                          alt={payload.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="sm:col-span-7">
                        <p className="font-telemetry text-[10px] tracking-[0.12em] text-amber-300 uppercase">
                          ★ {payload.highlight}
                        </p>
                        <h3 className="mt-1 font-editorial text-3xl text-slate-100">
                          {payload.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                          {payload.valueProp}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {payload.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-sm border border-slate-700/80 bg-[#07090f]/80 px-2 py-0.5 font-telemetry text-[10px] text-slate-300 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/90 pt-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedPayload(payload)}
                      className="cursor-pointer font-telemetry text-[11px] tracking-[0.12em] text-sky-300 uppercase transition-colors hover:text-sky-200"
                    >
                      INSPECT TELEMETRY →
                    </button>
                    {payload.liveLink !== '#' ? (
                      <a
                        href={payload.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-telemetry text-[11px] tracking-[0.12em] text-slate-300 uppercase transition-colors hover:text-sky-300"
                      >
                        {payload.liveDomain} ↗
                      </a>
                    ) : (
                      <span className="font-telemetry text-[10px] tracking-[0.12em] text-slate-500 uppercase">
                        INTERNAL DEPLOYMENT
                      </span>
                    )}
                  </div>
                </ScrollMissionBlock>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            STAGE 03 // FLIGHT LOG — COMMANDER DOSSIER & TRAJECTORY TIMELINE
           ================================================================ */}
        <section id="stage-03" ref={flightSectionRef} className="py-20 sm:py-28">
          <StageHeaderHud
            stageLabel="STAGE 03 // FLIGHT LOG"
            altitude="8,600 KM"
            headlineRegular="Academic leadership &"
            headlineItalic="engineering trajectory."
            summary="Bridging collegiate instruction in Advanced Databases & Network Technology 2 with hands-on commercial software delivery."
          />

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left 4 Cols: Sticky Commander Dossier & Orbital Portrait */}
            <div ref={portraitWrapRef} className="lg:sticky lg:top-24 lg:col-span-4">
              <ScrollMissionBlock parallaxOffset={22} className="telemetry-panel rounded-sm p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                  <span>COMMANDER DOSSIER</span>
                  <span className="text-sky-400">ID // AD-2026</span>
                </div>

                {/* Portrait with Scroll-Rotating Orbital Reticle */}
                <div className="relative mx-auto mb-5 aspect-[4/4.4] overflow-hidden rounded-sm border border-slate-700/80 bg-[#07090f]">
                  <img
                    src="/grad_pic.png"
                    alt="Andrei Dilag"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent opacity-80" />

                  <motion.svg
                    viewBox="0 0 200 200"
                    style={{ rotate: prefersReduced ? 0 : portraitRingRotate }}
                    className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 fill-none opacity-55"
                  >
                    <circle cx="100" cy="100" r="88" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5 7" />
                    <circle cx="100" cy="100" r="64" stroke="#94a3b8" strokeWidth="0.8" />
                  </motion.svg>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="font-editorial text-2xl text-white">Andrei Dilag</div>
                      <div className="font-telemetry text-[10px] tracking-[0.12em] text-sky-300 uppercase">
                        BSIT · STI COLLEGE FAIRVIEW
                      </div>
                    </div>
                  </div>
                </div>

                <dl className="space-y-2.5 border-t border-slate-800 pt-4 font-telemetry text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">BASE</dt>
                    <dd className="text-right text-slate-200">Quezon City, PH (UTC+8)</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">COURSES TAUGHT</dt>
                    <dd className="text-right text-slate-200">Adv. Database &amp; Net Tech 2</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">CREDENTIAL</dt>
                    <dd className="text-right text-amber-300">SAP S/4HANA Certified</dd>
                  </div>
                </dl>
              </ScrollMissionBlock>
            </div>

            {/* Right 8 Cols: Scroll-Illuminated Trajectory Timeline */}
            <div className="relative pl-6 sm:pl-9 lg:col-span-8">
              {/* Vertical Rail + Scroll-Scrubbed Laser Beam */}
              <div className="absolute top-2 bottom-2 left-1.5 w-[2px] bg-slate-800 sm:left-2.5">
                <motion.div
                  style={{ scaleY: prefersReduced ? 1 : flightBeamScale, transformOrigin: 'top' }}
                  className="h-full w-full bg-gradient-to-b from-sky-400 via-cyan-300 to-emerald-400 shadow-[0_0_12px_#38bdf8]"
                />
              </div>

              <div className="space-y-7">
                {FLIGHT_LOG.map((entry, idx) => (
                  <ScrollMissionBlock
                    key={entry.id}
                    parallaxOffset={28 + idx * 8}
                    className="telemetry-panel relative rounded-sm p-5 sm:p-7"
                  >
                    {/* Orbital Waypoint Node on Rail */}
                    <span
                      className={`absolute top-7 -left-[23px] h-3.5 w-3.5 rounded-full border-2 sm:-left-[31px] ${
                        entry.status === 'ACTIVE ORBIT'
                          ? 'border-emerald-300 bg-emerald-400 shadow-[0_0_12px_#34d399]'
                          : 'border-sky-400 bg-[#07090f]'
                      }`}
                    />

                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-telemetry text-[11px] tracking-[0.13em] uppercase">
                      <span className="text-sky-300">{entry.missionCode}</span>
                      <span
                        className={`rounded-sm px-2 py-0.5 text-[10px] ${
                          entry.status === 'ACTIVE ORBIT'
                            ? 'border border-emerald-400/40 bg-emerald-400/12 text-emerald-300'
                            : 'border border-slate-700 bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        {entry.period} · {entry.status}
                      </span>
                    </div>

                    <h3 className="font-editorial text-3xl text-slate-100 sm:text-4xl">
                      {entry.role}{' '}
                      <span className="text-sky-300/90 italic">@ {entry.organization}</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                      {entry.summary}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-slate-800/90 pt-4 text-sm text-slate-300">
                      {entry.telemetryBullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span className="mt-1 font-telemetry text-[10px] text-sky-400">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-slate-700/80 bg-[#07090f]/80 px-2 py-0.5 font-telemetry text-[10px] text-slate-300 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </ScrollMissionBlock>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            STAGE 04 // HONORS — COMMENDATIONS & CREDENTIALS TELEMETRY
           ================================================================ */}
        <section id="stage-04" className="py-20 sm:py-28">
          <StageHeaderHud
            stageLabel="STAGE 04 // HONORS"
            altitude="20,200 KM"
            headlineRegular="Competitive honors &"
            headlineItalic="enterprise credentials."
            summary="Championship placements in regional and national 32-hour software buildathons alongside SAP S/4HANA enterprise certification."
          />

          <div className="space-y-4">
            {HONOR_RECORDS.map((honor, idx) => (
              <ScrollMissionBlock
                key={honor.id}
                parallaxOffset={22 + (idx % 3) * 10}
                className="telemetry-panel rounded-sm p-4 sm:p-6"
              >
                <div className="grid items-center gap-5 md:grid-cols-12">
                  {/* Telemetry Code + Badge */}
                  <div className="md:col-span-3">
                    <div className="font-telemetry text-[11px] tracking-[0.14em] text-sky-400 uppercase">
                      {honor.code} // {honor.issuer}
                    </div>
                    <div className="mt-1.5 inline-block rounded-sm border border-amber-400/35 bg-amber-400/10 px-2.5 py-0.5 font-telemetry text-[10px] tracking-[0.12em] text-amber-300 uppercase">
                      {honor.badge}
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="md:col-span-6">
                    <h3 className="font-editorial text-3xl text-slate-100">{honor.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{honor.summary}</p>
                  </div>

                  {/* Visual Proof Thumbnail / Credential Action */}
                  <div className="flex items-center justify-start gap-3 md:col-span-3 md:justify-end">
                    {honor.image ? (
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxHonor({
                            title: honor.title,
                            badge: honor.badge,
                            image: honor.image!,
                          })
                        }
                        className="group relative h-16 w-26 shrink-0 cursor-pointer overflow-hidden rounded-sm border border-slate-700 bg-[#07090f]"
                        aria-label={`View photo for ${honor.title}`}
                      >
                        <img
                          src={honor.image}
                          alt={honor.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-[#07090f]/55 font-telemetry text-[9px] tracking-wider text-sky-200 opacity-0 transition-opacity group-hover:opacity-100">
                          VIEW
                        </span>
                      </button>
                    ) : (
                      <div className="flex h-16 w-26 shrink-0 items-center justify-center rounded-sm border border-sky-400/30 bg-sky-950/25 font-telemetry text-[10px] tracking-widest text-sky-300">
                        SAP // ERP
                      </div>
                    )}

                    {honor.link && (
                      <a
                        href={honor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-telemetry text-[11px] tracking-[0.12em] text-slate-400 uppercase transition-colors hover:text-sky-300"
                      >
                        RECORD ↗
                      </a>
                    )}
                  </div>
                </div>
              </ScrollMissionBlock>
            ))}
          </div>
        </section>

        {/* ================================================================
            STAGE 05 // CAPABILITIES — 3-BAY ARCHITECTURE TELEMETRY MATRIX
           ================================================================ */}
        <section id="stage-05" className="py-20 sm:py-28">
          <StageHeaderHud
            stageLabel="STAGE 05 // CAPABILITIES"
            altitude="35,786 KM GEO"
            headlineRegular="Core engineering"
            headlineItalic="capability bays."
            summary="Full-lifecycle technical architecture across modern SaaS web engineering, computer vision & AI automation, and relational systems."
          />

          <div className="grid items-start gap-6 lg:grid-cols-3">
            {CAPABILITY_BAYS.map((bay, idx) => (
              <ScrollMissionBlock
                key={bay.id}
                parallaxOffset={26 + idx * 16}
                className={`telemetry-panel clip-chamfer flex h-full flex-col justify-between p-6 sm:p-7 ${
                  idx === 1 ? 'lg:mt-8' : idx === 2 ? 'lg:mt-16' : ''
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3 font-telemetry text-[10px] tracking-[0.14em] text-sky-400 uppercase">
                    <span>BAY {bay.code}</span>
                    <span className="text-slate-500">{bay.telemetrySpec}</span>
                  </div>

                  <h3 className="font-editorial text-4xl text-slate-100">{bay.title}</h3>
                  <p className="mt-1 font-telemetry text-[11px] tracking-[0.1em] text-amber-300/90 uppercase">
                    {bay.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{bay.description}</p>

                  <ul className="mt-5 space-y-2 border-t border-slate-800/90 pt-4 text-sm text-slate-300">
                    {bay.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2">
                        <span className="mt-1 font-telemetry text-[10px] text-sky-400">+</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-800/90 pt-4">
                  {bay.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-sky-400/20 bg-sky-950/25 px-2 py-0.5 font-telemetry text-[10px] text-sky-200 uppercase"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollMissionBlock>
            ))}
          </div>
        </section>

        {/* ================================================================
            STAGE 06 // COMMS — DEEP-SPACE UPLINK & TRANSMISSION CONSOLE
           ================================================================ */}
        <section id="stage-06" className="pt-20 pb-10 sm:pt-28">
          <StageHeaderHud
            stageLabel="STAGE 06 // COMMS"
            altitude="DEEP SPACE UPLINK"
            headlineRegular="Have a mission in mind?"
            headlineItalic="Open a channel."
            summary="Available for full-stack software engineering, AI/automation builds, technical consulting, and academic collaborations."
          />

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left 5 Cols: Direct Uplink Coordinates & Channels */}
            <ScrollMissionBlock
              parallaxOffset={24}
              className="telemetry-panel flex flex-col justify-between rounded-sm p-6 sm:p-8 lg:col-span-5"
            >
              <div>
                <div className="font-telemetry text-[11px] tracking-[0.14em] text-emerald-400 uppercase">
                  ● DIRECT TRANSPONDER READY
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Reach out directly via email or dispatch a packet through the transmission console.
                  Responses typically lock within 24 hours (UTC+8).
                </p>

                <div className="mt-6 rounded-sm border border-slate-800 bg-[#07090f]/90 p-4">
                  <div className="font-telemetry text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                    PRIMARY UPLINK ADDRESS
                  </div>
                  <a
                    href="mailto:andreidilag12@gmail.com"
                    className="mt-1.5 block break-all font-telemetry text-sm font-medium text-sky-300 transition-colors hover:text-sky-200 sm:text-base"
                  >
                    andreidilag12@gmail.com
                  </a>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="cursor-pointer rounded-sm bg-sky-400 px-3.5 py-1.5 font-telemetry text-[11px] font-semibold tracking-[0.12em] text-[#07090f] uppercase transition-colors hover:bg-sky-300"
                    >
                      {copiedEmail ? 'COPIED ✓' : 'COPY ADDRESS'}
                    </button>
                    <a
                      href="mailto:andreidilag12@gmail.com"
                      className="rounded-sm border border-slate-700 px-3.5 py-1.5 font-telemetry text-[11px] tracking-[0.12em] text-slate-200 uppercase transition-colors hover:border-sky-400 hover:text-sky-300"
                    >
                      MAIL APP ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-5">
                <div className="mb-3 font-telemetry text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                  EXTERNAL RELAY NODES
                </div>
                <div className="flex flex-wrap gap-4 font-telemetry text-xs tracking-[0.12em] uppercase">
                  <a
                    href="https://github.com/YtterStick"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 transition-colors hover:text-sky-300"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mark-andrei-dilag-6632322b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 transition-colors hover:text-sky-300"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href="/andrei_dilag_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 transition-colors hover:text-sky-300"
                  >
                    RESUME PDF ↗
                  </a>
                </div>
              </div>
            </ScrollMissionBlock>

            {/* Right 7 Cols: Transmission Form Console */}
            <ScrollMissionBlock
              parallaxOffset={34}
              className="telemetry-panel rounded-sm p-6 sm:p-8 lg:col-span-7"
            >
              <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-3 font-telemetry text-[11px] tracking-[0.14em] uppercase">
                <span className="text-sky-300">COMMS TRANSMISSION CONSOLE</span>
                <span className="text-slate-500">PROTOCOL // HTTPS-JSON</span>
              </div>

              <form onSubmit={handleTransmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="comms-name"
                      className="mb-1.5 block font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase"
                    >
                      CALLSIGN / NAME
                    </label>
                    <input
                      id="comms-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full rounded-sm border border-slate-700/85 bg-[#07090f]/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comms-email"
                      className="mb-1.5 block font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase"
                    >
                      RETURN FREQUENCY / EMAIL
                    </label>
                    <input
                      id="comms-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="jane@company.com"
                      className="w-full rounded-sm border border-slate-700/85 bg-[#07090f]/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comms-subject"
                    className="mb-1.5 block font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase"
                  >
                    MISSION OBJECTIVE / SUBJECT
                  </label>
                  <input
                    id="comms-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="SaaS Build, AI Integration, or Role Opportunity"
                    className="w-full rounded-sm border border-slate-700/85 bg-[#07090f]/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comms-message"
                    className="mb-1.5 block font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase"
                  >
                    TRANSMISSION PAYLOAD / MESSAGE
                  </label>
                  <textarea
                    id="comms-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Share scope, timeline, and goals..."
                    className="w-full resize-y rounded-sm border border-slate-700/85 bg-[#07090f]/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="cursor-pointer rounded-sm bg-sky-400 px-5 py-2.5 font-telemetry text-xs font-semibold tracking-[0.14em] text-[#07090f] uppercase transition-colors hover:bg-sky-300 disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT PACKET ↗'}
                  </button>

                  {formStatus === 'success' && (
                    <span className="font-telemetry text-xs text-emerald-400">
                      ✓ PACKET RECEIVED — CHANNEL LOCKED
                    </span>
                  )}
                  {formStatus === 'error' && (
                    <a
                      href={`mailto:andreidilag12@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="font-telemetry text-xs text-amber-300 underline"
                    >
                      DIRECT MAIL LAUNCH ↗
                    </a>
                  )}
                  {formFeedback && formStatus !== 'success' && (
                    <p className="w-full font-telemetry text-xs text-amber-300">{formFeedback}</p>
                  )}
                </div>
              </form>
            </ScrollMissionBlock>
          </div>
        </section>
      </div>

      {/* ================================================================
          PAYLOAD TELEMETRY CASE-STUDY MODAL
         ================================================================ */}
      {selectedPayload &&
        createPortal(
          <div
            onClick={() => setSelectedPayload(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060b]/85 p-4 backdrop-blur-md"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedPayload.title} telemetry case study`}
              onClick={(e) => e.stopPropagation()}
              className="telemetry-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3 font-telemetry text-xs tracking-[0.14em] uppercase">
                <span className="text-sky-300">
                  {selectedPayload.code} // {selectedPayload.orbitTag}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPayload(null)}
                  className="cursor-pointer rounded-sm border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-400 hover:text-sky-300"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <h3 className="font-editorial text-4xl text-white sm:text-5xl">
                {selectedPayload.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{selectedPayload.subtitle}</p>

              <div className="my-5 overflow-hidden rounded-sm border border-slate-800">
                <img
                  src={selectedPayload.image}
                  alt={selectedPayload.title}
                  className="max-h-72 w-full object-cover object-top"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-sm border border-slate-800 bg-[#07090f]/90 p-4">
                  <div className="font-telemetry text-[10px] tracking-[0.14em] text-amber-300 uppercase">
                    01 // ANOMALY
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {selectedPayload.caseStudy.problem}
                  </p>
                </div>
                <div className="rounded-sm border border-slate-800 bg-[#07090f]/90 p-4">
                  <div className="font-telemetry text-[10px] tracking-[0.14em] text-sky-300 uppercase">
                    02 // ARCHITECTURE
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {selectedPayload.caseStudy.solution}
                  </p>
                </div>
                <div className="rounded-sm border border-slate-800 bg-[#07090f]/90 p-4">
                  <div className="font-telemetry text-[10px] tracking-[0.14em] text-emerald-300 uppercase">
                    03 // OUTCOME
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {selectedPayload.caseStudy.impact}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 font-telemetry text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                  KEY SUBSYSTEM MODULES
                </div>
                <div className="space-y-2.5">
                  {selectedPayload.keyFeatures.map((kf) => (
                    <div
                      key={kf.title}
                      className="rounded-sm border border-slate-800/80 bg-[#07090f]/70 p-3.5"
                    >
                      <div className="font-telemetry text-xs font-medium text-slate-100">
                        {kf.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{kf.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4">
                {selectedPayload.liveLink !== '#' && (
                  <a
                    href={selectedPayload.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-sky-400 px-4 py-2 font-telemetry text-xs font-semibold tracking-[0.12em] text-[#07090f] uppercase hover:bg-sky-300"
                  >
                    OPEN DEPLOYMENT ↗
                  </a>
                )}
                {selectedPayload.githubLink !== '#' && (
                  <a
                    href={selectedPayload.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-slate-700 px-4 py-2 font-telemetry text-xs tracking-[0.12em] text-slate-200 uppercase hover:border-sky-400 hover:text-sky-300"
                  >
                    REPOSITORY ↗
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ================================================================
          HONOR RECORD PHOTO LIGHTBOX
         ================================================================ */}
      {lightboxHonor &&
        createPortal(
          <div
            onClick={() => setLightboxHonor(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060b]/90 p-4 backdrop-blur-md"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={lightboxHonor.title}
              onClick={(e) => e.stopPropagation()}
              className="telemetry-panel max-w-3xl overflow-hidden rounded-sm p-4 sm:p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-4 font-telemetry text-xs uppercase">
                <span className="text-amber-300">
                  {lightboxHonor.badge} // {lightboxHonor.title}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxHonor(null)}
                  className="cursor-pointer rounded-sm border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-400"
                >
                  CLOSE [ESC]
                </button>
              </div>
              <img
                src={lightboxHonor.image}
                alt={lightboxHonor.title}
                className="max-h-[75vh] w-full rounded-sm object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Home;
