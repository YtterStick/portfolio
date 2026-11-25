import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatManilaTime = () => {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        return `MNL ${formatter.format(now)}`;
    } catch {
        return 'MNL 00:00:00';
    }
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [clock, setClock] = useState(formatManilaTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setClock(formatManilaTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const sectionToNav = {
            hero: 'hero',
            projects: 'projects',
            services: 'services',
            about: 'about',
            skills: 'about',
            contact: 'contact'
        };
        const sectionIds = ['hero', 'projects', 'services', 'about', 'skills', 'contact'];

        const updateFromScroll = () => {
            const scrollMarker = window.innerHeight * 0.35;
            let current = 'hero';
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= scrollMarker && rect.bottom > 80) {
                    current = sectionToNav[id];
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', updateFromScroll, { passive: true });
        updateFromScroll();
        return () => window.removeEventListener('scroll', updateFromScroll);
    }, []);

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.slice(1);
            setActiveSection(targetId);
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Work', href: '#projects' },
        { name: 'Design', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-primary/85 backdrop-blur-md border-b border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">
                    {/* Left: Uppercase Name */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            onClick={(e) => handleNavClick(e, '#hero')}
                            className="tech-label text-text-main font-medium hover:opacity-75 transition-opacity inline-flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-[#34d399] inline-block" />
                            <span>ANDREI DILAG</span>
                        </Link>
                    </div>

                    {/* Center: Compact Nav Links */}
                    <nav aria-label="Primary" className="hidden md:flex items-center justify-center gap-7">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`tech-label py-1 transition-colors duration-150 ${
                                        isActive
                                            ? 'text-text-main border-b border-text-main'
                                            : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right: Live Ticking Timezone Clock + Mobile Menu Toggle */}
                    <div className="flex items-center justify-end gap-4">
                        <span className="tech-label text-text-muted tabular-nums">
                            {clock}
                        </span>

                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden tech-label px-2.5 py-1 border border-white/15 text-text-main hover:bg-white hover:text-primary transition-colors cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? 'CLOSE' : 'MENU'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-primary border-t border-white/[0.08] px-5 py-4 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`block py-2 tech-label border-b border-white/[0.06] ${
                                    isActive ? 'text-text-main font-semibold' : 'text-text-muted'
                                }`}
                            >
                                {link.name} ↗
                            </a>
                        );
                    })}
                </div>
            )}
        </header>
    );
};

export default Navbar;
