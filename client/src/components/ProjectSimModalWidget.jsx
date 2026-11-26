import { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

const ANSWER_KEY = ['B', 'D', 'A', 'C', 'B'];
const OPTIONS = ['A', 'B', 'C', 'D'];

const EvaloSim = () => {
    const [tab, setTab] = useState('omr');
    const [bubbles, setBubbles] = useState(['B', 'D', 'A', 'C', 'B']);
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState({ graded: true, score: 5, ms: 14 });

    const [strikes, setStrikes] = useState(0);
    const [logs, setLogs] = useState(['Session initialized · Fullscreen enforced']);

    const toggleBubble = (qIdx, opt) => {
        soundEngine.playClick();
        const next = [...bubbles];
        next[qIdx] = opt;
        setBubbles(next);
        setScanResult(null);
    };

    const runOmrScan = () => {
        if (scanning) return;
        soundEngine.playClick();
        setScanning(true);
        setTimeout(() => {
            const score = bubbles.reduce((acc, b, idx) => acc + (b === ANSWER_KEY[idx] ? 1 : 0), 0);
            setScanning(false);
            setScanResult({
                graded: true,
                score,
                ms: 11 + Math.floor(Math.random() * 7)
            });
            soundEngine.playShockwave();
        }, 620);
    };

    const triggerViolation = (type) => {
        if (strikes >= 3) return;
        soundEngine.playClick();
        const next = strikes + 1;
        setStrikes(next);
        const stamp = new Date().toTimeString().slice(0, 8);
        setLogs((prev) => [
            next >= 3
                ? `[${stamp}] ${type} → STRIKE 3/3 · EXAM AUTO-SUBMITTED`
                : `[${stamp}] ${type} intercepted → Warning ${next}/3`,
            ...prev.slice(0, 3)
        ]);
    };

    const resetProctor = () => {
        soundEngine.playClick();
        setStrikes(0);
        setLogs(['Session reset · Fullscreen lock active']);
    };

    return (
        <div className="sim-box">
            <div className="sim-head">
                <span className="cryst-label">Interactive sandbox — Try Evalo’s core engines</span>
                <div className="sim-tabs">
                    <button
                        type="button"
                        className={tab === 'omr' ? 'active' : ''}
                        onClick={() => {
                            soundEngine.playClick();
                            setTab('omr');
                        }}
                    >
                        01 OpenCV OMR
                    </button>
                    <button
                        type="button"
                        className={tab === 'proctor' ? 'active' : ''}
                        onClick={() => {
                            soundEngine.playClick();
                            setTab('proctor');
                        }}
                    >
                        02 3-Strike Proctor
                    </button>
                </div>
            </div>

            {tab === 'omr' ? (
                <div className="sim-body">
                    <div className={`omr-sheet ${scanning ? 'scanning' : ''}`}>
                        <div className="omr-laser" aria-hidden="true" />
                        <div className="omr-top">
                            <span>STUDENT_ID: 2026-0148</span>
                            <span>PERSPECTIVE WARP: LOCKED [⌜⌝⌞⌟]</span>
                        </div>
                        <div className="omr-rows">
                            {bubbles.map((picked, qIdx) => (
                                <div key={qIdx} className="omr-row">
                                    <span className="omr-q">Q0{qIdx + 1}</span>
                                    <div className="omr-opts">
                                        {OPTIONS.map((opt) => {
                                            const filled = picked === opt;
                                            const isRight = scanResult && ANSWER_KEY[qIdx] === opt;
                                            const isWrong = scanResult && filled && ANSWER_KEY[qIdx] !== opt;
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => toggleBubble(qIdx, opt)}
                                                    className={`omr-bubble ${filled ? 'filled' : ''} ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sim-foot">
                        <button type="button" className="pill-btn text-xs" onClick={runOmrScan}>
                            {scanning ? 'Scanning sheet...' : 'Scan & grade OMR sheet ↗'}
                        </button>
                        <span className="sim-readout">
                            {scanResult
                                ? `SCORE: ${scanResult.score}/5 (${Math.round((scanResult.score / 5) * 100)}%) · ${scanResult.ms}ms OpenCV`
                                : 'Click any bubble to edit, then scan'}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="sim-body">
                    <div className="proctor-bar">
                        <span>STATUS: {strikes >= 3 ? 'LOCKED & AUTO-SUBMITTED' : 'FULLSCREEN ACTIVE'}</span>
                        <span>STRIKES: {strikes} / 3</span>
                    </div>
                    <div className="proctor-pips">
                        {[1, 2, 3].map((n) => (
                            <span key={n} className={`proctor-pip ${strikes >= n ? 'hit' : ''}`}>
                                STRIKE 0{n}
                            </span>
                        ))}
                    </div>
                    <div className="proctor-logs">
                        {logs.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                    <div className="sim-foot">
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                disabled={strikes >= 3}
                                className="pill-btn text-xs disabled:opacity-40"
                                onClick={() => triggerViolation('ALT+TAB')}
                            >
                                Simulate Alt+Tab
                            </button>
                            <button
                                type="button"
                                disabled={strikes >= 3}
                                className="pill-btn text-xs disabled:opacity-40"
                                onClick={() => triggerViolation('ESC / BLUR')}
                            >
                                Simulate Window Blur
                            </button>
                            {strikes > 0 && (
                                <button type="button" className="cryst-label underline px-2" onClick={resetProctor}>
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TactiqSim = () => {
    const TENANTS = [
        { id: 'acme', name: 'Acme Creative PH', rev: 148500, clients: 12 },
        { id: 'north', name: 'Northstar Ops', rev: 292000, clients: 24 }
    ];
    const [tenantIdx, setTenantIdx] = useState(0);
    const [extraInvoices, setExtraInvoices] = useState(0);
    const tenant = TENANTS[tenantIdx];

    return (
        <div className="sim-box">
            <div className="sim-head">
                <span className="cryst-label">Interactive sandbox — Multi-tenant isolation</span>
                <div className="sim-tabs">
                    {TENANTS.map((t, idx) => (
                        <button
                            key={t.id}
                            type="button"
                            className={tenantIdx === idx ? 'active' : ''}
                            onClick={() => {
                                soundEngine.playClick();
                                setTenantIdx(idx);
                                setExtraInvoices(0);
                            }}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="sim-body">
                <div className="grid grid-cols-3 gap-3 text-xs font-mono border border-white/10 p-3.5 bg-black/50">
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">TENANT_ID</span>
                        <span>ws_{tenant.id}_mnl</span>
                    </div>
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">PORTAL VOLUME (PHP)</span>
                        <span>₱{(tenant.rev + extraInvoices * 18500).toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">ACTIVE CLIENTS</span>
                        <span>{tenant.clients + extraInvoices} isolated</span>
                    </div>
                </div>
                <div className="sim-foot">
                    <button
                        type="button"
                        className="pill-btn text-xs"
                        onClick={() => {
                            soundEngine.playClick();
                            setExtraInvoices((n) => n + 1);
                        }}
                    >
                        + Issue ₱18,500 invoice (audit logged)
                    </button>
                    <span className="sim-readout">
                        {extraInvoices > 0
                            ? `${extraInvoices} new invoice(s) logged under ws_${tenant.id}_mnl · Asia/Manila`
                            : 'Switch tenants or issue an invoice'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const AniVerseSim = () => {
    const [ep, setEp] = useState(7);
    const [ping, setPing] = useState(9);

    return (
        <div className="sim-box">
            <div className="sim-head">
                <span className="cryst-label">Interactive sandbox — Edge watchlist sync</span>
                <span className="sim-readout">CF-RAY · MNL EDGE ({ping}ms)</span>
            </div>
            <div className="sim-body">
                <div className="flex items-center justify-between border border-white/10 p-3.5 bg-black/50 text-xs font-mono">
                    <span>SOLO LEVELING S2 · WATCHLIST SYNCED</span>
                    <span>EPISODE {String(ep).padStart(2, '0')} / 13</span>
                </div>
                <div className="sim-foot">
                    <button
                        type="button"
                        className="pill-btn text-xs"
                        onClick={() => {
                            soundEngine.playClick();
                            setEp((e) => (e >= 13 ? 1 : e + 1));
                            setPing(7 + Math.floor(Math.random() * 6));
                        }}
                    >
                        Sync next episode →
                    </button>
                    <span className="sim-readout">Edge state persisted · Zero popup latency</span>
                </div>
            </div>
        </div>
    );
};

const StarWashSim = () => {
    const STAGES = ['01 Received (Fairview)', '02 Wash & Sanitise', '03 Dry & Fold', '04 Ready for Pickup ✓'];
    const [step, setStep] = useState(1);

    return (
        <div className="sim-box">
            <div className="sim-head">
                <span className="cryst-label">Interactive sandbox — Multi-branch batch dispatch</span>
                <span className="sim-readout">BATCH #SW-4092</span>
            </div>
            <div className="sim-body">
                <div className="proctor-pips">
                    {STAGES.map((label, idx) => (
                        <span key={label} className={`proctor-pip ${ idx <= step ? 'hit' : ''}`}>
                            {label}
                        </span>
                    ))}
                </div>
                <div className="sim-foot">
                    <button
                        type="button"
                        className="pill-btn text-xs"
                        onClick={() => {
                            soundEngine.playClick();
                            setStep((s) => (s + 1) % STAGES.length);
                        }}
                    >
                        Advance batch status →
                    </button>
                    <span className="sim-readout">Customer portal + branch dashboard updated live</span>
                </div>
            </div>
        </div>
    );
};

const PayrollSim = () => {
    const [otHours, setOtHours] = useState(4);
    const basePay = 32000;
    const otPay = otHours * 265;
    const deductions = 3420;
    const netPay = basePay + otPay - deductions;

    return (
        <div className="sim-box">
            <div className="sim-head">
                <span className="cryst-label">Interactive sandbox — TNA to net-pay engine</span>
                <div className="sim-tabs">
                    {[0, 4, 8, 12].map((h) => (
                        <button
                            key={h}
                            type="button"
                            className={otHours === h ? 'active' : ''}
                            onClick={() => {
                                soundEngine.playClick();
                                setOtHours(h);
                            }}
                        >
                            +{h}h OT
                        </button>
                    ))}
                </div>
            </div>
            <div className="sim-body">
                <div className="grid grid-cols-3 gap-3 text-xs font-mono border border-white/10 p-3.5 bg-black/50">
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">GROSS + OT</span>
                        <span>₱{(basePay + otPay).toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">TAX &amp; STATUTORY</span>
                        <span>-₱{deductions.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="block text-[#8f8f8f] text-[10px]">VERIFIED NET PAY</span>
                        <span>₱{netPay.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectSimModalWidget = ({ project }) => {
    if (!project) return null;
    if (project._id === '1') return <EvaloSim />;
    if (project._id === '2') return <TactiqSim />;
    if (project._id === '3') return <AniVerseSim />;
    if (project._id === '4') return <StarWashSim />;
    return <PayrollSim />;
};

export default ProjectSimModalWidget;
