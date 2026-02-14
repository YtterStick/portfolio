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
                className="inline-block w-[4px] h-[0.9em] bg-accent ml-2 align-middle shadow-[0_0_10px_#646cff]"
            />
        </span>
    );
};

const HeroSection = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/30 via-primary to-primary z-0"></div>

            {/* Floating Code Decorations */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <FloatingCode code="const api = await fetch('/projects');" top="15%" left="10%" delay={0} />
                <FloatingCode code="<div>{project.title}</div>" top="65%" left="5%" delay={5} />
                <FloatingCode code="npm install framer-motion" top="20%" right="15%" delay={2} />
                <FloatingCode code="[...techStack, 'React']" bottom="20%" right="10%" delay={8} />
                <FloatingCode code="db.projects.find({})" top="40%" left="20%" delay={4} />
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30"></div>

            <div className="container mx-auto px-6 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium tracking-widest uppercase backdrop-blur-sm"
                >
                    Available for Internships 2026
                </motion.div>

                <div className="mb-6 h-[80px] md:h-[120px] lg:h-[160px] flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter">
                        <Typewriter text="Andrei Dilag" />
                    </h1>
                </div>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                >
                    {"IT student with experience in Software, Web, and Mobile Development. Seeking internship opportunities to contribute to real-world projects.".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 5 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="inline-block mr-1.5"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-6"
                >
                    <a
                        href="#projects"
                        className="px-10 py-4 bg-accent text-primary font-black rounded-full hover:scale-105 transition-all shadow-xl shadow-accent/20"
                    >
                        Explore My Projects
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
                <div className="flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase">
                    <span>Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
                </div>
            </motion.div>
        </section>
    );
};

const FloatingCode = ({ code, top, left, right, bottom, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0.2, 0.6, 0.2],
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
        className="text-[10px] md:text-sm font-mono text-accent whitespace-nowrap bg-secondary/30 p-3 rounded-lg border border-white/10"
    >
        {`{ `}{code}{` }`}
    </motion.div>
);

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white text-3xl transition-all transform hover:scale-110"
        aria-label={label}
    >
        {icon}
    </a>
);

export default HeroSection;
