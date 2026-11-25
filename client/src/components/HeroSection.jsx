import { useState } from 'react';

const HeroArchitecturePreview = () => {
    const [mode, setMode] = useState('saas');
    const [workspace, setWorkspace] = useState('Agency OS');
    const [txCount, setTxCount] = useState(142);
    const [revenue, setRevenue] = useState(84500);
    const [scanning, setScanning] = useState(false);
    const [omrScore, setOmrScore] = useState('20 / 20 (100%)');
    const [strikes, setStrikes] = useState(0);
    const [indexed, setIndexed] = useState(true);

    const triggerTx = () => {
        setTxCount((c) => c + 1);
        setRevenue((r) => r + 2450);
    };

    const triggerScan = () => {
        if (scanning) return;
        setScanning(true);
        setTimeout(() => {
            setOmrScore(Math.random() > 0.35 ? '20 / 20 (100%)' : '19 / 20 (95%)');
            setScanning(false);
        }, 400);
    };

    return (
        <div className="editorial-card">
            {/* Top Bar */}
            <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between">
                <span className="tech-label text-text-main flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#34d399] inline-block" />
                    <span>LIVE ARCHITECTURE SANDBOX</span>
                </span>
                <span className="tech-label text-text-muted">INTERACTIVE</span>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-3 border-b border-white/[0.08]">
                {[
                    { id: 'saas', label: '(01) SAAS OS' },
                    { id: 'ai', label: '(02) OMR & AI' },
                    { id: 'sql', label: '(03) SQL INDEX' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id)}
                        className={`py-3 px-2 tech-label border-r last:border-r-0 border-white/[0.08] cursor-pointer transition-colors ${
                            mode === tab.id
                                ? 'bg-white/[0.06] text-text-main font-semibold'
                                : 'text-text-muted hover:text-text-main'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Sandbox Stage */}
            <div className="p-6 min-h-[280px] flex flex-col justify-between">
                {mode === 'saas' && (
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                            <div className="flex gap-1.5">
                                {['Agency OS', 'Logistics', 'Payroll'].map((ws) => (
                                    <button
                                        key={ws}
                                        type="button"
                                        onClick={() => setWorkspace(ws)}
                                        className={`px-2.5 py-1 tech-label border cursor-pointer transition-colors ${
                                            workspace === ws
                                                ? 'border-white/40 text-text-main bg-white/[0.04]'
                                                : 'border-white/10 text-text-muted hover:text-text-main'
                                        }`}
                                    >
                                        {ws}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={triggerTx}
                                className="px-3 py-1 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label cursor-pointer transition-colors"
                            >
                                + Simulate Event ↗
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-white/[0.08] bg-primary/60">
                                <div className="tech-label text-text-muted">{workspace} Volume</div>
                                <div className="text-2xl font-serif italic text-text-main mt-1">
                                    ₱{revenue.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 border border-white/[0.08] bg-primary/60">
                                <div className="tech-label text-text-muted">Verified Events</div>
                                <div className="text-2xl font-serif text-text-main mt-1">
                                    {txCount} <span className="tech-label text-[#34d399] ml-1">● LIVE</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 border border-white/[0.08] bg-primary/40 flex justify-between items-center tech-label">
                            <span className="text-text-muted">MULTI-TENANT ISOLATION</span>
                            <span className="text-text-main">99.98% SLA // RBAC</span>
                        </div>
                    </div>
                )}

                {mode === 'ai' && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                            <span className="tech-label text-text-muted">OPENCV OMR + 3-STRIKE PROCTOR</span>
                            <div className="flex gap-1.5">
                                <button
                                    type="button"
                                    onClick={triggerScan}
                                    className="px-2.5 py-1 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label cursor-pointer transition-colors"
                                >
                                    {scanning ? 'Scanning...' : 'Scan Sheet ↗'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStrikes((s) => (s + 1) % 4)}
                                    className="px-2.5 py-1 border border-white/15 text-text-muted hover:text-text-main tech-label cursor-pointer transition-colors"
                                >
                                    Alt+Tab ({strikes}/3)
                                </button>
                            </div>
                        </div>

                        <div className="p-4 border border-white/[0.08] bg-primary/60 space-y-2 tech-label">
                            <div className="flex justify-between text-text-muted border-b border-white/[0.06] pb-1.5">
                                <span>SHEET ID // 2026-0194</span>
                                <span className="text-text-main">WARP: 18MS</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Q01–Q20 BUBBLE MATRIX</span>
                                <span className="text-[#34d399]">VERIFIED</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-white/[0.06]">
                                <span className="text-text-muted">DECODED SCORE</span>
                                <span className="text-text-main font-semibold">{omrScore}</span>
                            </div>
                        </div>

                        <div className="p-3.5 border border-white/[0.08] bg-primary/40 flex justify-between items-center tech-label">
                            <span className={strikes >= 3 ? 'text-amber-300' : 'text-text-muted'}>
                                {strikes >= 3
                                    ? '3/3 STRIKES — AUTO-SUBMITTED'
                                    : `FULLSCREEN FOCUS LOCK (${strikes}/3)`}
                            </span>
                            {strikes > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setStrikes(0)}
                                    className="text-text-main underline cursor-pointer"
                                >
                                    RESET
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {mode === 'sql' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                            <span className="tech-label text-text-muted">POSTGRESQL QUERY PLANNER</span>
                            <button
                                type="button"
                                onClick={() => setIndexed((v) => !v)}
                                className="px-2.5 py-1 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label cursor-pointer transition-colors"
                            >
                                {indexed ? 'B-Tree Index: ON' : 'Seq Scan: OFF'}
                            </button>
                        </div>

                        <div className="p-3.5 border border-white/[0.08] bg-primary/60 font-mono text-[11px] text-text-muted">
                            SELECT * FROM ledger WHERE tenant_id = &apos;09&apos; AND status = &apos;SETTLED&apos;;
                        </div>

                        <div className="p-4 border border-white/[0.08] bg-primary/60 space-y-2.5">
                            <div className="flex justify-between tech-label">
                                <span className="text-text-muted">
                                    {indexed ? 'COMPOSITE B-TREE SEEK' : 'FULL TABLE SEQ SCAN (1.2M)'}
                                </span>
                                <span className="text-text-main font-semibold">
                                    {indexed ? '3.4 ms' : '428.0 ms'}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.06] overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${
                                        indexed ? 'w-1/6 bg-[#34d399]' : 'w-11/12 bg-white/40'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center tech-label text-text-muted">
                    <span>NEXT.JS • FASTAPI • SPRING BOOT • SQL</span>
                    <span className="text-text-main">READY</span>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('andreidilag12@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore clipboard fallback
        }
    };

    return (
        <section id="hero" className="py-28 sm:py-40 border-b border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
                    {/* Left: Editorial Display Typography & Intro */}
                    <div className="lg:col-span-7">
                        <div className="tech-label text-text-muted mb-4">
                            (01) HELLO — IT FACULTY TEACHER &amp; FULL-STACK ENGINEER
                        </div>

                        <h1 className="display-serif text-text-main mb-8 text-balance">
                            Engineering systems with <em>editorial clarity.</em>
                        </h1>

                        <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-10 font-normal">
                            I’m <span className="text-text-main font-medium">Andrei Dilag</span>—an{' '}
                            <span className="text-text-main font-medium">
                                IT Faculty Teacher for Advanced Database &amp; Network Technology 2
                            </span>{' '}
                            at STI College Fairview (Aug 2025 – Present) and a Full-Stack Engineer building scalable web applications, AI-automated platforms, and enterprise tools.
                        </p>

                        {/* Primary & Secondary Actions */}
                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <a
                                href="#projects"
                                className="px-6 py-3.5 bg-text-main text-primary tech-label font-semibold hover:bg-white transition-colors"
                            >
                                Explore Selected Work ↗
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3.5 border border-white/20 text-text-main tech-label hover:border-white transition-colors"
                            >
                                Book a Call ↗
                            </a>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="px-4 py-3.5 border border-white/10 text-text-muted hover:text-text-main hover:border-white/30 tech-label cursor-pointer transition-colors"
                            >
                                {copied ? 'COPIED EMAIL ✓' : 'COPY EMAIL'}
                            </button>
                        </div>

                        {/* Editorial Metadata Strip */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
                            <div>
                                <div className="tech-label text-text-muted mb-1">CURRENT ROLE</div>
                                <div className="text-sm text-text-main font-medium">IT Faculty Teacher</div>
                                <div className="text-xs text-text-muted">STI Fairview • 2025–Present</div>
                            </div>
                            <div>
                                <div className="tech-label text-text-muted mb-1">FLAGSHIP WORKS</div>
                                <div className="text-sm text-text-main font-medium">5+ Live Systems</div>
                                <div className="text-xs text-text-muted">Evalo • Tactiq • AniVerse</div>
                            </div>
                            <div>
                                <div className="tech-label text-text-muted mb-1">DISTINCTION</div>
                                <div className="text-sm text-text-main font-medium">CodeFest Champion</div>
                                <div className="text-xs text-text-muted">Cluster &amp; National Stage</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Architecture Sandbox */}
                    <div className="lg:col-span-5 lg:mt-8">
                        <HeroArchitecturePreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
