import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScroll } from '../context/ScrollContext';
import { soundEngine } from '../utils/soundEngine';
import { scrambleElementText, attachMagneticMove, resetMagneticMove } from '../utils/scramble';

const formatManilaTime = () => {
    try {
        const f = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        return `MNL ${f.format(new Date())}`;
    } catch {
        return 'MNL 00:00:00';
    }
};

const NAV_ITEMS = [
    { code: '01', href: '#work', label: 'Work' },
    { code: '02', href: '#about', label: 'About' },
    { code: '03', href: '#design', label: 'Highlights' },
    { code: '04', href: '#services', label: 'Services' },
    { code: '05', href: '#contact', label: 'Contact' }
];

const Navbar = () => {
    const [clock, setClock] = useState(formatManilaTime);
    const [soundOn, setSoundOn] = useState(() => soundEngine.isEnabled());
    const [menuOpen, setMenuOpen] = useState(false);
    const { lenis } = useScroll();

    useEffect(() => {
        const timer = setInterval(() => setClock(formatManilaTime()), 1000);
        const unsub = soundEngine.subscribe(setSoundOn);
        return () => {
            clearInterval(timer);
            unsub();
        };
    }, []);

    useEffect(() => {
        if (menuOpen) {
            lenis?.stop?.();
        } else {
            lenis?.start?.();
        }
        const onResize = () => {
            if (window.innerWidth > 820 && menuOpen) setMenuOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [menuOpen, lenis]);

    const handleJump = (e, href) => {
        e.preventDefault();
        soundEngine.playClick();
        setMenuOpen(false);
        const el = href === '#top' ? null : document.querySelector(href);
        setTimeout(() => {
            if (lenis) {
                lenis.scrollTo(el || 0, { duration: 1.35 });
            } else if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 20);
    };

    const handleNavHover = (e) => {
        soundEngine.playHover();
        scrambleElementText(e.currentTarget);
    };

    const triggerAskAi = () => {
        soundEngine.playClick();
        setMenuOpen(false);
        window.dispatchEvent(new CustomEvent('open-ask-andrei'));
    };

    return (
        <>
            <header className="cryst-nav">
                <a
                    href="#top"
                    onClick={(e) => handleJump(e, '#top')}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="nav-name"
                >
                    ANDREI DILAG
                </a>

                <nav aria-label="Sections" className="cryst-nav-links">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleJump(e, item.href)}
                            onMouseEnter={handleNavHover}
                            onPointerMove={(e) => attachMagneticMove(e, 0.22, 0.3)}
                            onPointerLeave={resetMagneticMove}
                            className="magnetic-item"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="cryst-nav-right">
                    <button
                        type="button"
                        onClick={triggerAskAi}
                        onMouseEnter={() => soundEngine.playHover()}
                        className="sfx-toggle ask-nav-btn"
                        title="Instant Q&A about Andrei’s work & experience"
                    >
                        <span>ASK AI</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => soundEngine.toggle()}
                        aria-pressed={soundOn}
                        aria-label={soundOn ? 'Mute sound effects' : 'Enable subtle sound effects'}
                        title={soundOn ? 'Sound: On' : 'Sound: Off (click to enable)'}
                        className={`sfx-toggle ${soundOn ? 'on' : ''}`}
                    >
                        <span className="sfx-bars" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                            <i />
                        </span>
                        <span className="sfx-label">{soundOn ? 'SFX ON' : 'SFX OFF'}</span>
                    </button>
                    <span className="cryst-nav-time">{clock}</span>

                    <button
                        type="button"
                        onClick={() => {
                            soundEngine.playClick();
                            setMenuOpen((v) => !v);
                        }}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className="mob-menu-btn"
                    >
                        {menuOpen ? 'CLOSE' : 'MENU'}
                    </button>
                </div>
            </header>

            {typeof document !== 'undefined' && createPortal(
                <div
                    className={`mob-nav-drawer ${menuOpen ? 'open' : ''}`}
                    aria-hidden={!menuOpen}
                    data-lenis-prevent
                >
                    <div className="mob-nav-top">
                        <span className="cryst-label">ANDREI DILAG</span>
                        <button
                            type="button"
                            onClick={() => {
                                soundEngine.playClick();
                                setMenuOpen(false);
                            }}
                            className="mob-close-btn"
                        >
                            CLOSE ✕
                        </button>
                    </div>

                    <nav aria-label="Mobile sections" className="mob-nav-list">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleJump(e, item.href)}
                                className="mob-nav-item"
                            >
                                <span className="mob-nav-code">({item.code})</span>
                                <span className="mob-nav-label">{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="mob-nav-foot">
                        <div className="mob-nav-actions">
                            <button type="button" onClick={triggerAskAi} className="pill-btn text-sm">
                                Ask Andrei’s AI ↗
                            </button>
                            <a
                                href="/andrei_dilag_resume.pdf"
                                download="andrei_dilag_resume.pdf"
                                onClick={() => setMenuOpen(false)}
                                className="pill-btn text-sm"
                            >
                                Resume PDF ↗
                            </a>
                        </div>
                        <div className="mob-nav-meta">
                            <span>Quezon City, PH</span>
                            <span>{clock}</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Navbar;
