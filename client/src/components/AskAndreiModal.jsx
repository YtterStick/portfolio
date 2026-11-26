import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { soundEngine } from '../utils/soundEngine';

const PRESET_PROMPTS = [
    {
        id: 'summary',
        label: 'Summarize Andrei in 20s',
        answer:
            'Andrei Dilag is an IT Faculty Teacher at STI College Fairview (teaching Advanced Database & Network Technology 2 since Aug 2025) and a Full-Stack Engineer in Quezon City, Philippines (UTC+8). He builds production SaaS apps, OpenCV + GenAI assessment tools, and enterprise logistics/payroll systems—combining academic database rigor with fast full-stack execution.'
    },
    {
        id: 'evalo',
        label: 'How does Evalo OMR work?',
        answer:
            'Evalo pairs Next.js 14 with a Python FastAPI + OpenCV computer-vision backend. Educators can generate exams via GenAI or manual authoring, enforce 3-strike fullscreen anti-cheat proctoring online, or scan physical bubble sheets where OpenCV applies perspective warp correction, decodes 6-digit Student IDs, and grades answers automatically.'
    },
    {
        id: 'teaching',
        label: 'What does he teach at STI?',
        answer:
            'At STI College Fairview (Aug 2025 – Present), Andrei teaches collegiate Advanced Database Systems and Network Technology 2—guiding BSIT students through relational schema normalization, B-Tree query indexing, transaction isolation, network routing/switching topologies, and full-stack capstone engineering.'
    },
    {
        id: 'stack',
        label: 'Core tech stack?',
        answer:
            'Frontend & SaaS: Next.js 14, React, TypeScript, Tailwind CSS, GSAP & Framer Motion.\nBackend & AI: Python FastAPI, Java Spring Boot, PHP, OpenCV OMR, GenAI / LLM pipelines, n8n & Copilot Studio.\nDatabases & Ops: PostgreSQL, MySQL, MongoDB, Cloudflare Pages, Docker, and SAP S/4HANA.'
    },
    {
        id: 'why-hire',
        label: 'Why hire Andrei?',
        answer:
            '1. Proven under pressure: Codefest Regional Cluster Champion (1st Place) & 32-Hour National Finalist.\n2. End-to-end ownership: Ships everything from database indexes and FastAPI/Spring Boot APIs to high-craft interactive UIs.\n3. Clear communicator: As an active IT Faculty instructor, he explains complex architecture clearly and elevates teammates.'
    }
];

function matchCustomQuestion(raw) {
    const q = raw.toLowerCase();
    if (q.includes('evalo') || q.includes('omr') || q.includes('cheat') || q.includes('opencv')) {
        return PRESET_PROMPTS[1].answer;
    }
    if (q.includes('tactiq') || q.includes('saas') || q.includes('crm') || q.includes('invoice')) {
        return 'Tactiq (tactiq-web.onrender.com) is Andrei’s multi-tenant Next.js & TypeScript business OS uniting isolated client portals, CRM pipelines, PHP/Asia-Manila invoicing, and full action audit trails inside one workspace.';
    }
    if (q.includes('starwash') || q.includes('laundry') || q.includes('spring') || q.includes('java')) {
        return 'StarWashPH (starwashph.com) is a Java Spring Boot, MongoDB, and React multi-branch laundry logistics platform that reduced manual administrative friction by 40% while adding live customer order tracking.';
    }
    if (q.includes('payroll') || q.includes('hr') || q.includes('php') || q.includes('mysql')) {
        return 'HR TNA Payroll is an enterprise PHP + MySQL time-and-attendance payroll engine automating statutory deductions, tax tables, overtime computation, and role-based compliance audit logs.';
    }
    if (q.includes('aniverse') || q.includes('anime') || q.includes('cloudflare')) {
        return 'AniVerse (anime-verse-ytter.pages.dev) is an edge-deployed dark-mode streaming & discovery web app on Cloudflare Pages featuring instant search filtering and persistent watchlist/episode sync.';
    }
    if (q.includes('sti') || q.includes('teach') || q.includes('faculty') || q.includes('professor') || q.includes('network') || q.includes('database')) {
        return PRESET_PROMPTS[2].answer;
    }
    if (q.includes('award') || q.includes('champion') || q.includes('codefest') || q.includes('sap') || q.includes('cert')) {
        return 'Andrei is a STI Tagisan ng Talino Codefest Cluster Champion (1st Place Regional), 32-Hour App Challenge National Finalist, Campus Coding Champ honoree, and holds SAP S/4HANA Certification.';
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('available') || q.includes('location') || q.includes('where')) {
        return 'Andrei is based in Quezon City, Metro Manila (UTC+8) and is open for full-stack/AI engineering roles, freelance builds, and consulting. Reach him directly at andreidilag12@gmail.com or click "Open inquiry form" below.';
    }
    if (q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('tech')) {
        return PRESET_PROMPTS[3].answer;
    }
    return `${PRESET_PROMPTS[0].answer}\n\nFor custom project details or role discussions, email andreidilag12@gmail.com directly.`;
}

const AskAndreiModal = ({ open, onClose, onOpenInquiry }) => {
    const [activePrompt, setActivePrompt] = useState(PRESET_PROMPTS[0].label);
    const [fullAnswer, setFullAnswer] = useState(PRESET_PROMPTS[0].answer);
    const [typed, setTyped] = useState('');
    const [input, setInput] = useState('');
    const timerRef = useRef(null);

    useEffect(() => {
        if (!open) return;
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
        }, 14);

        return () => clearInterval(timerRef.current);
    }, [open, fullAnswer]);

    if (!open || typeof document === 'undefined') return null;

    const askPreset = (p) => {
        soundEngine.playClick();
        setActivePrompt(p.label);
        setFullAnswer(`${p.answer}`);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        soundEngine.playClick();
        setActivePrompt(trimmed);
        setFullAnswer(matchCustomQuestion(trimmed));
        setInput('');
    };

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Ask about Andrei"
            className="fixed inset-0 z-[360] flex items-center justify-center p-4 sm:p-8 bg-black/90 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-[#111111] text-[#ededed] border border-white/15 p-6 sm:p-8 my-auto"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
            >
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                    <span className="cryst-label">ANDREI.SYS — Instant Recruiter Q&amp;A</span>
                    <button
                        type="button"
                        onClick={() => {
                            soundEngine.playClick();
                            onClose();
                        }}
                        className="cryst-label cursor-pointer hover:opacity-70"
                    >
                        Close [ESC]
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
                <div className="bg-[#0a0a0a] border border-white/15 p-4 sm:p-5 min-h-[150px] flex flex-col justify-between">
                    <div>
                        <p className="cryst-label dim mb-2">&gt; {activePrompt}</p>
                        <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line text-[#ededed]">
                            {typed}
                            {typed.length < fullAnswer.length && (
                                <span className="inline-block w-2 h-4 bg-white ml-1 align-middle animate-pulse" />
                            )}
                        </p>
                    </div>

                    {typed.length < fullAnswer.length && (
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

                {/* Custom Question Input */}
                <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Evalo, Tactiq, teaching at STI, stack, or availability..."
                        className="flex-1 bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder-[#6e6e6e] focus:outline-none focus:border-white"
                    />
                    <button type="submit" className="pill-btn text-sm whitespace-nowrap">
                        Ask ↵
                    </button>
                </form>

                <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="cryst-label dim">Grounded in Andrei’s verified resume &amp; systems</span>
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
