import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Typewriter = ({ text, delay = 120, pause = 8000 }) => {
    // Initial state has full text so Largest Contentful Paint (LCP) triggers instantly on frame 1
    const [currentText, setCurrentText] = useState(text);
    const [currentIndex, setCurrentIndex] = useState(text.length);

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
            <span
                className="inline-block w-1 h-[0.9em] bg-accent ml-2 align-middle shadow-[0_0_10px_var(--color-accent)] animate-pulse"
            />
        </span>
    );
};

const FloatingCode = ({ code, top, left, right, bottom, reverse = false, mobileHidden = false }) => (
    <div
        style={{ position: 'absolute', top, left, right, bottom }}
        className={`${mobileHidden ? 'hidden lg:block' : 'block'} text-[9px] sm:text-[11px] md:text-sm font-mono text-accent/70 whitespace-nowrap bg-secondary/60 px-2.5 py-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-accent/20 shadow-sm backdrop-blur-xs select-none ${
            reverse ? 'animate-float-reverse' : 'animate-float-slow'
        }`}
    >
        {`{ `}{code}{` }`}
    </div>
);

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden pt-20 pb-16 sm:py-24">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(99,102,241,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.5)_1px,transparent_1px)] bg-size-[64px_64px]" />

            {/* Single subtle top radial gradient — GPU accelerated */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Floating Code Decorations: 2 subtle corner tags on mobile, full set on desktop */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Mobile & Desktop: Top-Right corner (clear of navbar & badge) */}
                <FloatingCode code="Evalo.startQuiz()" top="15%" right="5%" />

                {/* Mobile & Desktop: Bottom-Left corner (clear of CTA & socials) */}
                <FloatingCode code="ai.generateReviewer()" bottom="10%" left="4%" reverse />

                {/* Desktop-only extra decorations for wide screens */}
                <FloatingCode code="cv2.findContours(bubbleSheet)" top="22%" left="7%" mobileHidden />
                <FloatingCode code="SpringApplication.run(StarWash.class)" bottom="22%" right="8%" reverse mobileHidden />
                <FloatingCode code="db.evalo.quizzes.find({ randomized: true })" top="45%" left="12%" mobileHidden />
            </div>

            <div className="container mx-auto px-4 sm:px-6 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-[0.2em] uppercase shadow-lg shadow-accent/15 max-w-[92vw]"
                >
                    <span className="hidden sm:inline">Andrei Dev Portfolio</span>
                    <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>Full-Stack Developer & Educator</span>
                </motion.div>

                <div className="mb-6 sm:mb-8 h-16 sm:h-24 md:h-32 lg:h-40 flex items-center justify-center">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.08]">
                        <Typewriter text="Andrei Dilag" />
                    </h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-text-muted text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0"
                >
                    Full-stack developer and IT educator. While I teach advance database and networking, building scalable web applications and high-impact software solutions is my true passion and primary goal.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-all duration-300 text-sm sm:text-base shadow-lg shadow-accent/25 text-center"
                    >
                        View Selected Work
                    </a>
                    <div className="flex items-center justify-center gap-7 pt-2 sm:pt-0">
                        <SocialLink href="https://github.com/YtterStick" icon={<FaGithub />} label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/andrei-dilag-79b018268/" icon={<FaLinkedin />} label="LinkedIn" />
                        <SocialLink href="mailto:andreidilag12@gmail.com" icon={<FaEnvelope />} label="Email" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className="flex flex-col items-center gap-2 text-text-muted text-xs tracking-[0.2em] uppercase">
                    <span>Scroll</span>
                    <div className="w-px h-12 bg-linear-to-b from-text-muted/50 to-transparent" />
                </div>
            </div>
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
