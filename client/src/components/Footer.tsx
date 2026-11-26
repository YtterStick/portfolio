import React, { useEffect, useState } from 'react';
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
    return `MNL ${f.format(new Date())} UTC+8`;
  } catch {
    return 'MNL 00:00:00 UTC+8';
  }
};

const Footer: React.FC = () => {
  const [clock, setClock] = useState<string>(formatManilaClock);
  const { lenis } = useLenisScroll() as {
    lenis: { scrollTo: (target: number, opts?: Record<string, unknown>) => void } | null;
  };

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatManilaClock()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-slate-400/12 bg-[#07090f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 font-telemetry text-[11px] tracking-[0.12em] text-slate-400 uppercase sm:flex-row sm:items-center sm:px-6 lg:px-8 lg:pr-24">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-slate-200">&copy; {new Date().getFullYear()} ANDREI DILAG</span>
          <span className="text-slate-600">//</span>
          <span>QUEZON CITY, PH · 14.7011°N 121.0422°E</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sky-400/90">{clock}</span>
          <button
            type="button"
            onClick={handleBackToTop}
            className="cursor-pointer rounded-sm border border-sky-400/35 bg-sky-400/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] text-sky-300 transition-colors hover:bg-sky-400 hover:text-[#07090f]"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
