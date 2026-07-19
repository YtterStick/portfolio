import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Home = () => {
    const pageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: pageRef,
        offset: ['start start', 'end end'],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    return (
        <div ref={pageRef} className="relative isolate overflow-hidden">
            {/* Minimal background — subtle grid + single top gradient */}
            <motion.div
                style={{ y: bgY }}
                className="pointer-events-none fixed inset-0 -z-20 bg-primary"
            />
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(rgba(99,102,241,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.4)_1px,transparent_1px)] bg-size-[80px_80px]"
            />
            <div
                className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[500px] bg-accent/4 rounded-full blur-[150px]"
            />

            <div className="relative z-10">
                <HeroSection />
            </div>
            <div className="relative z-10">
                <AboutSection />
            </div>
            <div className="relative z-10">
                <ProjectsSection />
            </div>
            <div className="relative z-10">
                <ContactSection />
            </div>
        </div>
    );
};

export default Home;
