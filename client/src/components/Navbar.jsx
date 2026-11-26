import { useState, useEffect } from 'react';
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
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#design', label: 'Highlights' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
];

const Navbar = () => {
    const [clock, setClock] = useState(formatManilaTime);
    const [soundOn, setSoundOn] = useState(() => soundEngine.isEnabled());
    const { lenis } = useScroll();

    useEffect(() => {
        const timer = setInterval(() => setClock(formatManilaTime()), 1000);
        const unsub = soundEngine.subscribe(setSoundOn);
        return () => {
            clearInterval(timer);
            unsub();
        };
    }, []);

    const handleJump = (e, href) => {
        e.preventDefault();
        soundEngine.playClick();
        const el = href === '#top' ? null : document.querySelector(href);
        if (lenis) {
            lenis.scrollTo(el || 0, { duration: 1.6 });
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNavHover = (e) => {
        soundEngine.playHover();
        scrambleElementText(e.currentTarget);
    };

    return (
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
                    onClick={() => {
                        soundEngine.playClick();
                        window.dispatchEvent(new CustomEvent('open-ask-andrei'));
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="sfx-toggle"
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
            </div>
        </header>
    );
};

export default Navbar;
