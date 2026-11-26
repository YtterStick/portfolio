import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import AsciiWordmark from '../components/AsciiWordmark';
import AsciiPortrait from '../components/AsciiPortrait';
import BgAsciiCanvas from '../components/BgAsciiCanvas';
import RocketScroll from '../components/RocketScroll';
import ProjectSimModalWidget from '../components/ProjectSimModalWidget';
import AskAndreiModal from '../components/AskAndreiModal';
import { useScroll } from '../context/ScrollContext';
import { projectsData } from '../data/projects';
import { soundEngine } from '../utils/soundEngine';
import { scrambleElementText, attachMagneticMove, resetMagneticMove } from '../utils/scramble';

gsap.registerPlugin(ScrollTrigger);

function splitWordsOrLines(el, mask) {
    if (!el || el.dataset.splitDone === '1') {
        return mask ? el?.querySelectorAll('.ln > span') : el?.querySelectorAll('.w');
    }
    el.dataset.splitDone = '1';
    const walk = (node) => {
        Array.from(node.childNodes).forEach((k) => {
            if (k.nodeType === 3) {
                const frag = document.createDocumentFragment();
                k.textContent.split(/(\s+)/).forEach((w) => {
                    if (!w) return;
                    if (/^\s+$/.test(w)) {
                        frag.appendChild(document.createTextNode(' '));
                        return;
                    }
                    const inner = document.createElement('span');
                    inner.textContent = w;
                    if (mask) {
                        const outer = document.createElement('span');
                        outer.className = 'ln';
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                    } else {
                        inner.className = 'w';
                        frag.appendChild(inner);
                    }
                });
                node.replaceChild(frag, k);
            } else if (k.nodeType === 1) {
                walk(k);
            }
        });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    return mask ? el.querySelectorAll('.ln > span') : el.querySelectorAll('.w');
}

const HIGHLIGHTS = [
    {
        num: '01',
        title: 'Codefest Cluster Champion',
        sub: 'STI Tagisan ng Talino · 1st Place Regional',
        img: '/codefest-champ.jpg',
        link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955'
    },
    {
        num: '02',
        title: 'National Finalist Stage',
        sub: 'STI Education Services · 32-Hour App Challenge',
        img: '/codefest-national-award.jpg',
        link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
    },
    {
        num: '03',
        title: 'National Entrant Delegation',
        sub: 'STI College Fairview · Championship Team',
        img: '/codefest-champion-again.jpg',
        link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
    },
    {
        num: '04',
        title: 'Campus Coding Champ Feature',
        sub: 'BSIT Recognition · STI Fairview',
        img: '/recognition-andrei.jpg',
        link: 'https://www.facebook.com/fairview.sti.edu/posts/-meet-%F0%9D%90%80%F0%9D%90%A7%F0%9D%90%9D%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A2-%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%A0-our-coding-champ-and-2nd-year-bs-in-information-technology-st/892945256201528/'
    }
];

const Home = () => {
    const rootRef = useRef(null);
    const loaderRef = useRef(null);
    const shipRef = useRef(null);
    const plumeRef = useRef(null);
    const cursorRef = useRef(null);
    const heroWordRef = useRef(null);

    const [loaderDone, setLoaderDone] = useState(false);
    const [copied, setCopied] = useState(false);
    const [lightbox, setLightbox] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [inquiryOpen, setInquiryOpen] = useState(false);
    const [askOpen, setAskOpen] = useState(false);
    const [hoveredMore, setHoveredMore] = useState(null);
    const morePreviewRef = useRef(null);

    // Inquiry modal form state
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [formToast, setFormToast] = useState('');

    const { lenis } = useScroll();

    const flagshipProjects = projectsData.slice(0, 3);
    const moreProjects = projectsData.slice(3);

    // Custom difference cursor + floating "More systems" image follower (desktop fine pointer only)
    useEffect(() => {
        const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (!fine || reduced || !cursorRef.current) return;

        const c = cursorRef.current;
        document.documentElement.classList.add('has-cursor');
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let px = x;
        let py = y;
        let tx = x;
        let ty = y;
        let animId = 0;
        let burstTimer = 0;

        const onMove = (e) => {
            tx = e.clientX;
            ty = e.clientY;
            const t = e.target?.closest ? e.target : null;
            const view = t && t.closest('.ov, .dz-ph, .photo-bw');
            const link = !view && t && t.closest('a, button');
            c.classList.toggle('view', !!view);
            c.classList.toggle('link', !!link);
        };

        const onDown = (e) => {
            if (e.target?.closest?.('.hero') && !e.target?.closest?.('a, button')) {
                c.classList.add('burst');
                clearTimeout(burstTimer);
                burstTimer = window.setTimeout(() => c.classList.remove('burst'), 360);
            }
        };

        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerdown', onDown, { passive: true });
        const loop = () => {
            x += (tx - x) * 0.22;
            y += (ty - y) * 0.22;
            c.style.transform = `translate3d(${x}px,${y}px,0)`;

            if (morePreviewRef.current) {
                const vx = (tx - px) * 0.14;
                px += (tx - px) * 0.14;
                py += (ty - py) * 0.14;
                const tilt = Math.max(-6, Math.min(6, vx * 0.35));
                morePreviewRef.current.style.transform = `translate3d(${px + 26}px, ${py - 95}px, 0) rotate(${tilt.toFixed(2)}deg)`;
            }

            animId = requestAnimationFrame(loop);
        };
        animId = requestAnimationFrame(loop);

        return () => {
            clearTimeout(burstTimer);
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerdown', onDown);
            cancelAnimationFrame(animId);
            document.documentElement.classList.remove('has-cursor');
        };
    }, []);

    // Loader -> Intro + GSAP ScrollTrigger Animations
    useEffect(() => {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        window.scrollTo(0, 0);

        if (reduced) {
            document.body.classList.remove('is-loading');
            setLoaderDone(true);
            heroWordRef.current?.startIntro?.();
            return () => {
                document.body.classList.remove('inverted');
                document.body.classList.remove('is-loading');
            };
        }

        document.body.classList.add('is-loading');

        const ctx = gsap.context(() => {
            // 1. Fast Spaceship Launch Loader (~0.88s total, portal above all headers)
            if (loaderRef.current && shipRef.current && plumeRef.current) {
                const tl = gsap.timeline();
                gsap.set(shipRef.current, { y: 18, scale: 0.9, opacity: 0 });
                gsap.set(plumeRef.current, { scaleY: 0.25, opacity: 0 });

                // Quick ignition
                tl.to(shipRef.current, {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.22,
                    ease: 'power2.out'
                }, 0)
                .to(plumeRef.current, {
                    scaleY: 1.15,
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                }, 0.04)
                // Launch straight upward!
                .to(plumeRef.current, {
                    scaleY: 3.4,
                    duration: 0.42,
                    ease: 'power3.in'
                }, 0.22)
                .to(shipRef.current, {
                    y: () => -window.innerHeight * 0.72,
                    duration: 0.44,
                    ease: 'power3.in'
                }, 0.22)
                // Trigger hero 3D ASCII + lift curtain right in the rocket's wake
                .add(() => {
                    heroWordRef.current?.startIntro?.();
                }, 0.3)
                .to(loaderRef.current, {
                    yPercent: -100,
                    duration: 0.54,
                    ease: 'expo.inOut',
                    onStart: () => {
                        setTimeout(() => {
                            document.body.classList.remove('is-loading');
                        }, 180);
                    },
                    onComplete: () => {
                        document.body.classList.remove('is-loading');
                        setLoaderDone(true);
                    }
                }, 0.34)
                .add(() => {
                    const lede = rootRef.current?.querySelector('.hero-lede');
                    if (lede) {
                        const spans = splitWordsOrLines(lede, true);
                        if (spans?.length) {
                            gsap.from(spans, {
                                yPercent: 115,
                                duration: 1.05,
                                ease: 'expo.out',
                                stagger: 0.03
                            });
                        }
                    }
                    gsap.from('.hero-meta p', {
                        y: 16,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'expo.out',
                        stagger: 0.06
                    });
                }, 0.48);
            } else {
                document.body.classList.remove('is-loading');
                setLoaderDone(true);
                heroWordRef.current?.startIntro?.();
            }

            // 2. Hero pin + 3D ASCII scatter on scroll (brisker pin travel on mobile)
            const isMobileViewport = window.innerWidth < 768;
            ScrollTrigger.create({
                trigger: '.hero',
                start: 'top top',
                end: isMobileViewport ? '+=65%' : '+=110%',
                pin: true,
                scrub: true,
                onUpdate: (s) => {
                    heroWordRef.current?.setExplode?.(s.progress);
                }
            });

            gsap.to('.hero-meta, .hero-foot', {
                opacity: 0,
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '+=45%',
                    scrub: true
                }
            });

            // 3. Statement word-by-word scrubbed opacity reveal
            rootRef.current?.querySelectorAll('[data-words]').forEach((el) => {
                const w = splitWordsOrLines(el, false);
                if (w?.length) {
                    gsap.fromTo(
                        w,
                        { opacity: 0.12 },
                        {
                            opacity: 1,
                            ease: 'none',
                            stagger: 0.1,
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 78%',
                                end: 'bottom 45%',
                                scrub: true
                            }
                        }
                    );
                }
            });

            // 4. Masked line reveals [data-lines]
            rootRef.current?.querySelectorAll('[data-lines]').forEach((el) => {
                const w = splitWordsOrLines(el, true);
                if (w?.length) {
                    gsap.from(w, {
                        yPercent: 115,
                        duration: 1.3,
                        ease: 'expo.out',
                        stagger: 0.05,
                        scrollTrigger: { trigger: el, start: 'top 88%' }
                    });
                }
            });

            // 5. Section headers, body copy, lists
            gsap.utils.toArray('.sec-head, .about-text .body-copy, .contact-row, .mail, .statement .cryst-label, .more > .cryst-label').forEach((el) => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 1.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: el, start: 'top 90%' }
                });
            });

            gsap.utils.toArray('.more-list li, .facts div, .svc li').forEach((el) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: el, start: 'top 92%' }
                });
            });

            // 6. Portrait clip-path unclip on scroll
            gsap.utils.toArray('[data-reveal-img]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { clipPath: 'inset(14% 12% 14% 12%)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 95%',
                            end: 'top 35%',
                            scrub: true
                        }
                    }
                );
            });

            // 7. Full-bleed Work overlays (.ov): zoom settle + parallax drift
            gsap.utils.toArray('.ov').forEach((ov) => {
                const im = ov.querySelector('.ov-img');
                if (im) {
                    gsap.fromTo(
                        im,
                        { scale: 1.18 },
                        {
                            scale: 1,
                            ease: 'none',
                            scrollTrigger: { trigger: ov, start: 'top bottom', end: 'top top', scrub: true }
                        }
                    );
                    gsap.fromTo(
                        im,
                        { yPercent: -6 },
                        {
                            yPercent: 6,
                            ease: 'none',
                            scrollTrigger: { trigger: ov, start: 'top bottom', end: 'bottom top', scrub: true }
                        }
                    );
                }
                const kids = ov.querySelectorAll('.ov-top > *, .ov-text > *');
                if (kids.length) {
                    gsap.from(kids, {
                        y: 24,
                        opacity: 0,
                        duration: 1.1,
                        ease: 'expo.out',
                        stagger: 0.07,
                        scrollTrigger: { trigger: ov, start: 'top 55%' }
                    });
                }
            });

            // 8. Highlights / Recognition alternating pieces (.dz-item)
            gsap.utils.toArray('.dz-item').forEach((it) => {
                const txKids = it.querySelectorAll('.dz-tx > *');
                if (txKids.length) {
                    gsap.from(txKids, {
                        y: 40,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'expo.out',
                        stagger: 0.08,
                        scrollTrigger: { trigger: it, start: 'top 80%' }
                    });
                }
                const ph = it.querySelector('.dz-ph');
                if (ph) {
                    gsap.fromTo(
                        ph,
                        { clipPath: 'inset(12% 0% 12% 0%)' },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            ease: 'none',
                            scrollTrigger: { trigger: it, start: 'top 95%', end: 'top 40%', scrub: true }
                        }
                    );
                    const img = ph.querySelector('img');
                    if (img) {
                        gsap.fromTo(
                            img,
                            { scale: 1.2 },
                            {
                                scale: 1,
                                ease: 'none',
                                scrollTrigger: { trigger: it, start: 'top bottom', end: 'bottom 40%', scrub: true }
                            }
                        );
                    }
                }
            });

            // 9. Services Smooth Full-Page Color Inversion
            ScrollTrigger.create({
                trigger: '#services',
                start: 'top 55%',
                end: 'bottom 45%',
                onToggle: (s) => {
                    document.body.classList.toggle('inverted', s.isActive);
                    soundEngine.playInvert(s.isActive);
                    heroWordRef.current?.render?.();
                }
            });
        }, rootRef);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);
        const loadSafetyTimer = setTimeout(() => {
            document.body.classList.remove('is-loading');
            setLoaderDone(true);
            heroWordRef.current?.startIntro?.();
        }, 1400);

        return () => {
            clearTimeout(refreshTimer);
            clearTimeout(loadSafetyTimer);
            ctx.revert();
            document.body.classList.remove('inverted');
            document.body.classList.remove('is-loading');
        };
    }, []);

    // Modal & Lightbox ESC + scroll lock + navbar "Ask AI" event
    useEffect(() => {
        const anyOpen = !!(lightbox || selectedProject || inquiryOpen || askOpen);
        if (anyOpen) {
            lenis?.stop?.();
        } else {
            lenis?.start?.();
        }
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setLightbox(null);
                setSelectedProject(null);
                setInquiryOpen(false);
                setAskOpen(false);
            }
        };
        const onOpenAsk = () => setAskOpen(true);
        window.addEventListener('keydown', onKey);
        window.addEventListener('open-ask-andrei', onOpenAsk);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('open-ask-andrei', onOpenAsk);
        };
    }, [lightbox, selectedProject, inquiryOpen, askOpen, lenis]);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('andreidilag12@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = 'mailto:andreidilag12@gmail.com';
        }
    };

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        const trimmed = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim()
        };
        if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
            setFormToast('Please fill out all fields.');
            return;
        }
        setFormStatus('sending');
        setFormToast('');

        const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT || import.meta.env.NEXT_PUBLIC_FORM_ENDPOINT || '').trim();
        const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

        if (FORM_ENDPOINT) {
            try {
                const res = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(trimmed)
                });
                if (res.ok) {
                    setFormStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    return;
                }
            } catch {
                // fallback
            }
        }

        if (API_BASE) {
            try {
                const res = await axios.post(`${API_BASE}/api/inquiries`, trimmed, { timeout: 7000 });
                if (res.status >= 200 && res.status < 300) {
                    setFormStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    return;
                }
            } catch {
                // fallback
            }
        }

        try {
            const fallbackRes = await fetch('https://formsubmit.co/ajax/andreidilag12@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: trimmed.name,
                    email: trimmed.email,
                    _subject: `New Portfolio Message: ${trimmed.subject} from ${trimmed.name}`,
                    message: trimmed.message
                })
            });
            const data = await fallbackRes.json();
            if (fallbackRes.ok && (data.success === true || data.success === 'true' || data.message)) {
                setFormStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                return;
            }
        } catch {
            // fallback
        }

        setFormStatus('error');
        setFormToast('Automated delivery was blocked — click "Open Mail App" below.');
    };

    const cleanHost = (url) => {
        if (!url || url === '#') return 'Case study';
        try {
            return `${new URL(url).hostname.replace(/^www\./, '')} ↗`;
        } catch {
            return 'Live ↗';
        }
    };

    return (
        <div ref={rootRef}>
            {/* Ambient Blinking ASCII Grid */}
            <BgAsciiCanvas />

            {/* Minimalist Interactive Rocket Scroll Rail */}
            <RocketScroll />

            {/* Floating Cursor Preview for "More systems" rows */}
            <div
                ref={morePreviewRef}
                className={`more-float-preview ${hoveredMore ? 'active' : ''}`}
                aria-hidden="true"
            >
                <div className="more-float-inner">
                    {moreProjects.map((proj, idx) => (
                        <div
                            key={proj._id}
                            className={`more-float-slide ${hoveredMore?._id === proj._id ? 'visible' : ''}`}
                        >
                            <img src={proj.image} alt="" />
                            <div className="more-float-meta">
                                <span>0{idx + 4} — {proj.title}</span>
                                <span>{proj.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Difference Cursor */}
            <div ref={cursorRef} className="cryst-cursor" aria-hidden="true">
                <span>View</span>
            </div>

            {/* Fast Spaceship Launch Loader (Portal on body -> strictly above Navbar & headers) */}
            {!loaderDone && typeof document !== 'undefined' && createPortal(
                <div ref={loaderRef} className="loader" aria-hidden="true">
                    <div ref={shipRef} className="loader-ship">
                        <svg width="36" height="46" viewBox="0 0 24 30" fill="none">
                            <path
                                d="M12 2C12 2 6.8 8.2 6.8 16.5V21.5L4 24.4V26.2L8 24.7H16L20 26.2V24.4L17.2 21.5V16.5C17.2 8.2 12 2 12 2Z"
                                fill="#0a0a0a"
                                stroke="#ededed"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <circle cx="12" cy="12.5" r="2.1" fill="#ededed" />
                        </svg>
                        <div ref={plumeRef} className="loader-plume">
                            <span className="loader-flame" />
                            <span className="loader-sparks">
                                <span>*</span>
                                <span>+</span>
                                <span>:</span>
                            </span>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ============ HERO ============ */}
            <section className="hero" id="top">
                <div className="hero-meta">
                    <p>IT Faculty &amp; Full-Stack Engineer</p>
                    <p className="hide-sm">Quezon City, Philippines</p>
                    <p>Open for projects &amp; roles</p>
                </div>

                <h1 className="hero-title">
                    <span className="sr-only">ANDREI DILAG</span>
                    <AsciiWordmark ref={heroWordRef} lines={['ANDREI', 'DILAG']} stagger />
                </h1>

                <div className="hero-foot">
                    <p className="hero-lede">
                        I build web apps, AI platforms and enterprise tools <em>that real teams rely on.</em>
                    </p>
                </div>
            </section>

            {/* ============ (01) STATEMENT ============ */}
            <section className="statement">
                <p className="cryst-label">(01) Hello</p>
                <p className="big" data-words>
                    IT Faculty Teacher at STI College Fairview and Full-Stack Engineer. I turn complex operational problems into scalable software — from database indexing and AI proctoring to live multi-tenant SaaS platforms.
                </p>
            </section>

            {/* ============ (02) WORK ============ */}
            <section className="work" id="work">
                <div className="sec-head">
                    <p className="cryst-label">(02) Selected work</p>
                    <p className="cryst-label dim">3 featured — 2 more below</p>
                </div>

                {flagshipProjects.map((project, idx) => (
                    <figure
                        key={project._id}
                        className="ov"
                        onClick={() => {
                            soundEngine.playClick();
                            setSelectedProject(project);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Inspect ${project.title} case study`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedProject(project);
                            }
                        }}
                    >
                        <div className="ov-img">
                            <img
                                src={project.image}
                                alt={`${project.title} interface`}
                                loading="lazy"
                            />
                        </div>
                        <div className="ov-top cryst-label">
                            <span>0{idx + 1} — {project.category}</span>
                            <span className="ov-mid">{project.highlight}</span>
                            {project.liveLink && project.liveLink !== '#' ? (
                                <a
                                    className="ov-link"
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        soundEngine.playClick();
                                    }}
                                    onMouseEnter={(e) => {
                                        soundEngine.playHover();
                                        scrambleElementText(e.currentTarget);
                                    }}
                                >
                                    {cleanHost(project.liveLink)}
                                </a>
                            ) : (
                                <span className="ov-link">Case study</span>
                            )}
                        </div>
                        <figcaption className="ov-bot">
                            <h2 className="ov-title" data-lines>{project.title}</h2>
                            <div className="ov-text">
                                <p>{project.valueProp || project.description}</p>
                                <p className="tags">{project.techStack.slice(0, 5).join(' · ')}</p>
                            </div>
                        </figcaption>
                    </figure>
                ))}

                <div className="more">
                    <p className="cryst-label">More systems</p>
                    <ul className="more-list" onMouseLeave={() => setHoveredMore(null)}>
                        {moreProjects.map((proj, idx) => (
                            <li key={proj._id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        soundEngine.playClick();
                                        setSelectedProject(proj);
                                    }}
                                    onMouseEnter={(e) => {
                                        soundEngine.playHover();
                                        setHoveredMore(proj);
                                        const titleEl = e.currentTarget.querySelector('.m-t');
                                        if (titleEl) scrambleElementText(titleEl);
                                    }}
                                    onFocus={() => setHoveredMore(proj)}
                                    onBlur={() => setHoveredMore(null)}
                                >
                                    <span className="m-n">0{idx + 4}</span>
                                    <img src={proj.image} alt="" loading="lazy" className="m-thumb" />
                                    <span className="m-t">{proj.title}</span>
                                    <span className="m-d">{proj.valueProp}</span>
                                    <span className="m-a" aria-hidden="true">
                                        {proj.isPrivate ? 'Case study' : '↗'}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ============ (03) ABOUT ============ */}
            <section className="about" id="about">
                <div className="sec-head">
                    <p className="cryst-label">(03) About</p>
                    <p className="cryst-label dim">STI College Fairview · Aug 2025 – Present</p>
                </div>

                <div className="about-grid">
                    <div className="about-photo" data-reveal-img>
                        <AsciiPortrait src="/grad_pic.png" alt="Portrait of Andrei Dilag" />
                    </div>

                    <div className="about-text">
                        <p className="big-2" data-lines>
                            Educator rigor in the classroom, <em>production speed in the codebase.</em>
                        </p>
                        <p className="body-copy">
                            I teach <strong>Advanced Database &amp; Network Technology 2</strong> at STI College Fairview while building full-stack SaaS platforms, computer-vision assessment engines, and enterprise tools for startups and businesses.
                        </p>

                        <dl className="facts">
                            <div>
                                <dt>Based in</dt>
                                <dd>Quezon City, Metro Manila, Philippines (UTC+8)</dd>
                            </div>
                            <div>
                                <dt>Current Role</dt>
                                <dd>IT Faculty Teacher — STI College Fairview (Aug 2025 – Present)</dd>
                            </div>
                            <div>
                                <dt>Industry Role</dt>
                                <dd>Software Developer — 3 AM Digital Media / NLP Services (Jan – May 2026)</dd>
                            </div>
                            <div>
                                <dt>Earlier Role</dt>
                                <dd>MIS Student Assistant — STI College Fairview (Jan – Dec 2024)</dd>
                            </div>
                            <div>
                                <dt>Languages</dt>
                                <dd>TypeScript, JavaScript, Python, Java, SQL, PHP, C#</dd>
                            </div>
                            <div>
                                <dt>Stack &amp; AI</dt>
                                <dd>Next.js 14, React, FastAPI, Spring Boot, OpenCV, LLMs, n8n, Copilot Studio</dd>
                            </div>
                            <div>
                                <dt>Data &amp; Cloud</dt>
                                <dd>PostgreSQL, MySQL, MongoDB, Cloudflare Pages, Docker, SAP S/4HANA</dd>
                            </div>
                            <div>
                                <dt>Distinctions</dt>
                                <dd>Codefest National Entrant, Cluster Champion &amp; Local Champion</dd>
                            </div>
                        </dl>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="/andrei_dilag_resume.pdf"
                                download="andrei_dilag_resume.pdf"
                                className="pill-btn magnetic-item inline-block"
                                onMouseEnter={() => soundEngine.playHover()}
                                onClick={() => soundEngine.playClick()}
                                onPointerMove={(e) => attachMagneticMove(e, 0.25, 0.34)}
                                onPointerLeave={resetMagneticMove}
                            >
                                Download resume (PDF) ↗
                            </a>
                            <button
                                type="button"
                                className="pill-btn magnetic-item"
                                onMouseEnter={() => soundEngine.playHover()}
                                onPointerMove={(e) => attachMagneticMove(e, 0.25, 0.34)}
                                onPointerLeave={resetMagneticMove}
                                onClick={() => {
                                    soundEngine.playClick();
                                    setAskOpen(true);
                                }}
                            >
                                Ask Andrei’s AI ↗
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ (04) HIGHLIGHTS & RECOGNITION ============ */}
            <section className="design" id="design">
                <div className="sec-head">
                    <p className="cryst-label">(04) Highlights &amp; honors</p>
                    <p className="cryst-label dim">Hover for colour — click to enlarge</p>
                </div>

                <div className="dz">
                    {HIGHLIGHTS.map((item, idx) => (
                        <div key={item.num} className={`dz-item ${idx % 2 === 1 ? 'r' : ''}`}>
                            <figure
                                className="dz-ph"
                                tabIndex={0}
                                role="button"
                                aria-label={`Enlarge ${item.title}`}
                                onClick={() => setLightbox(item)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setLightbox(item);
                                    }
                                }}
                            >
                                <img src={item.img} alt={item.title} loading="lazy" />
                            </figure>
                            <div className="dz-tx">
                                <span className="dz-num">{item.num}</span>
                                <h3 className="dz-t">{item.title}</h3>
                                <span className="cryst-label dim">{item.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ (05) SERVICES (INVERTED ON SCROLL) ============ */}
            <section className="services" id="services" data-invert>
                <div className="sec-head">
                    <p className="cryst-label">(05) What I can build for you</p>
                    <p className="cryst-label dim">Freelance, contract &amp; full-time</p>
                </div>
                <ol className="svc">
                    <li>
                        <span className="svc-n">01</span>
                        <h3 className="svc-t" data-lines>Web &amp; SaaS</h3>
                        <p className="svc-d">
                            Full-stack Next.js, React, FastAPI and Spring Boot platforms built from first schema to production.
                        </p>
                    </li>
                    <li>
                        <span className="svc-n">02</span>
                        <h3 className="svc-t" data-lines>AI &amp; Vision</h3>
                        <p className="svc-d">
                            LLM assistants, n8n and Copilot Studio workflows, and OpenCV document/OMR pipelines that eliminate manual work.
                        </p>
                    </li>
                    <li>
                        <span className="svc-n">03</span>
                        <h3 className="svc-t" data-lines>Systems</h3>
                        <p className="svc-d">
                            Payroll, multi-branch logistics, ACID database architecture and query optimization shaped around your operations.
                        </p>
                    </li>
                </ol>
            </section>

            {/* ============ (06) CONTACT ============ */}
            <section className="contact" id="contact">
                <p className="cryst-label">(06) Contact</p>
                <h2 className="contact-title" data-lines>
                    Have an idea? <em>Let’s build it.</em>
                </h2>
                <a className="mail" href="mailto:andreidilag12@gmail.com">
                    andreidilag12@gmail.com
                </a>
                <div className="contact-row">
                    <button
                        className="pill-btn magnetic-item"
                        type="button"
                        onMouseEnter={() => soundEngine.playHover()}
                        onPointerMove={(e) => attachMagneticMove(e, 0.26, 0.36)}
                        onPointerLeave={resetMagneticMove}
                        onClick={() => {
                            soundEngine.playClick();
                            handleCopyEmail();
                        }}
                    >
                        {copied ? 'Copied ✓' : 'Copy email'}
                    </button>
                    <button
                        className="pill-btn magnetic-item"
                        type="button"
                        onMouseEnter={() => soundEngine.playHover()}
                        onPointerMove={(e) => attachMagneticMove(e, 0.26, 0.36)}
                        onPointerLeave={resetMagneticMove}
                        onClick={() => {
                            soundEngine.playClick();
                            setFormStatus('');
                            setFormToast('');
                            setInquiryOpen(true);
                        }}
                    >
                        Send a message
                    </button>
                    <button
                        className="pill-btn magnetic-item"
                        type="button"
                        onMouseEnter={() => soundEngine.playHover()}
                        onPointerMove={(e) => attachMagneticMove(e, 0.26, 0.36)}
                        onPointerLeave={resetMagneticMove}
                        onClick={() => {
                            soundEngine.playClick();
                            setAskOpen(true);
                        }}
                    >
                        Ask Andrei’s AI
                    </button>
                    <a
                        href="https://github.com/YtterStick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-item"
                        onMouseEnter={(e) => {
                            soundEngine.playHover();
                            scrambleElementText(e.currentTarget);
                        }}
                        onPointerMove={(e) => attachMagneticMove(e, 0.22, 0.32)}
                        onPointerLeave={resetMagneticMove}
                    >
                        GitHub ↗
                    </a>
                    <a
                        href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-item"
                        onMouseEnter={(e) => {
                            soundEngine.playHover();
                            scrambleElementText(e.currentTarget);
                        }}
                        onPointerMove={(e) => attachMagneticMove(e, 0.22, 0.32)}
                        onPointerLeave={resetMagneticMove}
                    >
                        LinkedIn ↗
                    </a>
                    <a
                        href="/andrei_dilag_resume.pdf"
                        download="andrei_dilag_resume.pdf"
                        className="magnetic-item"
                        onMouseEnter={(e) => {
                            soundEngine.playHover();
                            scrambleElementText(e.currentTarget);
                        }}
                        onPointerMove={(e) => attachMagneticMove(e, 0.22, 0.32)}
                        onPointerLeave={resetMagneticMove}
                    >
                        Resume ↗
                    </a>
                </div>
            </section>

            {/* ============ LIGHTBOX ============ */}
            {typeof document !== 'undefined' && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Highlight viewer"
                    className={`cryst-lightbox ${lightbox ? 'open' : ''}`}
                    onClick={() => setLightbox(null)}
                >
                    <button className="lb-x" type="button" onClick={() => setLightbox(null)}>
                        Close [ESC]
                    </button>
                    {lightbox && <img src={lightbox.img} alt={lightbox.title} />}
                    {lightbox && (
                        <div className="lb-cap" onClick={(e) => e.stopPropagation()}>
                            <span>{lightbox.title} — {lightbox.sub}</span>
                            {lightbox.link && (
                                <a href={lightbox.link} target="_blank" rel="noopener noreferrer">
                                    Verify post ↗
                                </a>
                            )}
                        </div>
                    )}
                </div>,
                document.body
            )}

            {/* ============ CASE STUDY MODAL ============ */}
            {typeof document !== 'undefined' && selectedProject && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedProject.title} Case Study`}
                    className="fixed inset-0 z-[350] flex items-end sm:items-center justify-center p-0 sm:p-8 bg-black/90 overflow-y-auto"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="w-full max-w-4xl bg-[#111111] text-[#ededed] border-t sm:border border-white/15 max-h-[92dvh] sm:max-h-[90vh] flex flex-col sm:my-auto"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/15 shrink-0 bg-[#111111]">
                            <span className="cryst-label">{selectedProject.category}</span>
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="cryst-label cursor-pointer py-1 px-2 hover:opacity-70"
                            >
                                Close ✕
                            </button>
                        </div>

                        <div className="p-5 sm:p-10 overflow-y-auto space-y-7 sm:space-y-8">
                            <div className="aspect-video w-full overflow-hidden bg-black border border-white/10">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-6">
                                <div>
                                    <h3 className="text-4xl sm:text-5xl tracking-tight font-normal">
                                        {selectedProject.title}
                                    </h3>
                                    {selectedProject.subtitle && (
                                        <p className="text-sm text-[#8f8f8f] mt-1">{selectedProject.subtitle}</p>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProject.liveLink && selectedProject.liveLink !== '#' && !selectedProject.isPrivate ? (
                                        <a
                                            href={selectedProject.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pill-btn text-sm"
                                        >
                                            Open live app ↗
                                        </a>
                                    ) : (
                                        <span className="cryst-label dim py-2">Private Enterprise Deployment</span>
                                    )}
                                    {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                                        <a
                                            href={selectedProject.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pill-btn text-sm"
                                        >
                                            Source ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                            {selectedProject.caseStudy && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="cryst-label dim mb-2">01 — Problem</p>
                                        <p className="text-sm text-[#cfcfcf] leading-relaxed">
                                            {selectedProject.caseStudy.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="cryst-label dim mb-2">02 — Solution</p>
                                        <p className="text-sm text-[#cfcfcf] leading-relaxed">
                                            {selectedProject.caseStudy.solution}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="cryst-label mb-2">03 — Impact</p>
                                        <p className="text-sm text-white leading-relaxed">
                                            {selectedProject.caseStudy.impact}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Interactive live system sandbox */}
                            <ProjectSimModalWidget project={selectedProject} />

                            {selectedProject.keyFeatures && (
                                <div className="border-t border-white/15 pt-6">
                                    <p className="cryst-label dim mb-4">Key capabilities</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedProject.keyFeatures.map((f, i) => (
                                            <div key={i} className="border border-white/10 p-4">
                                                <p className="text-sm font-medium mb-1">{f.title}</p>
                                                <p className="text-xs text-[#8f8f8f] leading-relaxed">{f.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-white/15 pt-5">
                                <p className="tags">{selectedProject.techStack.join(' · ')}</p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ============ ASK ANDREI Q&A TERMINAL ============ */}
            <AskAndreiModal
                open={askOpen}
                onClose={() => setAskOpen(false)}
                onOpenInquiry={() => {
                    setFormStatus('');
                    setFormToast('');
                    setInquiryOpen(true);
                }}
            />

            {/* ============ INQUIRY MODAL ============ */}
            {typeof document !== 'undefined' && inquiryOpen && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Send a message"
                    className="fixed inset-0 z-[350] flex items-end sm:items-center justify-center p-0 sm:p-8 bg-black/90 overflow-y-auto"
                    onClick={() => setInquiryOpen(false)}
                >
                    <div
                        className="w-full max-w-xl bg-[#111111] text-[#ededed] border-t sm:border border-white/15 p-5 sm:p-10 max-h-[92dvh] overflow-y-auto sm:my-auto"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-4 mb-5">
                            <span className="cryst-label truncate">Direct inquiry — andreidilag12@gmail.com</span>
                            <button
                                type="button"
                                onClick={() => setInquiryOpen(false)}
                                className="cryst-label shrink-0 cursor-pointer py-1 px-2 hover:opacity-70"
                            >
                                Close ✕
                            </button>
                        </div>

                        {formStatus === 'success' ? (
                            <div className="py-8 space-y-4">
                                <p className="text-3xl tracking-tight">
                                    Message sent. <em>Thank you.</em>
                                </p>
                                <p className="text-sm text-[#8f8f8f]">
                                    I’ll review your note and get back to you within 24 hours.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setInquiryOpen(false)}
                                    className="pill-btn text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleInquirySubmit} className="space-y-4 text-base sm:text-sm">
                                <div>
                                    <label className="block cryst-label dim mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-white"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block cryst-label dim mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-white"
                                        placeholder="you@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block cryst-label dim mb-1.5">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-white"
                                        placeholder="Project build, freelance, or hiring"
                                    />
                                </div>
                                <div>
                                    <label className="block cryst-label dim mb-1.5">Message</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/20 px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-white resize-none"
                                        placeholder="Tell me about your project or role..."
                                    />
                                </div>

                                {formToast && (
                                    <p className="cryst-label text-amber-300">{formToast}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'sending'}
                                        className="pill-btn"
                                    >
                                        {formStatus === 'sending' ? 'Sending...' : 'Send message ↗'}
                                    </button>
                                    {formStatus === 'error' && (
                                        <a
                                            href={`mailto:andreidilag12@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                                            className="cryst-label underline"
                                        >
                                            Open Mail App ↗
                                        </a>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Home;
