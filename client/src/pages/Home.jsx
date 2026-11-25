import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const AsciiSparkleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const GRID = 48;
        const CHARS = ['+', '·', '.', '0', '1', ':'];
        let animationFrameId;
        let nodes = [];
        let lastScrollY = window.scrollY;
        let scrollVel = 0;

        const initNodes = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cols = Math.ceil(canvas.width / GRID);
            const rows = Math.ceil(canvas.height / GRID) + 2;
            const totalIntersections = cols * rows;
            const count = Math.min(64, Math.max(24, Math.floor(totalIntersections * 0.08)));

            nodes = Array.from({ length: count }, (_, idx) => ({
                baseX: Math.floor(Math.random() * cols) * GRID,
                baseY: Math.floor(Math.random() * rows) * GRID,
                depth: 0.15 + (idx % 4) * 0.12, // distinct parallax speeds per glyph
                char: CHARS[Math.floor(Math.random() * CHARS.length)],
                alpha: 0.14 + Math.random() * 0.2,
                targetAlpha: 0.14 + Math.random() * 0.2,
                speed: 0.002 + Math.random() * 0.004
            }));
        };

        initNodes();
        window.addEventListener('resize', initNodes);

        const render = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            scrollVel = scrollVel * 0.88 + delta * 0.12;
            const velBoost = Math.min(0.35, Math.abs(scrollVel) * 0.008);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const wrapH = Math.ceil(canvas.height / GRID + 2) * GRID;

            for (const node of nodes) {
                if (Math.abs(node.alpha - node.targetAlpha) < 0.01 || velBoost > 0.08) {
                    node.targetAlpha = 0.12 + Math.random() * 0.23;
                    if (Math.random() < 0.15 + velBoost) {
                        node.char = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                node.alpha += (node.targetAlpha - node.alpha) * (node.speed * 15);

                // Continuous scroll-linked vertical parallax per depth layer
                const parallaxY = ((node.baseY - currentScrollY * node.depth) % wrapH + wrapH) % wrapH;
                const finalAlpha = Math.min(0.65, node.alpha + velBoost);

                ctx.fillStyle = velBoost > 0.12
                    ? `rgba(52, 211, 153, ${finalAlpha.toFixed(3)})`
                    : `rgba(245, 245, 245, ${finalAlpha.toFixed(3)})`;
                ctx.fillText(node.char, node.baseX, parallaxY);
            }

            animationFrameId = window.requestAnimationFrame(render);
        };

        animationFrameId = window.requestAnimationFrame(render);
        return () => {
            window.removeEventListener('resize', initNodes);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10"
        />
    );
};

const Home = () => {
    const { scrollY } = useScroll();
    // Parallax background grid shift tied directly to window scrollY
    const gridY = useTransform(scrollY, (v) => -(v * 0.22) % 48);

    return (
        <div className="relative isolate overflow-x-clip bg-primary text-text-main">
            {/* Scroll-driven parallax 48px x 48px architectural 1px grid */}
            <motion.div
                aria-hidden="true"
                style={{ backgroundPositionY: gridY }}
                className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            {/* Scroll-velocity & parallax-reactive ASCII Sparkle Layer */}
            <AsciiSparkleCanvas />

            <div className="relative z-10">
                <HeroSection />
            </div>
            <div className="relative z-10">
                <ProjectsSection />
            </div>
            <div className="relative z-10">
                <AboutSection />
            </div>
            <div className="relative z-10">
                <ContactSection />
            </div>
        </div>
    );
};

export default Home;
