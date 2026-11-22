import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaBolt, FaShieldAlt, FaDatabase, FaCheckCircle } from 'react-icons/fa';

const HeroInteractiveStudio = () => {
    const [mode, setMode] = useState('saas'); // 'saas' | 'ai' | 'sql'

    // Mode 1: SaaS Command UI interactive state
    const [workspace, setWorkspace] = useState('Agency OS');
    const [txCount, setTxCount] = useState(142);
    const [revenue, setRevenue] = useState(84500);
    const [bars, setBars] = useState([42, 58, 51, 74, 66, 88, 95]);

    // Mode 2: AI & OMR Vision interactive state
    const [scanning, setScanning] = useState(false);
    const [omrScore, setOmrScore] = useState('19 / 20 (95%)');
    const [strikes, setStrikes] = useState(0);

    // Mode 3: SQL Indexing interactive state
    const [indexed, setIndexed] = useState(true);

    const triggerTransaction = () => {
        setTxCount((c) => c + 1);
        setRevenue((r) => r + 2450);
        setBars((prev) => [...prev.slice(1), Math.min(100, Math.max(48, Math.floor(65 + Math.random() * 35)))]);
    };

    const runOmrScan = () => {
        if (scanning) return;
        setScanning(true);
        setTimeout(() => {
            setOmrScore(Math.random() > 0.4 ? '20 / 20 (100%)' : '19 / 20 (95%)');
            setScanning(false);
        }, 700);
    };

    return (
        <div className="relative rounded-2xl border border-border/80 bg-[#0d0d15]/95 shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden backdrop-blur-xl">
            {/* Subtle top architectural highlight */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-accent/70 to-transparent" />

            {/* Studio Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#09090f] border-b border-border/70">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-[11px] font-mono text-text-muted tracking-wider uppercase">
                        Interactive Architecture Canvas
                    </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                    Click Controls Below
                </span>
            </div>

            {/* Interactive Mode Switcher Tabs */}
            <div className="grid grid-cols-3 border-b border-border/70 bg-primary/60 p-1.5 gap-1.5">
                {[
                    { id: 'saas', label: '01 / SaaS UI', icon: <FaBolt size={11} /> },
                    { id: 'ai', label: '02 / AI & OMR', icon: <FaShieldAlt size={11} /> },
                    { id: 'sql', label: '03 / SQL Engine', icon: <FaDatabase size={11} /> }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            mode === tab.id
                                ? 'bg-accent text-white shadow-sm shadow-accent/30'
                                : 'text-zinc-400 hover:text-white hover:bg-secondary/80'
                        }`}
                    >
                        {tab.icon}
                        <span className="truncate">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Interactive Stage */}
            <div className="p-5 sm:p-6 min-h-[320px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {mode === 'saas' && (
                        <motion.div
                            key="saas"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                            className="space-y-4"
                        >
                            {/* Workspace Switcher */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="inline-flex p-1 rounded-xl bg-primary border border-border/70 gap-1">
                                    {['Agency OS', 'Logistics Hub', 'HR Payroll'].map((ws) => (
                                        <button
                                            key={ws}
                                            type="button"
                                            onClick={() => setWorkspace(ws)}
                                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                                workspace === ws
                                                    ? 'bg-secondary text-white border border-accent/40'
                                                    : 'text-text-muted hover:text-white'
                                            }`}
                                        >
                                            {ws}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={triggerTransaction}
                                    className="px-3 py-1.5 rounded-xl bg-accent/15 hover:bg-accent text-accent-hover hover:text-white border border-accent/40 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                    <FaPlay size={9} /> Simulate Event
                                </button>
                            </div>

                            {/* Live KPI Strip */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-primary/80 border border-border/60">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                                        {workspace} Volume
                                    </span>
                                    <motion.span
                                        key={revenue}
                                        initial={{ scale: 1.06, color: '#34d399' }}
                                        animate={{ scale: 1, color: '#ffffff' }}
                                        className="text-xl font-bold font-mono mt-0.5 block"
                                    >
                                        ₱{revenue.toLocaleString()}
                                    </motion.span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-primary/80 border border-border/60">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                                        Verified Events
                                    </span>
                                    <motion.span
                                        key={txCount}
                                        initial={{ scale: 1.08, color: '#818cf8' }}
                                        animate={{ scale: 1, color: '#ffffff' }}
                                        className="text-xl font-bold font-mono mt-0.5 block"
                                    >
                                        {txCount} <span className="text-xs font-normal text-emerald-400">● Live</span>
                                    </motion.span>
                                </div>
                            </div>

                            {/* Interactive Telemetry Bars */}
                            <div className="p-4 rounded-xl bg-primary/70 border border-border/60">
                                <div className="flex justify-between items-center mb-2.5">
                                    <span className="text-[11px] font-mono text-zinc-300">
                                        Real-Time Multi-Tenant Telemetry
                                    </span>
                                    <span className="text-[10px] font-mono text-accent-hover">99.98% Uptime</span>
                                </div>
                                <div className="h-20 flex items-end gap-2 pt-2">
                                    {bars.map((val, idx) => (
                                        <div key={idx} className="flex-1 h-full flex items-end">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${val}%` }}
                                                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                                                className={`w-full rounded-t-md ${
                                                    idx === bars.length - 1
                                                        ? 'bg-linear-to-t from-accent to-emerald-400'
                                                        : 'bg-accent/35 hover:bg-accent/65'
                                                } transition-colors`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'ai' && (
                        <motion.div
                            key="ai"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                            className="space-y-4"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-mono text-zinc-300">
                                    OpenCV OMR + 3-Strike Proctoring Engine
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={runOmrScan}
                                        className="px-3 py-1.5 rounded-xl bg-accent/20 hover:bg-accent text-white border border-accent/40 text-xs font-semibold transition-all cursor-pointer"
                                    >
                                        {scanning ? 'Scanning Sheet...' : 'Scan OMR Sheet'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStrikes((s) => (s + 1) % 4)}
                                        className="px-2.5 py-1.5 rounded-xl bg-primary hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 border border-border text-xs font-mono transition-all cursor-pointer"
                                    >
                                        Alt+Tab ({strikes}/3)
                                    </button>
                                </div>
                            </div>

                            {/* Simulated OMR Bubble Matrix */}
                            <div className="relative p-4 rounded-xl bg-primary/80 border border-border/60 overflow-hidden">
                                {scanning && (
                                    <motion.div
                                        initial={{ top: '0%' }}
                                        animate={{ top: '100%' }}
                                        transition={{ duration: 0.65, ease: 'linear' }}
                                        className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_16px_#34d399] z-10"
                                    />
                                )}
                                <div className="grid grid-cols-5 gap-2 text-[11px] font-mono">
                                    {[1, 2, 3, 4, 5].map((q) => (
                                        <div key={q} className="p-2 rounded-lg bg-secondary/90 border border-border/50 text-center">
                                            <span className="text-text-muted block text-[10px] mb-1">Q0{q}</span>
                                            <div className="flex justify-center gap-1">
                                                {['A', 'B', 'C', 'D'].map((opt, oIdx) => {
                                                    const filled = (q + oIdx) % 4 === 1;
                                                    return (
                                                        <span
                                                            key={opt}
                                                            className={`w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center ${
                                                                filled
                                                                    ? 'bg-emerald-400 text-primary font-bold'
                                                                    : 'border border-border text-text-muted'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-2.5 border-t border-border/50 flex justify-between items-center text-xs font-mono">
                                    <span className="text-emerald-300">Decoded Score: {omrScore}</span>
                                    <span className="text-text-muted">Perspective Warp: 18ms</span>
                                </div>
                            </div>

                            {/* Anti-Cheat Strike Status Bar */}
                            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                                strikes >= 3
                                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                                    : 'bg-primary/70 border-border/60 text-zinc-300'
                            }`}>
                                <span>
                                    {strikes >= 3
                                        ? '🔒 3 Strikes Reached — Exam Auto-Submitted'
                                        : `Fullscreen Lock Active • Infractions: ${strikes} / 3`}
                                </span>
                                {strikes > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setStrikes(0)}
                                        className="text-[10px] underline hover:text-white cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {mode === 'sql' && (
                        <motion.div
                            key="sql"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-mono text-zinc-300">
                                    PostgreSQL Query Planner &amp; Indexing
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIndexed((v) => !v)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                        indexed
                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                                            : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                    }`}
                                >
                                    {indexed ? '✓ B-Tree Composite Index: ON' : '⚠ Unindexed Seq Scan: OFF'}
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#07070c] border border-border/70 font-mono text-[11px] text-zinc-300 space-y-1">
                                <div className="text-accent-hover">
                                    EXPLAIN ANALYZE SELECT * FROM ledger_entries
                                </div>
                                <div className="text-zinc-400">
                                    WHERE tenant_id = &apos;ws_09&apos; AND status = &apos;SETTLED&apos; ORDER BY created_at DESC;
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-primary/80 border border-border/60 space-y-3">
                                <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-text-muted">
                                        {indexed ? 'Index Cond: idx_tenant_status_created' : 'Seq Scan on ledger_entries (1.2M rows)'}
                                    </span>
                                    <span className={indexed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                        {indexed ? '3.4 ms' : '428.0 ms'}
                                    </span>
                                </div>
                                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            width: indexed ? '12%' : '96%',
                                            backgroundColor: indexed ? '#34d399' : '#f43f5e'
                                        }}
                                        transition={{ duration: 0.35 }}
                                        className="h-full rounded-full"
                                    />
                                </div>
                                <p className="text-[11px] text-text-muted">
                                    {indexed
                                        ? '125× faster execution via composite B-Tree index & ACID transaction isolation.'
                                        : 'Click the toggle above to apply composite indexing and eliminate full-table bottlenecks.'}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Studio Footer Bar */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span> Interactive Frontend × Backend Proof</span>
                    <span className="text-zinc-300">React • FastAPI • Spring Boot • SQL</span>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center bg-primary relative overflow-hidden pt-28 pb-16 sm:py-28">
            {/* Architectural Blueprint Hairline Grid */}
            <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-175 h-125 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left Column: Editorial Art & Business Pitch */}
                    <div className="lg:col-span-7 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full border border-border bg-secondary/80 text-xs font-mono text-zinc-300"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>ANDREI DILAG</span>
                            <span className="text-border">|</span>
                            <span className="text-accent-hover">FULL-STACK &amp; AI ENGINEER</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.08 }}
                            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06] mb-6 text-balance"
                        >
                            Where Frontend Craft Meets{' '}
                            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-linear-to-r from-white via-indigo-200 to-accent-hover">
                                Systems Architecture.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.16 }}
                            className="text-text-muted text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed font-light"
                        >
                            I design and engineer tactile web applications, AI-automated workflows, and high-throughput enterprise platforms—backed by deep architectural rigor as an{' '}
                            <span className="text-zinc-200 font-normal">Advanced Database &amp; Networking educator</span>.
                        </motion.p>

                        {/* Proof Metrics Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.22 }}
                            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mb-8 py-3.5 px-4 rounded-2xl bg-secondary/60 border border-border/70"
                        >
                            <div>
                                <div className="text-base sm:text-lg font-bold text-white font-mono">5+ Live</div>
                                <div className="text-[11px] text-text-muted">Production Systems</div>
                            </div>
                            <div className="border-l border-border/70 pl-3 sm:pl-4">
                                <div className="text-base sm:text-lg font-bold text-white font-mono">CodeFest</div>
                                <div className="text-[11px] text-text-muted">Champion &amp; Finalist</div>
                            </div>
                            <div className="border-l border-border/70 pl-3 sm:pl-4">
                                <div className="text-base sm:text-lg font-bold text-white font-mono">IT Faculty</div>
                                <div className="text-[11px] text-text-muted">Advanced DB &amp; Net</div>
                            </div>
                        </motion.div>

                        {/* CTAs & Socials */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.28 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                            <a
                                href="#projects"
                                className="px-7 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-all duration-300 text-sm sm:text-base shadow-lg shadow-accent/25 text-center"
                            >
                                View Selected Work
                            </a>
                            <a
                                href="#contact"
                                className="px-7 py-3.5 border border-border hover:border-accent bg-secondary/70 text-white font-semibold rounded-xl hover:bg-accent/15 transition-all duration-300 text-sm sm:text-base text-center"
                            >
                                Hire Me / Book a Call
                            </a>
                            <div className="flex items-center justify-center sm:justify-start gap-5 pt-2 sm:pt-0 sm:pl-3">
                                <SocialLink href="https://github.com/YtterStick" icon={<FaGithub />} label="GitHub" />
                                <SocialLink href="https://www.linkedin.com/in/andrei-dilag-79b018268/" icon={<FaLinkedin />} label="LinkedIn" />
                                <SocialLink href="mailto:andreidilag12@gmail.com" icon={<FaEnvelope />} label="Email" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Live Playable Architecture & UI Sandbox */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.18 }}
                        className="lg:col-span-5"
                    >
                        <HeroInteractiveStudio />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-white text-xl transition-colors duration-300"
        aria-label={label}
    >
        {icon}
    </a>
);

export default HeroSection;
