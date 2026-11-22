import { useState } from 'react';

const ASCII_BANNER_DESKTOP = `
 █████╗ ███╗   ██╗██████╗ ██████╗ ███████╗██╗   ██████╗ ███████╗██╗   ██╗
██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔════╝██║   ██╔══██╗██╔════╝██║   ██║
███████║██╔██╗ ██║██║  ██║██████╔╝█████╗  ██║   ██║  ██║█████╗  ██║   ██║
██╔══██║██║╚██╗██║██║  ██║██╔══██╗██╔══╝  ██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝
██║  ██║██║ ╚████║██████╔╝██║  ██║███████╗██║██╗██████╔╝███████╗ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝  `;

const ASCII_BANNER_MOBILE = `
╔════════════════════════════╗
║  ANDREI.DEV // ARCH_OS v2  ║
║  FULL-STACK & AI ENGINEER  ║
╚════════════════════════════╝`;

const HeroTerminalSandbox = () => {
    const [mode, setMode] = useState('saas');
    const [workspace, setWorkspace] = useState('AGY_OS');
    const [txCount, setTxCount] = useState(142);
    const [revenue, setRevenue] = useState(84500);

    const [scanning, setScanning] = useState(false);
    const [omrScore, setOmrScore] = useState('20/20 [100%]');
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
            setOmrScore(Math.random() > 0.35 ? '20/20 [100%]' : '19/20 [95%]');
            setScanning(false);
        }, 400);
    };

    return (
        <div className="border border-accent bg-secondary font-mono text-xs">
            {/* Double-line ASCII Top Header */}
            <div className="bg-primary border-b border-border px-3 py-2 flex items-center justify-between">
                <span className="text-accent font-bold">
                    ╔══[ INTERACTIVE_SYS_MONITOR.EXE ]══╗
                </span>
                <span className="text-[10px] text-text-muted">[PID: 4096]</span>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-3 border-b border-border bg-primary">
                {[
                    { id: 'saas', label: '[1] SAAS_OS' },
                    { id: 'ai', label: '[2] OMR_AI' },
                    { id: 'sql', label: '[3] SQL_IDX' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id)}
                        className={`py-2 px-2 text-[11px] font-bold border-r last:border-r-0 border-border cursor-pointer transition-none ${
                            mode === tab.id
                                ? 'bg-accent text-primary'
                                : 'bg-primary text-text-main hover:bg-accent hover:text-primary'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Terminal Viewport */}
            <div className="p-4 space-y-4 min-h-[290px] flex flex-col justify-between">
                {mode === 'saas' && (
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border">
                            <div className="flex gap-1">
                                {['AGY_OS', 'LOGISTICS', 'PAYROLL'].map((ws) => (
                                    <button
                                        key={ws}
                                        type="button"
                                        onClick={() => setWorkspace(ws)}
                                        className={`px-2 py-0.5 text-[10px] font-bold border cursor-pointer transition-none ${
                                            workspace === ws
                                                ? 'bg-accent text-primary border-accent'
                                                : 'bg-primary text-text-muted border-border hover:bg-accent hover:text-primary'
                                        }`}
                                    >
                                        [{ws}]
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={triggerTx}
                                className="px-2.5 py-1 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold text-[11px] cursor-pointer transition-none"
                            >
                                [ + EXEC_TX -&gt; ]
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="border border-border bg-primary p-3">
                                <div className="text-[10px] text-text-muted">TENANT_VOLUME ({workspace})</div>
                                <div className="text-base sm:text-lg font-bold text-accent mt-1">
                                    PHP {revenue.toLocaleString()}
                                </div>
                            </div>
                            <div className="border border-border bg-primary p-3">
                                <div className="text-[10px] text-text-muted">VERIFIED_EVENTS</div>
                                <div className="text-base sm:text-lg font-bold text-text-main mt-1">
                                    #{txCount} <span className="text-accent text-xs">[ACK]</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-border bg-primary p-3 space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-text-muted">API_THROUGHPUT</span>
                                <span className="text-accent">[█████████░] 94%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">TENANT_ISOLATION</span>
                                <span className="text-accent">[██████████] 100%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">UPTIME_SLA</span>
                                <span className="text-text-main">99.98% // RBAC_LOCKED</span>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'ai' && (
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border">
                            <span className="text-[11px] text-accent font-bold">
                                &gt; OPENCV_OMR + PROCTOR_LOCK
                            </span>
                            <div className="flex gap-1.5">
                                <button
                                    type="button"
                                    onClick={triggerScan}
                                    className="px-2 py-1 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold text-[10px] cursor-pointer transition-none"
                                >
                                    {scanning ? '[ SCANNING... ]' : '[ SCAN_SHEET ]'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStrikes((s) => (s + 1) % 4)}
                                    className="px-2 py-1 bg-primary border border-border text-text-main hover:bg-accent hover:text-primary font-bold text-[10px] cursor-pointer transition-none"
                                >
                                    [ ALT+TAB ({strikes}/3) ]
                                </button>
                            </div>
                        </div>

                        <pre className="border border-border bg-primary p-3 text-[10px] sm:text-[11px] leading-tight text-text-main overflow-x-auto">
{`+-----------------------------------------+
| OMR_MATRIX // ID: 2026-0194             |
| Q01: (A) [■] (C) (D)  -> MATCH [OK]     |
| Q02: (A) (B) (C) [■]  -> MATCH [OK]     |
| Q03: [■] (B) (C) (D)  -> MATCH [OK]     |
+-----------------------------------------+
| SCORE: ${omrScore} // WARP: 18ms     |
+-----------------------------------------+`}
                        </pre>

                        <div className={`border p-2.5 text-[11px] font-bold flex justify-between items-center ${
                            strikes >= 3
                                ? 'border-accent bg-accent text-primary'
                                : 'border-border bg-primary text-text-main'
                        }`}>
                            <span>
                                {strikes >= 3
                                    ? '[ALERT] 3/3 STRIKES -> EXAM AUTO-SUBMITTED'
                                    : `[LOCK_ACTIVE] INFRACTIONS: ${strikes}/3`}
                            </span>
                            {strikes > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setStrikes(0)}
                                    className="underline cursor-pointer"
                                >
                                    [RESET]
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {mode === 'sql' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-border">
                            <span className="text-[11px] text-accent font-bold">
                                &gt; PG_QUERY_OPTIMIZER
                            </span>
                            <button
                                type="button"
                                onClick={() => setIndexed((v) => !v)}
                                className="px-2.5 py-1 border border-accent bg-primary text-accent hover:bg-accent hover:text-primary font-bold text-[10px] cursor-pointer transition-none"
                            >
                                {indexed ? '[ B-TREE_INDEX: ON ]' : '[ B-TREE_INDEX: OFF ]'}
                            </button>
                        </div>

                        <div className="border border-border bg-primary p-3 text-[11px] space-y-1">
                            <div className="text-accent">EXPLAIN ANALYZE SELECT * FROM ledger</div>
                            <div className="text-text-muted">WHERE tenant_id=&apos;09&apos; AND status=&apos;OK&apos;;</div>
                        </div>

                        <div className="border border-border bg-primary p-3 space-y-2 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-text-muted">
                                    {indexed ? 'PLAN: Index Seek (B-Tree)' : 'PLAN: Full Seq Scan (1.2M)'}
                                </span>
                                <span className="text-accent font-bold">
                                    {indexed ? '3.4 ms' : '428.0 ms'}
                                </span>
                            </div>
                            <div className="text-accent font-mono">
                                {indexed
                                    ? 'SPEED: [██████████] 125x FASTER'
                                    : 'LOAD : [█████████░] BOTTLENECK!'}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-2 border-t border-border flex justify-between items-center text-[10px] text-text-muted">
                    <span>╚══[ CLICK TABS TO TEST MODULES ]══╝</span>
                    <span className="text-accent">READY █</span>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center bg-primary relative pt-24 pb-16 border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Desktop ASCII Art Banner */}
                <pre className="hidden md:block text-[9px] lg:text-[11px] leading-[1.15] text-accent font-mono mb-6 select-none overflow-x-auto">
                    {ASCII_BANNER_DESKTOP}
                </pre>
                {/* Compact Mobile ASCII Art Banner */}
                <pre className="md:hidden text-[11px] leading-snug text-accent font-mono mb-5 select-none">
                    {ASCII_BANNER_MOBILE}
                </pre>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Terminal Boot Intro & Directory Links */}
                    <div className="lg:col-span-7 border border-border bg-secondary p-5 sm:p-7">
                        <div className="text-xs text-text-muted border-b border-border pb-2 mb-4 flex justify-between">
                            <span>╔══[ /HOME/ANDREI/README.TXT ]</span>
                            <span className="text-accent">[EXEC: OK]</span>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <p className="text-accent font-bold">
                                &gt; ROLE: FULL-STACK SOFTWARE ENGINEER &amp; IT EDUCATOR
                            </p>
                            <h1 className="text-xl sm:text-3xl font-bold text-text-main tracking-tight leading-snug uppercase">
                                BUILDING SCALABLE WEB APPS, AI AUTOMATION &amp; ENTERPRISE SYSTEMS_
                            </h1>
                            <p className="text-text-muted leading-relaxed">
                                I help businesses, startup founders, and engineering teams ship high-throughput web platforms, AI workflows, and internal tools—backed by deep architectural mastery teaching{' '}
                                <span className="text-text-main font-bold">Advanced Database &amp; Network Technology</span>.
                            </p>
                        </div>

                        {/* ASCII System Spec Table */}
                        <div className="my-6 border border-border bg-primary p-3.5 text-xs space-y-1.5">
                            <div className="text-text-muted">+--[ SYSTEM_TELEMETRY_SPECS ]---------------------------+</div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">SHIPPED_SYSTEMS :</span>
                                <span className="text-accent font-bold">5+ PRODUCTION PLATFORMS [LIVE]</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">COMPETITIVE_RANK:</span>
                                <span className="text-text-main font-bold">CODEFEST CHAMPION &amp; NAT&apos;L FINALIST</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">ACADEMIC_RANK   :</span>
                                <span className="text-text-main font-bold">FACULTY (ADVANCED DB &amp; NETWORKING)</span>
                            </div>
                            <div className="text-text-muted">+-------------------------------------------------------+</div>
                        </div>

                        {/* Quick-Jump Directory Links */}
                        <div className="space-y-2">
                            <div className="text-[11px] text-text-muted uppercase">
                                &gt; QUICK_JUMP_DIRECTORY:
                            </div>
                            <div className="flex flex-wrap gap-2.5 pt-1">
                                <a
                                    href="#projects"
                                    className="px-4 py-2.5 bg-accent text-primary font-bold text-xs border border-accent hover:bg-primary hover:text-accent transition-none"
                                >
                                    [ 01. VIEW_SELECTED_WORK -&gt; ]
                                </a>
                                <a
                                    href="#contact"
                                    className="px-4 py-2.5 bg-primary text-text-main font-bold text-xs border border-border hover:bg-accent hover:text-primary hover:border-accent transition-none"
                                >
                                    [ 02. HIRE_ME / BOOK_CALL -&gt; ]
                                </a>
                                <a
                                    href="#services"
                                    className="px-3.5 py-2.5 bg-primary text-accent font-bold text-xs border border-accent/60 hover:bg-accent hover:text-primary transition-none"
                                >
                                    [ 03. SERVICES_MODULES ]
                                </a>
                            </div>
                        </div>

                        {/* External Links */}
                        <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center gap-3 text-xs">
                            <span className="text-text-muted">EXT_LINKS:</span>
                            <a
                                href="https://github.com/YtterStick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 border border-border bg-primary text-text-main hover:bg-accent hover:text-primary transition-none"
                            >
                                [ GITHUB ↗ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 border border-border bg-primary text-text-main hover:bg-accent hover:text-primary transition-none"
                            >
                                [ LINKEDIN ↗ ]
                            </a>
                            <a
                                href="mailto:andreidilag12@gmail.com"
                                className="px-2 py-0.5 border border-border bg-primary text-text-main hover:bg-accent hover:text-primary transition-none"
                            >
                                [ EMAIL_DIRECT ]
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Interactive ASCII System Sandbox */}
                    <div className="lg:col-span-5">
                        <HeroTerminalSandbox />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
