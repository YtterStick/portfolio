import { useState, useEffect } from 'react';
import { useScroll } from '../context/ScrollContext';

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

const Navbar = () => {
    const [clock, setClock] = useState(formatManilaTime);
    const { lenis } = useScroll();

    useEffect(() => {
        const timer = setInterval(() => setClock(formatManilaTime()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleJump = (e, href) => {
        e.preventDefault();
        const el = href === '#top' ? null : document.querySelector(href);
        if (lenis) {
            lenis.scrollTo(el || 0, { duration: 1.6 });
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="cryst-nav">
            <a href="#top" onClick={(e) => handleJump(e, '#top')} className="nav-name">
                ANDREI DILAG
            </a>
            <nav aria-label="Sections" className="cryst-nav-links">
                <a href="#work" onClick={(e) => handleJump(e, '#work')}>Work</a>
                <a href="#about" onClick={(e) => handleJump(e, '#about')}>About</a>
                <a href="#design" onClick={(e) => handleJump(e, '#design')}>Highlights</a>
                <a href="#services" onClick={(e) => handleJump(e, '#services')}>Services</a>
                <a href="#contact" onClick={(e) => handleJump(e, '#contact')}>Contact</a>
            </nav>
            <span className="cryst-nav-time">{clock}</span>
        </header>
    );
};

export default Navbar;
