import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll as useMotionScroll,
    useSpring,
    useTransform,
    useVelocity
} from 'framer-motion';
import { useScroll } from '../context/ScrollContext';
import { soundEngine } from '../utils/soundEngine';

const WAYPOINTS = [
    { id: 'top', code: '00', label: 'Top' },
    { id: 'work', code: '02', label: 'Work' },
    { id: 'about', code: '03', label: 'About' },
    { id: 'design', code: '04', label: 'Highlights' },
    { id: 'services', code: '05', label: 'Services' },
    { id: 'contact', code: '06', label: 'Contact' }
];

const SPARKS = ['*', '+', ':', '·'];

const RocketScroll = () => {
    const railRef = useRef(null);
    const draggingRef = useRef(false);
    const prefersReduced = useReducedMotion();
    const { lenis } = useScroll();

    const { scrollY, scrollYProgress } = useMotionScroll();
    const rawVelocity = useVelocity(scrollY);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        mass: 0.22
    });
    const smoothVelocity = useSpring(rawVelocity, {
        stiffness: 170,
        damping: 24,
        mass: 0.25
    });

    const [direction, setDirection] = useState('down');
    const [pctText, setPctText] = useState('000');
    const [activeId, setActiveId] = useState('top');
    const [sparkIdx, setSparkIdx] = useState(0);
    const [thrustActive, setThrustActive] = useState(false);

    const rocketTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
    const rocketLeft = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

    const flameScaleY = useTransform(smoothVelocity, (v) => {
        if (prefersReduced) return 0.35;
        return 0.35 + Math.min(2.2, Math.abs(v) / 620);
    });

    const flameOpacity = useTransform(smoothVelocity, (v) => {
        if (prefersReduced) return 0.35;
        return Math.min(1, 0.32 + Math.abs(v) / 680);
    });

    useEffect(() => {
        const unsubP = scrollYProgress.on('change', (p) => {
            const clamped = Math.max(0, Math.min(1, p));
            setPctText(String(Math.round(clamped * 100)).padStart(3, '0'));
        });

        const unsubV = smoothVelocity.on('change', (v) => {
            if (v > 16) setDirection('down');
            else if (v < -16) setDirection('up');

            const fast = Math.abs(v) > 45;
            setThrustActive(fast);
            if (fast) {
                setSparkIdx((i) => (i + 1) % 1000);
                if (Math.abs(v) > 320) {
                    soundEngine.playRocketPulse(scrollYProgress.get());
                }
            }
        });

        return () => {
            unsubP();
            unsubV();
        };
    }, [scrollYProgress, smoothVelocity]);

    useEffect(() => {
        const detectSection = () => {
            const probe = window.innerHeight * 0.38;
            let current = 'top';
            for (const wp of WAYPOINTS) {
                const el = document.getElementById(wp.id);
                if (!el) continue;
                if (el.getBoundingClientRect().top <= probe) {
                    current = wp.id;
                }
            }
            setActiveId(current);
        };

        detectSection();
        window.addEventListener('scroll', detectSection, { passive: true });
        window.addEventListener('resize', detectSection);
        return () => {
            window.removeEventListener('scroll', detectSection);
            window.removeEventListener('resize', detectSection);
        };
    }, []);

    const scrollToRatio = (ratio, immediate = false) => {
        const clamped = Math.max(0, Math.min(1, ratio));
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const target = clamped * maxScroll;
        if (lenis) {
            lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 1.05 });
        } else {
            window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
        }
    };

    const jumpToWaypoint = (id) => {
        if (id === 'top') {
            scrollToRatio(0, false);
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        if (lenis) {
            lenis.scrollTo(el, { duration: 1.2 });
        } else {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onPointerDown = (e) => {
        if (e.target.closest('button')) return;
        const rail = railRef.current;
        if (!rail) return;
        draggingRef.current = true;
        rail.setPointerCapture(e.pointerId);
        const rect = rail.getBoundingClientRect();
        scrollToRatio((e.clientY - rect.top) / rect.height, false);
    };

    const onPointerMove = (e) => {
        if (!draggingRef.current || !railRef.current) return;
        const rect = railRef.current.getBoundingClientRect();
        scrollToRatio((e.clientY - rect.top) / rect.height, true);
    };

    const onPointerUp = (e) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        try {
            railRef.current?.releasePointerCapture(e.pointerId);
        } catch {
            // ignore
        }
    };

    const s1 = SPARKS[sparkIdx % SPARKS.length];
    const s2 = SPARKS[(sparkIdx + 2) % SPARKS.length];

    return (
        <>
        <aside className="rocket-rail" aria-label="Scroll progress rocket">
            <span className="rocket-pct">{pctText}%</span>

            <div
                ref={railRef}
                className="rocket-track-hit"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                title="Click or drag to scrub page scroll"
            >
                <div className="rocket-line">
                    <motion.div
                        className="rocket-line-fill"
                        style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
                    />
                </div>

                {WAYPOINTS.map((wp, idx) => {
                    const pct = (idx / (WAYPOINTS.length - 1)) * 100;
                    const active = activeId === wp.id;
                    return (
                        <button
                            key={wp.id}
                            type="button"
                            onClick={() => {
                                soundEngine.playClick();
                                jumpToWaypoint(wp.id);
                            }}
                            onMouseEnter={() => soundEngine.playHover()}
                            style={{ top: `${pct}%` }}
                            aria-label={`Scroll to ${wp.label}`}
                            className={`rocket-node ${active ? 'active' : ''}`}
                        >
                            <span className="rocket-dot" />
                            <span className="rocket-tip">
                                {wp.code} {wp.label}
                            </span>
                        </button>
                    );
                })}

                <motion.div className="rocket-shuttle" style={{ top: rocketTop }}>
                    <motion.div
                        animate={{ rotate: prefersReduced ? 180 : direction === 'down' ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        className="rocket-body"
                    >
                        <svg width="18" height="24" viewBox="0 0 24 30" fill="none" aria-hidden="true">
                            <path
                                d="M12 2C12 2 6.8 8.2 6.8 16.5V21.5L4 24.4V26.2L8 24.7H16L20 26.2V24.4L17.2 21.5V16.5C17.2 8.2 12 2 12 2Z"
                                fill="var(--bg)"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                            <circle cx="12" cy="12.5" r="2" fill="currentColor" />
                        </svg>

                        <motion.div
                            className="rocket-plume"
                            style={{
                                scaleY: flameScaleY,
                                opacity: flameOpacity,
                                transformOrigin: 'top center'
                            }}
                        >
                            <span className="rocket-flame" />
                            {!prefersReduced && thrustActive && (
                                <span className="rocket-sparks" aria-hidden="true">
                                    <span>{s1}</span>
                                    <span>{s2}</span>
                                </span>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </aside>

        {/* Sleek Top Horizontal Rocket Progress Track on Mobile */}
        <div className="mob-rocket-bar" aria-hidden="true">
            <div className="mob-rocket-track">
                <motion.div
                    className="mob-rocket-fill"
                    style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
                />
                <motion.div className="mob-rocket-shuttle" style={{ left: rocketLeft }}>
                    <motion.div
                        animate={{ rotate: prefersReduced ? 90 : direction === 'down' ? 90 : -90 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        className="mob-rocket-icon"
                    >
                        <svg width="13" height="17" viewBox="0 0 24 30" fill="none">
                            <path
                                d="M12 2C12 2 6.8 8.2 6.8 16.5V21.5L4 24.4V26.2L8 24.7H16L20 26.2V24.4L17.2 21.5V16.5C17.2 8.2 12 2 12 2Z"
                                fill="var(--bg)"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </div>
        </>
    );
};

export default RocketScroll;
