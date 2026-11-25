import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../context/ScrollContext';
import AsciiWordmark from './AsciiWordmark';

gsap.registerPlugin(ScrollTrigger);

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

const Footer = () => {
    const [clock, setClock] = useState(formatManilaTime);
    const footerRef = useRef(null);
    const wordRef = useRef(null);
    const { lenis } = useScroll();

    useEffect(() => {
        const timer = setInterval(() => setClock(formatManilaTime()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduced || !footerRef.current) return;

        const st = ScrollTrigger.create({
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (s) => {
                wordRef.current?.setExplode(Math.max(0, 1 - s.progress * 1.08));
            }
        });

        return () => st.kill();
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.8 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer ref={footerRef} className="cryst-footer">
            <div className="pt-8">
                <AsciiWordmark ref={wordRef} lines={['ANDREI DILAG']} assemble />
            </div>
            <div className="footer-bar">
                <span>&copy; {new Date().getFullYear()} Andrei Dilag</span>
                <span>{clock}</span>
                <a href="#top" onClick={scrollToTop}>Back to top ↑</a>
            </div>
        </footer>
    );
};

export default Footer;
