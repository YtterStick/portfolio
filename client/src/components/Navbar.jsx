import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sectionToNav = {
            hero: 'hero',
            projects: 'projects',
            about: 'about',
            services: 'services',
            skills: 'about',
            contact: 'contact'
        };
        const sectionIds = Object.keys(sectionToNav);

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
        { code: '03', name: 'ABOUT', href: '#about' },
        { code: '04', name: 'SERVICES', href: '#services' },
        { code: '05', name: 'CONTACT', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-border font-mono">
            {/* Top ASCII status hairline */}
            <div className="bg-secondary border-b border-border px-4 py-1 text-[10px] text-text-muted flex items-center justify-between">
                <span>SYS://ANDREI_DILAG_OS [TTY1]</span>
                <span className="hidden sm:inline text-accent">STATUS: ONLINE // MEM: 640K OK</span>
                <span>LOC: MNL_PH [UTC+8]</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    {/* Terminal Prompt Brand */}
                    <Link
                        to="/"
                        className="text-sm sm:text-base font-bold text-text-main hover:bg-accent hover:text-primary px-2 py-1 border border-transparent hover:border-accent transition-none flex items-center gap-1.5"
                    >
                        <span className="text-accent">&gt;</span>
                        <span>ANDREI.DEV</span>
                        <span className="text-accent animate-blink">█</span>
                    </Link>

                    {/* Desktop RPG / Terminal Menu */}
                    <div className="hidden lg:flex items-center gap-1.5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`px-2.5 py-1 text-xs font-bold tracking-wider border transition-none ${
                                        isActive
                                            ? 'bg-accent text-primary border-accent'
                                            : 'bg-primary text-text-main border-transparent hover:bg-accent hover:text-primary hover:border-accent'
                                    }`}
                                >
                                    [ {link.code}. {link.name} {isActive ? <span className="animate-blink">█</span> : null} ]
                                </a>
                            );
                        })}
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="ml-2 px-3 py-1 text-xs font-bold bg-secondary text-accent border border-accent hover:bg-accent hover:text-primary transition-none"
                        >
                            [ HIRE_ME -&gt; ]
                        </a>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-2.5 py-1 text-xs font-bold border border-accent text-accent hover:bg-accent hover:text-primary transition-none cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? '[ X CLOSE ]' : '[ = MENU ]'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Terminal Dropdown */}
            {isOpen && (
                <div className="lg:hidden bg-primary border-t border-border px-4 py-3 space-y-1.5">
                    <div className="text-[10px] text-text-muted pb-1 border-b border-border">
                        +--[ SELECT_DIRECTORY ]------------------+
                    </div>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`block px-3 py-2 text-xs font-bold border transition-none ${
                                    isActive
                                        ? 'bg-accent text-primary border-accent'
                                        : 'bg-secondary text-text-main border-border hover:bg-accent hover:text-primary'
                                }`}
                            >
                                [ {link.code}. {link.name} {isActive ? '█' : ''} ]
                            </a>
                        );
                    })}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="block w-full text-center mt-2 px-3 py-2 bg-accent text-primary font-bold text-xs border border-accent transition-none"
                    >
                        [ INITIATE_CONTACT -&gt; ]
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
