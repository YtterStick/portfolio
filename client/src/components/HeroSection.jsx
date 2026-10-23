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

const FloatingCode = ({ code, top, left, right, bottom, reverse = false }) => (
    <div
        style={{ position: 'absolute', top, left, right, bottom }}
        className={`text-[11px] md:text-sm font-mono text-accent/80 whitespace-nowrap bg-secondary/50 p-3 rounded-xl border border-accent/20 ${
            reverse ? 'animate-float-reverse' : 'animate-float-slow'
        }`}
    >
        {`{ `}{code}{` }`}
    </div>
);

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden pt-16">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(99,102,241,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.5)_1px,transparent_1px)] bg-size-[64px_64px]" />

            {/* Single subtle top radial gradient — GPU accelerated */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Floating Code Decorations — 0% JS main thread cost */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <FloatingCode code="Evalo.startQuiz({ proctoring: true })" top="15%" left="8%" />
                <FloatingCode code="const pointers = await ai.generateReviewer();" top="65%" left="5%" reverse />
                <FloatingCode code="cv2.findContours(bubbleSheet)" top="20%" right="12%" />
                <FloatingCode code="SpringApplication.run(StarWash.class)" bottom="20%" right="8%" reverse />
                <FloatingCode code="db.evalo.quizzes.find({ randomized: true })" top="42%" left="18%" />
            </div>

            <div className="container mx-auto px-6 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold tracking-[0.2em] uppercase shadow-lg shadow-accent/15"
                >
                    <span>Andrei Dev Portfolio</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-text-muted">Full-Stack Developer & Educator</span>
                </motion.div>

                <div className="mb-8 h-20 md:h-30 lg:h-40 flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05]">
                        <Typewriter text="Andrei Dilag" />
                    </h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Full-stack developer and IT educator. While I teach advance database and networking, building scalable web applications and high-impact software solutions is my true passion and primary goal.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
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
