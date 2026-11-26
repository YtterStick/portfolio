import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { soundEngine } from '../utils/soundEngine';

const PRESET_PROMPTS = [
    {
        id: 'summary',
        label: 'Summarize Andrei in 20s',
        question: 'Summarize Andrei Dilag in 20 seconds for a technical recruiter.',
        fallback:
            'Andrei Dilag is an IT Faculty Teacher at STI College Fairview (teaching Advanced Database & Network Technology 2 since Aug 2025) and a Full-Stack Engineer in Quezon City, Philippines (UTC+8). He builds production SaaS apps, OpenCV + GenAI assessment tools, and enterprise logistics/payroll systems—combining academic database rigor with fast full-stack execution.'
    },
    {
        id: 'tagalog',
        label: 'Sino si Andrei? (Tagalog)',
        question: 'Sino si Andrei Dilag at ano ang mga nagawa niyang system at experience? Sagutin sa Tagalog.',
        fallback:
            'Si Andrei Dilag ay isang IT Faculty Teacher sa STI College Fairview (nagtuturo ng Advanced Database & Network Technology 2 mula Agosto 2025) at isang Full-Stack Engineer mula Quezon City. Nakagawa na siya ng mga production system tulad ng Evalo (AI exam at OpenCV OMR scanner), Tactiq (multi-tenant business SaaS), AniVerse, StarWashPH, at HR TNA Payroll—at isa rin siyang Codefest Regional Champion at National Finalist.'
    },
    {
        id: 'evalo',
        label: 'How does Evalo OMR work?',
        question: 'How does Evalo’s OpenCV OMR scanner and 3-strike anti-cheat work?',
        fallback:
            'Evalo pairs Next.js 14 with a Python FastAPI + OpenCV computer-vision backend. Educators can generate exams via GenAI or manual authoring, enforce 3-strike fullscreen anti-cheat proctoring online, or scan physical bubble sheets where OpenCV applies perspective warp correction, decodes 6-digit Student IDs, and grades answers automatically.'
    },
    {
        id: 'teaching',
        label: 'What does he teach at STI?',
        question: 'What courses and topics does Andrei teach at STI College Fairview?',
        fallback:
            'At STI College Fairview (Aug 2025 – Present), Andrei teaches collegiate Advanced Database Systems and Network Technology 2—guiding BSIT students through relational schema normalization, B-Tree query indexing, transaction isolation, network routing/switching topologies, and full-stack capstone engineering.'
    },
    {
        id: 'why-hire',
        label: 'Why hire Andrei?',
        question: 'Why should an engineering team hire Andrei Dilag?',
        fallback:
            '1. Proven under pressure: Codefest Regional Cluster Champion (1st Place) & 32-Hour National Finalist.\n2. End-to-end ownership: Ships everything from database indexes and FastAPI/Spring Boot APIs to high-craft interactive UIs.\n3. Clear communicator: As an active IT Faculty instructor, he explains complex architecture clearly and elevates teammates.'
    }
];

function isFilipinoQuery(q) {
    return /\b(sino|ano|saan|paano|bakit|kailan|magkano|ilang|ilan|pwede|puwede|marunong|gagawa|gawa|turo|nagtuturo|trabaho|proyekto|kasanayan|karera|kumuha|makipag|tulungan|kamusta|kumusta|tagalog|filipino|ba|siya|niya|naman|po|yung|ung|mga|ng|sa)\b/i.test(
        q
    );
}

