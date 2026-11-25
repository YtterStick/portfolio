import { useState, useEffect, useRef } from 'react';

const LiveAsciiHeroCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const pointerRef = useRef({
        x: -9999,
        y: -9999,
        targetX: -9999,
        targetY: -9999
    });

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const GLYPHS = ['·', '-', '=', '+', '%', 'A', 'D', '#', '@'];
        const BG_GLYPHS = ['·', '+', '0', '1'];

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let cellSize = 9;
        let cells = [];
        let bgCells = [];
        let animId = 0;
        let isVisible = true;
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        const sampleTextMatrix = () => {
            const rect = container.getBoundingClientRect();
            width = Math.max(300, Math.floor(rect.width));
            height = width < 640 ? 160 : width < 1024 ? 210 : 250;
            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            cellSize = width < 640 ? 6 : width < 1024 ? 8 : 9;
            const cols = Math.floor(width / cellSize);
            const rows = Math.floor(height / cellSize);

            const off = document.createElement('canvas');
            off.width = cols;
            off.height = rows;
            const octx = off.getContext('2d');
            if (!octx) return;

            octx.clearRect(0, 0, cols, rows);
            octx.fillStyle = '#ffffff';
            octx.textAlign = 'center';
            octx.textBaseline = 'middle';

            let fontSize = Math.floor(rows * 0.56);
            octx.font = `900 ${fontSize}px "Inter", system-ui, sans-serif`;
            const title = 'ANDREI DILAG';
            const measured = octx.measureText(title).width;
            if (measured > cols * 0.92) {
                fontSize = Math.max(8, Math.floor(fontSize * ((cols * 0.92) / measured)));
                octx.font = `900 ${fontSize}px "Inter", system-ui, sans-serif`;
            }
            octx.fillText(title, Math.floor(cols / 2), Math.floor(rows * 0.43));

            const subSize = Math.max(5, Math.floor(rows * 0.14));
            octx.font = `700 ${subSize}px "JetBrains Mono", monospace`;
            octx.fillStyle = 'rgba(255, 255, 255, 0.58)';
            octx.fillText('SYSTEMS & AI ARCHITECTURE', Math.floor(cols / 2), Math.floor(rows * 0.82));

            const imgData = octx.getImageData(0, 0, cols, rows).data;
            cells = [];
            bgCells = [];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = (r * cols + c) * 4;
                    const alpha = imgData[idx + 3] / 255;
                    const x = c * cellSize + cellSize * 0.5;
                    const y = r * cellSize + cellSize * 0.5;

                    if (alpha > 0.14) {
                        cells.push({
                            c,
                            r,
                            x,
                            y,
                            alpha,
                            phase: c * 0.16 + r * 0.22
                        });
                    } else if ((c % 4 === 0 && r % 3 === 0) || Math.random() < 0.015) {
                        bgCells.push({
                            x,
                            y,
                            glyph: BG_GLYPHS[(c + r) % BG_GLYPHS.length],
                            phase: Math.random() * Math.PI * 2
                        });
                    }
                }
            }
        };

        sampleTextMatrix();

        const renderFrame = (timeMs) => {
            if (!isVisible) {
                animId = window.requestAnimationFrame(renderFrame);
                return;
            }

            const t = timeMs * 0.0024;
            const p = pointerRef.current;
            p.x += (p.targetX - p.x) * 0.2;
            p.y += (p.targetY - p.y) * 0.2;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            const radius = width < 640 ? 90 : 140;
            const radiusSq = radius * radius;

            // Ambient background grid nodes
            ctx.font = `${Math.max(7, cellSize - 1)}px "JetBrains Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < bgCells.length; i++) {
                const b = bgCells[i];
                const dx = b.x - p.x;
                const dy = b.y - p.y;
                const distSq = dx * dx + dy * dy;
                const boost = distSq < radiusSq ? (1 - distSq / radiusSq) * 0.4 : 0;
                const flicker = 0.05 + 0.05 * Math.sin(t * 0.9 + b.phase) + boost;
                ctx.fillStyle = boost > 0.08
                    ? `rgba(52, 211, 153, ${Math.min(0.6, flicker).toFixed(3)})`
                    : `rgba(245, 245, 245, ${flicker.toFixed(3)})`;
                ctx.fillText(b.glyph, b.x, b.y);
            }

            // Sampled ASCII Hero Title Matrix
            ctx.font = `600 ${cellSize}px "JetBrains Mono", monospace`;
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const wave = reduceMotion
                    ? 0
                    : Math.sin(t * 1.4 + cell.c * 0.13 - cell.r * 0.2) * 0.18;

                const dx = cell.x - p.x;
                const dy = cell.y - p.y;
                const distSq = dx * dx + dy * dy;

                let ripple = 0;
                let offsetX = 0;
                let offsetY = 0;

                if (distSq < radiusSq && distSq > 0.01) {
                    const dist = Math.sqrt(distSq);
                    const falloff = 1 - dist / radius;
                    ripple = falloff * falloff;
                    offsetX = (dx / dist) * ripple * 4.2;
                    offsetY = (dy / dist) * ripple * 4.2;
                }

                const lum = Math.min(1, Math.max(0.18, cell.alpha + wave + ripple * 0.55));
                const glyphIdx = Math.min(
                    GLYPHS.length - 1,
                    Math.max(0, Math.floor(lum * (GLYPHS.length - 1)))
                );
                const glyph = GLYPHS[glyphIdx];

                if (ripple > 0.16) {
                    const greenMix = Math.min(1, ripple * 1.35);
                    const rCol = Math.round(245 - greenMix * 175);
                    const gCol = Math.round(245 - greenMix * 20);
                    const bCol = Math.round(245 - greenMix * 85);
                    ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${Math.min(1, lum + 0.25).toFixed(3)})`;
                } else {
                    const baseAlpha = Math.min(0.96, Math.max(0.24, lum * 0.94));
                    ctx.fillStyle = `rgba(245, 245, 245, ${baseAlpha.toFixed(3)})`;
                }

                ctx.fillText(glyph, cell.x + offsetX, cell.y + offsetY);
            }

            ctx.restore();

            if (!reduceMotion) {
                animId = window.requestAnimationFrame(renderFrame);
            }
        };

        animId = window.requestAnimationFrame(renderFrame);

        const handleResize = () => {
            sampleTextMatrix();
            if (reduceMotion) {
                renderFrame(0);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(container);
        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animId);
        };
    }, []);

    const updatePointer = (clientX, clientY) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        pointerRef.current.targetX = clientX - rect.left;
        pointerRef.current.targetY = clientY - rect.top;
    };

    const resetPointer = () => {
        pointerRef.current.targetX = -9999;
        pointerRef.current.targetY = -9999;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={(e) => updatePointer(e.clientX, e.clientY)}
            onMouseLeave={resetPointer}
            onTouchMove={(e) => {
                const touch = e.touches[0];
                if (touch) updatePointer(touch.clientX, touch.clientY);
            }}
            onTouchEnd={resetPointer}
            className="relative w-full mb-14 editorial-card overflow-hidden select-none"
        >
            <div className="px-4 sm:px-6 py-2.5 border-b border-white/[0.08] flex items-center justify-between tech-label text-text-muted">
                <span className="flex items-center gap-2 text-text-main">
                    <span className="w-1.5 h-1.5 bg-[#34d399] inline-block" />
                    <span>LIVE ASCII // PIXEL-MATRIX STAGE</span>
                </span>
                <span className="hidden sm:inline">SWEEP CURSOR ACROSS MATRIX TO INTERACT</span>
                <span className="text-text-main">60 FPS • HIGH-DPI</span>
            </div>

            <canvas
                ref={canvasRef}
                aria-label="Andrei Dilag — Interactive ASCII Pixel Matrix Banner"
                className="block w-full cursor-crosshair"
            />
        </div>
    );
};

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
            <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between">
                <span className="tech-label text-text-main flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#34d399] inline-block" />
                    <span>LIVE ARCHITECTURE SANDBOX</span>
                </span>
                <span className="tech-label text-text-muted">INTERACTIVE</span>
            </div>

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
        <section id="hero" className="py-20 sm:py-32 border-b border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                {/* Prominent Full-Bleed Live ASCII / Pixel-Matrix Hero Stage */}
                <LiveAsciiHeroCanvas />

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
                    <div className="lg:col-span-5">
                        <HeroArchitecturePreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
