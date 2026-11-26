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

const Footer = () => {
    const [clock, setClock] = useState(formatManilaTime);
    const { lenis } = useScroll();

    useEffect(() => {
        const timer = setInterval(() => setClock(formatManilaTime()), 1000);
        return () => clearInterval(timer);
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
        <footer className="cryst-footer">
            <div className="footer-bar">
                <span>&copy; {new Date().getFullYear()} Andrei Dilag</span>
                <span>{clock}</span>
                <a href="#top" onClick={scrollToTop}>Back to top ↑</a>
            </div>
        </footer>
    );
};

export default Footer;