function localFallbackAnswer(raw) {
    const q = raw.toLowerCase();
    const tl = isFilipinoQuery(q);

    if (q.includes('evalo') || q.includes('omr') || q.includes('cheat') || q.includes('opencv') || q.includes('exam') || q.includes('quiz')) {
        return tl
            ? 'Ang Evalo (evalo-edu.vercel.app) ay AI assessment platform na ginawa ni Andrei gamit ang Next.js 14, FastAPI, PostgreSQL, at OpenCV. May 3-strike fullscreen anti-cheat proctoring ito at automatic OpenCV OMR bubble-sheet scanner na nagbabasa ng 6-digit Student ID at nagche-check ng papel na exam.'
            : PRESET_PROMPTS[2].fallback;
    }
    if (q.includes('tactiq') || q.includes('saas') || q.includes('crm') || q.includes('invoice')) {
        return tl
            ? 'Ang Tactiq (tactiq-web.onrender.com) ay multi-tenant Next.js at TypeScript business OS na pinagsasama ang client portals, CRM, invoicing (PHP / Asia-Manila), at kumpletong audit trail sa iisang workspace.'
            : 'Tactiq (tactiq-web.onrender.com) is Andrei’s multi-tenant Next.js & TypeScript business OS uniting isolated client portals, CRM pipelines, PHP/Asia-Manila invoicing, and full action audit trails inside one workspace.';
    }
    if (q.includes('starwash') || q.includes('laundry') || q.includes('spring') || q.includes('java')) {
        return tl
            ? 'Ang StarWashPH (starwashph.com) ay multi-branch laundry logistics at customer order tracking system na ginawa gamit ang Java Spring Boot, MongoDB, at React—nakabawas ito ng 40% sa manual admin work.'
            : 'StarWashPH (starwashph.com) is a Java Spring Boot, MongoDB, and React multi-branch laundry logistics platform that reduced manual administrative friction by 40% while adding live customer order tracking.';
    }
    if (q.includes('payroll') || q.includes('hr') || q.includes('php') || q.includes('mysql') || q.includes('sweldo')) {
        return tl
            ? 'Ang HR TNA Payroll ay PHP at MySQL payroll system na nag-o-automate ng time-and-attendance, overtime, buwis at statutory deductions, pati role-based audit logs.'
            : 'HR TNA Payroll is an enterprise PHP + MySQL time-and-attendance payroll engine automating statutory deductions, tax tables, overtime computation, and role-based compliance audit logs.';
    }
    if (q.includes('aniverse') || q.includes('anime') || q.includes('cloudflare')) {
        return tl
            ? 'Ang AniVerse (anime-verse-ytter.pages.dev) ay dark-mode anime discovery at streaming web app na naka-deploy sa Cloudflare Pages na may instant search at watchlist sync.'
            : 'AniVerse (anime-verse-ytter.pages.dev) is an edge-deployed dark-mode streaming & discovery web app on Cloudflare Pages featuring instant search filtering and persistent watchlist/episode sync.';
    }
    if (q.includes('sti') || q.includes('teach') || q.includes('faculty') || q.includes('professor') || q.includes('turo') || q.includes('network') || q.includes('database')) {
        return tl
            ? 'Sa STI College Fairview (mula Agosto 2025 hanggang ngayon), nagtuturo si Andrei ng Advanced Database Systems at Network Technology 2—tinuturuan niya ang mga estudyante sa SQL indexing, database normalization, networking, at full-stack capstone systems.'
            : PRESET_PROMPTS[3].fallback;
    }
    if (q.includes('award') || q.includes('champion') || q.includes('codefest') || q.includes('sap') || q.includes('cert') || q.includes('parangal')) {
        return tl
            ? 'Si Andrei ay STI Tagisan ng Talino Codefest Cluster Champion (1st Place Regional), 32-Hour App Challenge National Finalist, Campus Coding Champ honoree, at may SAP S/4HANA Certification.'
            : 'Andrei is a STI Tagisan ng Talino Codefest Cluster Champion (1st Place Regional), 32-Hour App Challenge National Finalist, Campus Coding Champ honoree, and holds SAP S/4HANA Certification.';
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('available') || q.includes('location') || q.includes('where') || q.includes('saan') || q.includes('makipag') || q.includes('kausap')) {
        return tl
            ? 'Nasa Quezon City, Metro Manila (UTC+8) si Andrei at bukas siya para sa mga full-stack/AI engineering roles, freelance, o consulting. Pwede siyang i-email direkta sa andreidilag12@gmail.com o i-click ang "Send direct message instead →" sa ibaba.'
            : 'Andrei is based in Quezon City, Metro Manila (UTC+8) and is open for full-stack/AI engineering roles, freelance builds, and consulting. Reach him directly at andreidilag12@gmail.com or click "Send direct message instead →" below.';
    }
    if (q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('gamit') || q.includes('alam') || q.includes('marunong')) {
        return tl
            ? 'Gumagamit si Andrei ng Next.js 14, React, TypeScript, Tailwind CSS, Python FastAPI, Java Spring Boot, PHP, OpenCV, GenAI/LLMs, n8n, at databases gaya ng PostgreSQL, MySQL, MongoDB, pati Cloudflare Pages at SAP S/4HANA.'
            : 'Frontend & SaaS: Next.js 14, React, TypeScript, Tailwind CSS, GSAP & Framer Motion.\nBackend & AI: Python FastAPI, Java Spring Boot, PHP, OpenCV OMR, GenAI / LLM pipelines, n8n & Copilot Studio.\nDatabases & Ops: PostgreSQL, MySQL, MongoDB, Cloudflare Pages, Docker, and SAP S/4HANA.';
    }

    return tl
        ? `${PRESET_PROMPTS[1].fallback}\n\nPara sa karagdagang tanong o proyekto, mag-email lang sa andreidilag12@gmail.com.`
        : `${PRESET_PROMPTS[0].fallback}\n\nFor custom project details or role discussions, email andreidilag12@gmail.com directly.`;
}

