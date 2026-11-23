import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

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
        { code: '01', name: 'HOME', href: '#hero' },
        { code: '02', name: 'WORK', href: '#projects' },
        { code: '03', name: 'SERVICES', href: '#services' },
        { code: '04', name: 'ABOUT', href: '#about' },
        { code: '05', name: 'CONTACT', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border font-mono">
            {/* Top workstation status bar */}
            <div className="bg-secondary border-b border-border px-4 sm:px-6 lg:px-8 py-1 text-[10px] text-text-muted flex items-center justify-between max-w-7xl mx-auto">
                <span>SYS://ANDREI_DILAG_OS // TTY1</span>
                <span className="hidden sm:inline items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-accent mr-1.5 align-middle" />
                    <span className="text-text-main">ONLINE</span>
                    <span className="text-text-muted"> // REGION: ASIA-MNL</span>
                </span>
                <span>UTC+8</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Workstation Brand */}
                    <Link
                        to="/"
                        className="text-sm sm:text-base font-bold text-text-main hover:text-accent px-2 py-1 transition-colors duration-75 flex items-center gap-1.5"
                    >
                        <span className="text-accent">&gt;</span>
                        <span>ANDREI.DEV</span>
                        <span className="text-accent animate-blink">█</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1.5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`px-3 py-1.5 text-xs font-medium tracking-wider border transition-colors duration-75 ${
                                        isActive
                                            ? 'bg-secondary text-accent border-accent font-bold'
                                            : 'bg-transparent text-text-muted border-transparent hover:text-text-main hover:border-border'
                                    }`}
                                >
                                    [ {link.code}. {link.name} {isActive ? <span className="animate-blink">█</span> : null} ]
                                </a>
                            );
                        })}
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="ml-2 px-3.5 py-1.5 text-xs font-bold bg-primary text-accent border border-accent hover:bg-accent hover:text-primary transition-colors duration-75"
                        >
                            [ HIRE_ME -&gt; ]
                        </a>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-3 py-1.5 text-xs font-bold border border-accent text-accent hover:bg-accent hover:text-primary transition-colors duration-75 cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? '[ X CLOSE ]' : '[ = MENU ]'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Terminal Dropdown */}
            {isOpen && (
                <div className="lg:hidden bg-secondary border-t border-border px-4 py-4 space-y-1.5">
                    <div className="text-[10px] text-text-muted pb-1.5 mb-1 border-b border-border uppercase tracking-wider">
                        SELECT_DIRECTORY
                    </div>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`block px-3 py-2 text-xs font-medium border transition-colors duration-75 ${
                                    isActive
                                        ? 'bg-primary text-accent border-accent font-bold'
                                        : 'bg-primary/60 text-text-main border-border hover:border-accent'
                                }`}
                            >
                                [ {link.code}. {link.name} {isActive ? '█' : ''} ]
                            </a>
                        );
                    })}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="block w-full text-center mt-2 px-3 py-2.5 bg-primary text-accent font-bold text-xs border border-accent hover:bg-accent hover:text-primary transition-colors duration-75"
                    >
                        [ INITIATE_CONTACT -&gt; ]
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
