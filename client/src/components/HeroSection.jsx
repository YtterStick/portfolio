import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Typewriter = ({ text, delay = 150, pause = 10000 }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentText('');
                setCurrentIndex(0);
            }, pause);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text, pause]);

    return (
        <span>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[4px] h-[0.9em] bg-accent ml-2 align-middle shadow-[0_0_10px_var(--color-accent)]"
            />
        </span>
    );
};

const FloatingCode = ({ code, top, left, right, bottom, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [-20, 20, -20],
            x: [-10, 10, -10]
        }}
        transition={{
            duration: 12,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        style={{ position: 'absolute', top, left, right, bottom }}
        className="text-[11px] md:text-sm font-mono text-accent/80 whitespace-nowrap bg-secondary/40 p-3 rounded-lg border border-accent/15 backdrop-blur-xs"
    >
        {`{ `}{code}{` }`}
    </motion.div>
);

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden pt-16">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(99,102,241,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.5)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            {/* Single subtle top gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/[0.06] rounded-full blur-[120px]"></div>

            {/* Floating Code Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <FloatingCode code="const api = await fetch('/projects');" top="15%" left="10%" delay={0} />
                <FloatingCode code="<div>{project.title}</div>" top="65%" left="5%" delay={5} />
                <FloatingCode code="npm install framer-motion" top="20%" right="15%" delay={2} />
                <FloatingCode code="[...techStack, 'React']" bottom="20%" right="10%" delay={8} />
                <FloatingCode code="db.projects.find({})" top="40%" left="20%" delay={4} />
            </div>

            <div className="container mx-auto px-6 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-8 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-[0.2em] uppercase"
                >
                    Open to Opportunities
                </motion.div>

                <div className="mb-8 h-[80px] md:h-[120px] lg:h-[160px] flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05]">
                        <Typewriter text="Andrei Dilag" />
                    </h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Full-stack developer specializing in modern web and mobile applications.
                    Delivering production-ready solutions for businesses and startups.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-6"
                >
                    <a
                        href="#projects"
                        className="px-10 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all duration-300"
                    >
                        View Selected Work
                    </a>
                    <div className="flex items-center gap-8">
                        <SocialLink href="https://github.com/YtterStick" icon={<FaGithub />} label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/andrei-dilag-79b018268/" icon={<FaLinkedin />} label="LinkedIn" />
                        <SocialLink href="mailto:andreidilag12@gmail.com" icon={<FaEnvelope />} label="Email" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-text-muted text-xs tracking-[0.2em] uppercase">
                    <span>Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-text-muted/50 to-transparent"></div>
                </div>
            </motion.div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-accent text-2xl transition-colors duration-300"
        aria-label={label}
    >
        {icon}
    </a>
);

export default HeroSection;
