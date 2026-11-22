import { useState } from 'react';

const ASCII_BANNER_DESKTOP = `
 █████╗ ███╗   ██╗██████╗ ██████╗ ███████╗██╗   ██████╗ ███████╗██╗   ██╗
██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔════╝██║   ██╔══██╗██╔════╝██║   ██║
███████║██╔██╗ ██║██║  ██║██████╔╝█████╗  ██║   ██║  ██║█████╗  ██║   ██║
██╔══██║██║╚██╗██║██║  ██║██╔══██╗██╔══╝  ██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝
██║  ██║██║ ╚████║██████╔╝██║  ██║███████╗██║██╗██████╔╝███████╗ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝  `;

const HeroTerminalSandbox = () => {
    const [mode, setMode] = useState('saas');
    const [workspace, setWorkspace] = useState('AGY_OS');
    const [txCount, setTxCount] = useState(142);
    const [revenue, setRevenue] = useState(84500);

    const [scanning, setScanning] = useState(false);
    const [omrScore, setOmrScore] = useState('20/20 (100%)');
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
            setOmrScore(Math.random() > 0.35 ? '20/20 (100%)' : '19/20 (95%)');
            setScanning(false);
        }, 400);
    };

    return (
        <div className="term-card font-mono text-xs">
            {/* Clean CSS Window Header */}
            <div className="bg-primary border-b border-border px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent inline-block" />
                    <span className="text-text-main font-bold tracking-wider">
                        INTERACTIVE_SYS_MONITOR
                    </span>
                </div>
                <span className="text-[10px] text-text-muted">PID: 4096</span>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-3 border-b border-border bg-primary">
                {[
                    { id: 'saas', label: '[ 1. SAAS_OS ]' },
                    { id: 'ai', label: '[ 2. OMR_AI ]' },
                    { id: 'sql', label: '[ 3. SQL_IDX ]' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id)}
                        className={`py-2.5 px-2 text-[11px] font-bold border-r last:border-r-0 border-border cursor-pointer transition-colors duration-150 ${
                            mode === tab.id
                                ? 'bg-secondary text-accent border-b-2 border-b-accent'
                                : 'bg-primary text-text-muted hover:text-text-main'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Terminal Viewport */}
            <div className="p-5 space-y-4 min-h-[300px] flex flex-col justify-between">
                {mode === 'saas' && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                            <div className="flex gap-1.5">
                                {['AGY_OS', 'LOGISTICS', 'PAYROLL'].map((ws) => (
                                    <button
                                        key={ws}
                                        type="button"
                                        onClick={() => setWorkspace(ws)}
                                        className={`px-2.5 py-1 text-[10px] font-bold border cursor-pointer transition-colors duration-150 ${
                                            workspace === ws
                                                ? 'bg-primary text-accent border-accent'
                                                : 'bg-primary text-text-muted border-border hover:text-text-main'
                                        }`}
                                    >
                                        [ {ws} ]
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={triggerTx}
                                className="px-2.5 py-1 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold text-[11px] cursor-pointer transition-colors duration-150"
                            >
                                [ + EXEC_TX ]
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="border border-border bg-primary p-3.5">
                                <div className="text-[10px] text-text-muted">TENANT_VOLUME ({workspace})</div>
                                <div className="text-base sm:text-lg font-bold text-text-main mt-1">
                                    PHP {revenue.toLocaleString()}
                                </div>
                            </div>
                            <div className="border border-border bg-primary p-3.5">
                                <div className="text-[10px] text-text-muted">VERIFIED_EVENTS</div>
                                <div className="text-base sm:text-lg font-bold text-text-main mt-1">
                                    #{txCount} <span className="text-accent text-xs">● ACK</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-border bg-primary p-3.5 space-y-2 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-text-muted">API_THROUGHPUT</span>
                                <span className="text-text-main font-semibold">14ms p95 // HEALTHY</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">TENANT_ISOLATION</span>
                                <span className="text-accent font-semibold">STRICT_RBAC_VERIFIED</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">UPTIME_SLA</span>
                                <span className="text-text-main">99.98%</span>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'ai' && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                            <span className="text-[11px] text-text-main font-bold">
                                &gt; OPENCV_OMR + PROCTOR_LOCK
                            </span>
                            <div className="flex gap-1.5">
                                <button
                                    type="button"
                                    onClick={triggerScan}
                                    className="px-2.5 py-1 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold text-[10px] cursor-pointer transition-colors duration-150"
                                >
                                    {scanning ? '[ SCANNING... ]' : '[ SCAN_SHEET ]'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStrikes((s) => (s + 1) % 4)}
                                    className="px-2.5 py-1 bg-primary border border-border text-text-main hover:border-accent hover:text-accent font-bold text-[10px] cursor-pointer transition-colors duration-150"
                                >
                                    [ ALT+TAB ({strikes}/3) ]
                                </button>
                            </div>
                        </div>

                        <div className="border border-border bg-primary p-3.5 text-[11px] space-y-1.5">
                            <div className="text-text-muted border-b border-border pb-1 mb-1.5 flex justify-between">
                                <span>OMR_MATRIX // ID: 2026-0194</span>
                                <span className="text-accent">WARP: 18ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Q01: (A) (■) (C) (D)</span>
                                <span className="text-accent">MATCH_OK</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Q02: (A) (B) (C) (■)</span>
                                <span className="text-accent">MATCH_OK</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Q03: (■) (B) (C) (D)</span>
                                <span className="text-accent">MATCH_OK</span>
                            </div>
                            <div className="pt-1.5 border-t border-border flex justify-between font-bold text-text-main">
                                <span>DECODED_SCORE:</span>
                                <span className="text-accent">{omrScore}</span>
                            </div>
                        </div>

                        <div className={`border p-3 text-[11px] font-bold flex justify-between items-center ${
                            strikes >= 3
                                ? 'border-accent bg-primary text-accent'
                                : 'border-border bg-primary text-text-main'
                        }`}>
                            <span>
                                {strikes >= 3
                                    ? 'ALERT: 3/3 STRIKES -> EXAM AUTO-SUBMITTED'
                                    : `FULLSCREEN_LOCK: ACTIVE (${strikes}/3 STRIKES)`}
                            </span>
                            {strikes > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setStrikes(0)}
                                    className="text-accent hover:underline cursor-pointer"
                                >
                                    [ RESET ]
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {mode === 'sql' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-border">
                            <span className="text-[11px] text-text-main font-bold">
                                &gt; PG_QUERY_OPTIMIZER
                            </span>
                            <button
                                type="button"
                                onClick={() => setIndexed((v) => !v)}
                                className="px-2.5 py-1 border border-accent bg-primary text-accent hover:bg-accent hover:text-primary font-bold text-[10px] cursor-pointer transition-colors duration-150"
                            >
                                {indexed ? '[ B-TREE_INDEX: ON ]' : '[ B-TREE_INDEX: OFF ]'}
                            </button>
                        </div>

                        <div className="border border-border bg-primary p-3.5 text-[11px] space-y-1">
                            <div className="text-text-main font-semibold">EXPLAIN ANALYZE SELECT * FROM ledger</div>
                            <div className="text-text-muted">WHERE tenant_id=&apos;09&apos; AND status=&apos;SETTLED&apos;;</div>
                        </div>

                        <div className="border border-border bg-primary p-3.5 space-y-2.5 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-text-muted">
                                    {indexed ? 'PLAN: Index Seek (B-Tree)' : 'PLAN: Full Seq Scan (1.2M rows)'}
                                </span>
                                <span className="text-accent font-bold">
                                    {indexed ? '3.4 ms' : '428.0 ms'}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-secondary border border-border overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-200 ${
                                        indexed ? 'w-1/6 bg-accent' : 'w-11/12 bg-text-muted'
                                    }`}
                                />
                            </div>
                            <div className="text-text-muted text-[10px]">
                                {indexed
                                    ? '125x faster execution via composite B-Tree index & ACID isolation.'
                                    : 'Unindexed sequential scan across 1.2M rows.'}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] text-text-muted">
                    <span>INTERACTIVE_SANDBOX // CLICK_CONTROLS</span>
                    <span className="text-accent">READY █</span>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center bg-primary relative pt-28 pb-24 sm:py-32 border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Crisp Off-White ASCII Art Banner on Desktop */}
                <pre className="hidden md:block text-[9px] lg:text-[11px] leading-[1.15] text-text-main/90 font-mono mb-8 select-none overflow-x-auto">
                    {ASCII_BANNER_DESKTOP}
                </pre>

                {/* Clean CSS Mobile Header Box (No raw Unicode wrapping issues) */}
                <div className="md:hidden term-card p-3.5 mb-6 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-text-main tracking-wider">ANDREI.DEV // ARCH_OS</div>
                        <div className="text-[10px] text-text-muted">FULL-STACK &amp; AI ENGINEER</div>
                    </div>
                    <span className="px-2 py-0.5 border border-accent text-accent text-[10px] font-bold">
                        ONLINE
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column: Workstation Intro & Directory Links */}
                    <div className="lg:col-span-7 term-card p-6 sm:p-8">
                        <div className="text-xs text-text-muted border-b border-border pb-3 mb-5 flex justify-between items-center">
                            <span className="text-text-main font-bold">/HOME/ANDREI/README.MD</span>
                            <span className="text-accent text-[11px]">● EXEC_OK</span>
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm">
                            <p className="text-accent font-bold tracking-wide">
                                &gt; IT FACULTY TEACHER (STI FAIRVIEW) &amp; FULL-STACK ENGINEER
                            </p>
                            <h1 className="text-2xl sm:text-4xl font-bold text-text-main tracking-tight leading-snug uppercase text-balance">
                                Building Scalable Web Apps, AI Automation &amp; Enterprise Systems
                            </h1>
                            <p className="text-text-muted leading-relaxed">
                                Currently serving as an{' '}
                                <span className="text-text-main font-semibold">IT Faculty Teacher for Advanced Database &amp; Network Technology 2</span>{' '}
                                at STI College Fairview (Aug 2025 – Present), while engineering production SaaS platforms, AI-automated tools, and enterprise systems for businesses and startups.
                            </p>
                        </div>

                        {/* Clean CSS Telemetry Grid */}
                        <div className="my-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="border border-accent/60 bg-primary p-3.5">
                                <div className="text-[10px] text-text-muted uppercase">CURRENT_FACULTY</div>
                                <div className="text-sm font-bold text-accent mt-1">Adv. DB &amp; Net Tech 2</div>
                                <div className="text-[10px] text-text-muted mt-0.5">STI Fairview • Aug 2025–Now</div>
                            </div>
                            <div className="border border-border bg-primary p-3.5">
                                <div className="text-[10px] text-text-muted uppercase">SHIPPED_SYSTEMS</div>
                                <div className="text-sm font-bold text-text-main mt-1">5+ Live Platforms</div>
                                <div className="text-[10px] text-text-muted mt-0.5">Evalo • Tactiq • AniVerse</div>
                            </div>
                            <div className="border border-border bg-primary p-3.5">
                                <div className="text-[10px] text-text-muted uppercase">HACKATHON_RANK</div>
                                <div className="text-sm font-bold text-text-main mt-1">CodeFest Champion</div>
                                <div className="text-[10px] text-text-muted mt-0.5">Cluster &amp; Nat&apos;l Finalist</div>
                            </div>
                        </div>

                        {/* Dark Bordered Buttons */}
                        <div className="space-y-2.5">
                            <div className="text-[11px] text-text-muted uppercase">
                                &gt; QUICK_JUMP_DIRECTORY:
                            </div>
                            <div className="flex flex-wrap gap-3 pt-1">
                                <a
                                    href="#projects"
                                    className="px-5 py-2.5 bg-primary text-accent font-bold text-xs border border-accent hover:bg-accent hover:text-primary transition-colors duration-150"
                                >
                                    [ 01. VIEW_SELECTED_WORK -&gt; ]
                                </a>
                                <a
                                    href="#contact"
                                    className="px-5 py-2.5 bg-primary text-text-main font-bold text-xs border border-border hover:border-accent hover:text-accent transition-colors duration-150"
                                >
                                    [ 02. HIRE_ME / BOOK_CALL -&gt; ]
                                </a>
                                <a
                                    href="#services"
                                    className="px-4 py-2.5 bg-primary text-text-muted font-bold text-xs border border-border hover:border-accent hover:text-text-main transition-colors duration-150"
                                >
                                    [ 03. SERVICES ]
                                </a>
                            </div>
                        </div>

                        {/* External Links */}
                        <div className="mt-7 pt-4 border-t border-border flex flex-wrap items-center gap-3 text-xs">
                            <span className="text-text-muted">EXT_LINKS:</span>
                            <a
                                href="https://github.com/YtterStick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 border border-border bg-primary text-text-main hover:border-accent hover:text-accent transition-colors duration-150"
                            >
                                [ GITHUB ↗ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 border border-border bg-primary text-text-main hover:border-accent hover:text-accent transition-colors duration-150"
                            >
                                [ LINKEDIN ↗ ]
                            </a>
                            <a
                                href="mailto:andreidilag12@gmail.com"
                                className="px-2.5 py-1 border border-border bg-primary text-text-main hover:border-accent hover:text-accent transition-colors duration-150"
                            >
                                [ EMAIL_DIRECT ]
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Interactive System Sandbox */}
                    <div className="lg:col-span-5">
                        <HeroTerminalSandbox />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
