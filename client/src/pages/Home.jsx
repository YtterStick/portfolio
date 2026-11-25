import { useEffect, useRef } from 'react';
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

        const initNodes = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cols = Math.ceil(canvas.width / GRID);
            const rows = Math.ceil(canvas.height / GRID);
            const totalIntersections = cols * rows;
            const count = Math.min(48, Math.max(18, Math.floor(totalIntersections * 0.06)));

            nodes = Array.from({ length: count }, () => ({
                x: Math.floor(Math.random() * cols) * GRID,
                y: Math.floor(Math.random() * rows) * GRID,
                char: CHARS[Math.floor(Math.random() * CHARS.length)],
                alpha: 0.15 + Math.random() * 0.2,
                targetAlpha: 0.15 + Math.random() * 0.2,
                speed: 0.002 + Math.random() * 0.004
            }));
        };

        initNodes();
        window.addEventListener('resize', initNodes);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (const node of nodes) {
                if (Math.abs(node.alpha - node.targetAlpha) < 0.01) {
                    node.targetAlpha = 0.12 + Math.random() * 0.23; // 0.12 to 0.35
                    if (Math.random() < 0.18) {
                        node.char = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    if (Math.random() < 0.06) {
                        const cols = Math.max(1, Math.ceil(canvas.width / GRID));
                        const rows = Math.max(1, Math.ceil(canvas.height / GRID));
                        node.x = Math.floor(Math.random() * cols) * GRID;
                        node.y = Math.floor(Math.random() * rows) * GRID;
                    }
                }
                node.alpha += (node.targetAlpha - node.alpha) * (node.speed * 15);
                ctx.fillStyle = `rgba(245, 245, 245, ${node.alpha.toFixed(3)})`;
                ctx.fillText(node.char, node.x, node.y);
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
    return (
        <div className="relative isolate overflow-hidden bg-primary text-text-main">
            {/* Full-viewport 48px x 48px architectural 1px grid in rgba(255, 255, 255, 0.04) */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            {/* Ambient ASCII / Pixel Sparkle Layer at random 48px grid intersections */}
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