const AskAndreiModal = ({ open, onClose, onOpenInquiry }) => {
    const [activePrompt, setActivePrompt] = useState(PRESET_PROMPTS[0].label);
    const [fullAnswer, setFullAnswer] = useState(PRESET_PROMPTS[0].fallback);
    const [typed, setTyped] = useState('');
    const [loading, setLoading] = useState(false);
    const [modeTag, setModeTag] = useState('READY · EN / TAGALOG');
    const [input, setInput] = useState('');
    const timerRef = useRef(null);
    const abortRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        if (loading) return;
        clearInterval(timerRef.current);
        let idx = 0;
        setTyped('');
        timerRef.current = setInterval(() => {
            idx += 2;
            if (idx >= fullAnswer.length) {
                setTyped(fullAnswer);
                clearInterval(timerRef.current);
            } else {
                setTyped(fullAnswer.slice(0, idx));
            }
        }, 12);

        return () => clearInterval(timerRef.current);
    }, [open, fullAnswer, loading]);

    useEffect(() => {
        if (!open) {
            abortRef.current?.abort();
            setLoading(false);
        }
    }, [open]);

    if (!open || typeof document === 'undefined') return null;

    const queryAi = async (displayLabel, questionText, fallbackText) => {
        abortRef.current?.abort();
        const ctrl = new AbortController();
        abortRef.current = ctrl;

        clearInterval(timerRef.current);
        setActivePrompt(displayLabel);
        setLoading(true);
        setTyped('');
        setModeTag('QUERYING GEMINI AI...');

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: questionText }),
                signal: ctrl.signal
            });

            if (res.ok) {
                const data = await res.json();
                if (data?.answer) {
                    setModeTag(`GEMINI AI (${(data.model || 'FLASH').replace('gemini-', '').toUpperCase()}) · EN / TL`);
                    setFullAnswer(data.answer);
                    setLoading(false);
                    return;
                }
            }
        } catch (err) {
            if (err?.name === 'AbortError') return;
        }

        setModeTag('LOCAL BILINGUAL ENGINE · EN / TL');
        setFullAnswer(fallbackText || localFallbackAnswer(questionText));
        setLoading(false);
    };

    const askPreset = (p) => {
        soundEngine.playClick();
        queryAi(p.label, p.question, p.fallback);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;
        soundEngine.playClick();
        setInput('');
        queryAi(trimmed, trimmed, null);
    };

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Ask about Andrei"
            className="fixed inset-0 z-[360] flex items-end sm:items-center justify-center p-0 sm:p-8 bg-black/90 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-[#111111] text-[#ededed] border-t sm:border border-white/15 p-5 sm:p-8 max-h-[92dvh] overflow-y-auto sm:my-auto"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
            >
                <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4 mb-4 sm:mb-5">
                    <div className="min-w-0">
                        <span className="cryst-label block truncate">ANDREI.SYS — Live Recruiter Q&amp;A</span>
                        <span className="cryst-label dim text-[11px] block truncate">{modeTag}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            soundEngine.playClick();
                            onClose();
                        }}
                        className="cryst-label shrink-0 cursor-pointer py-1 px-2 hover:opacity-70"
                    >
                        Close ✕
                    </button>
                </div>

                {/* Preset prompt chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {PRESET_PROMPTS.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onMouseEnter={() => soundEngine.playHover()}
                            onClick={() => askPreset(p)}
                            className={`ask-chip ${activePrompt === p.label ? 'active' : ''}`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Streaming Terminal Output */}
                <div className="bg-[#0a0a0a] border border-white/15 p-4 sm:p-5 min-h-[165px] flex flex-col justify-between">
                    <div>
                        <p className="cryst-label dim mb-2">&gt; {activePrompt}</p>
                        {loading ? (
                            <p className="cryst-label text-white/75 animate-pulse py-2">
                                Computing response (English / Tagalog / Taglish)...
                            </p>
                        ) : (
                            <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line text-[#ededed]">
                                {typed}
                                {typed.length < fullAnswer.length && (
                                    <span className="inline-block w-2 h-4 bg-white ml-1 align-middle animate-pulse" />
                                )}
                            </p>
                        )}
                    </div>

                    {!loading && typed.length < fullAnswer.length && (
                        <button
                            type="button"
                            onClick={() => {
                                clearInterval(timerRef.current);
                                setTyped(fullAnswer);
                            }}
                            className="self-end cryst-label dim hover:text-white mt-3 cursor-pointer"
                        >
                            Skip typing ⇥
                        </button>
                    )}
                </div>

                {/* Custom Question Input (English / Tagalog / Taglish) */}
                <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask in English, Tagalog, or Taglish..."
                        className="flex-1 min-w-0 bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#6e6e6e] focus:outline-none focus:border-white"
                    />
                    <button type="submit" disabled={loading} className="pill-btn text-sm whitespace-nowrap disabled:opacity-50">
                        {loading ? '...' : 'Ask ↵'}
                    </button>
                </form>

                <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="cryst-label dim">Supports English, Tagalog &amp; Taglish questions</span>
                    <button
                        type="button"
                        onClick={() => {
                            soundEngine.playClick();
                            onClose();
                            onOpenInquiry?.();
                        }}
                        className="cryst-label underline cursor-pointer hover:opacity-75"
                    >
                        Send direct message instead →
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AskAndreiModal;
