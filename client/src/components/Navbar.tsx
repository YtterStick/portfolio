import React, { useEffect, useState } from 'react';
import { MISSION_STAGES } from '../data/missionData';
import { useActiveStage } from '../hooks/useActiveStage';
import { useScroll as useLenisScroll } from '../context/ScrollContext';

const formatManilaClock = (): string => {
  try {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return `MNL ${f.format(new Date())}`;
  } catch {
    return 'MNL 00:00:00';
  }
};

const Navbar: React.FC = () => {
  const [clock, setClock] = useState<string>(formatManilaClock);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeStageId = useActiveStage();
  const { lenis } = useLenisScroll() as {
    lenis: { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void } | null;
  };

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatManilaClock()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const navigateToStage = (e: React.MouseEvent<HTMLAnchorElement>, stageId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(stageId);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -74, duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-400/12 bg-[#07090f]/82 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Callsign Brand */}
        <a
          href="#stage-01"
          onClick={scrollTop}
          className="flex items-center gap-2.5 font-telemetry text-xs font-medium tracking-[0.14em] text-slate-100 uppercase transition-colors hover:text-sky-300"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span>ANDREI DILAG</span>
          <span className="hidden text-[10px] text-slate-500 sm:inline">// MISSION.CTRL</span>
        </a>

        {/* Desktop Stage Telemetry Links */}
        <nav aria-label="Mission telemetry stages" className="hidden items-center gap-1 lg:flex">
          {MISSION_STAGES.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                onClick={(e) => navigateToStage(e, stage.id)}
                className={`rounded-sm px-2.5 py-1.5 font-telemetry text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 ${
                  isActive
                    ? 'border border-sky-400/40 bg-sky-400/12 text-sky-300'
                    : 'border border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-100'
                }`}
              >
                <span className="text-sky-400/80">{stage.code}</span> {stage.shortLabel}
              </a>
            );
          })}
        </nav>

        {/* Live Manila Telemetry Clock + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-sm border border-slate-700/70 bg-[#0b0e17]/90 px-2.5 py-1 font-telemetry text-[11px] tracking-[0.1em] text-slate-300">
            <span className="text-sky-400">UTC+8</span>
            <span>{clock}</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mission stage menu"
            className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-slate-700 bg-[#0b0e17] px-2.5 py-1 font-telemetry text-[11px] tracking-wider text-slate-200 hover:border-sky-400/50 lg:hidden"
          >
            {mobileMenuOpen ? 'CLOSE' : 'STAGES'}
          </button>
        </div>
      </div>

      {/* Mobile Stage Jump Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile mission stages"
          className="border-t border-slate-800 bg-[#07090f]/95 px-4 py-3 backdrop-blur-lg lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {MISSION_STAGES.map((stage) => {
              const isActive = activeStageId === stage.id;
              return (
                <a
                  key={stage.id}
                  href={`#${stage.id}`}
                  onClick={(e) => navigateToStage(e, stage.id)}
                  className={`rounded-sm border px-3 py-2 font-telemetry text-[11px] tracking-wider uppercase ${
                    isActive
                      ? 'border-sky-400/50 bg-sky-400/12 text-sky-300'
                      : 'border-slate-800 bg-[#0b0e17] text-slate-300'
                  }`}
                >
                  {stage.code} // {stage.shortLabel}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
