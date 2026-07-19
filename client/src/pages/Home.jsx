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

    const farBgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
    const midBgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
    const nearBgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);
    const aboutY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);
    const projectsY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
    const contactY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

    return (
        <div ref={pageRef} className="relative isolate overflow-hidden">
            <motion.div
                style={{ y: farBgY }}
                className="pointer-events-none fixed inset-0 -z-20 opacity-90 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.1),transparent_22%),linear-gradient(180deg,#020617_0%,#020617_45%,#01040f_100%)]"
            />
            <motion.div
                style={{ y: midBgY }}
                className="pointer-events-none fixed inset-0 -z-10 opacity-20 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-size-[96px_96px]"
            />
            <motion.div
                style={{ y: nearBgY }}
                className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[42vh] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)] blur-3xl"
            />

            <motion.div style={{ y: heroY }} className="relative z-10">
                <HeroSection />
            </motion.div>
            <motion.div style={{ y: aboutY }} className="relative z-10">
                <AboutSection />
            </motion.div>
            <motion.div style={{ y: projectsY }} className="relative z-10">
                <ProjectsSection />
            </motion.div>
            <motion.div style={{ y: contactY }} className="relative z-10">
                <ContactSection />
            </motion.div>
        </div>
    );
};

export default Home;
