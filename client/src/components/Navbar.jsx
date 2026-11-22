import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sectionToNav = {
            hero: 'hero',
            about: 'about',
            services: 'about',
            skills: 'about',
            projects: 'projects',
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

        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            () => {
                updateFromScroll();
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            }
        );

        elements.forEach((el) => observer.observe(el));
        window.addEventListener('scroll', updateFromScroll, { passive: true });
        updateFromScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', updateFromScroll);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (e, href) => {
        // Only prevent default if it's an internal link
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
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md border-b border-border py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="shrink-0 cursor-pointer">
                        <Link to="/" className="text-xl font-semibold text-white tracking-tight flex items-center gap-1.5 group">
                            <span>Andrei</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                dev
                            </span>
                            <span className="text-accent">.</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`font-medium text-sm transition-colors duration-300 relative group ${
                                            isActive ? 'text-white' : 'text-text-muted hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                        ></span>
                                    </a>
                                );
                            })}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="px-5 py-2 border border-accent/50 text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300 font-medium text-sm"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-white hover:bg-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary/95 backdrop-blur-md border-t border-border"
                    >
                        <div className="px-4 pt-3 pb-4 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                                            isActive
                                                ? 'text-white bg-accent/15 border border-accent/30'
                                                : 'text-text-muted hover:text-white hover:bg-surface'
                                        }`}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="block w-full text-center mt-4 px-4 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all duration-300 text-sm"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
