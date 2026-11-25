import { useEffect, useRef } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const ss = (a, b, v) => {
    const k = clamp((v - a) / (b - a), 0, 1);
    return k * k * (3 - 2 * k);
};
const hash = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
};
const inkRGB = (el) => {
    const c = getComputedStyle(el).color.match(/\d+(\.\d+)?/g) || [237, 237, 237];
    return `${+c[0]},${+c[1]},${+c[2]}`;
};

const BgAsciiCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const CELL = 10;
        const CH = ' .:-=+*#%@AD';
        const REDUCED = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        let cells = [];
        let W = 0;
        let H = 0;
        let pr = 1;
        let grid = null;
        let t = 0;
        let col = '237,237,237';
        let frame = 0;
        let animId = 0;

        const build = () => {
            pr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            cv.width = W * pr;
            cv.height = H * pr;
            ctx.setTransform(pr, 0, 0, pr, 0, 0);

            const cols = Math.ceil(W / CELL);
            const rows = Math.ceil(H / CELL);
            cells = [];

            for (let sr = 0; sr < rows; sr += 7) {
                for (let sc = 0; sc < cols; sc += 7) {
                    if (hash(sc * 2.1, sr * 1.7) > 0.12) continue;
                    const bw = 1 + ((hash(sc + 2, sr) * 4) | 0);
                    const bh = 1 + ((hash(sc, sr + 5) * 3) | 0);
                    for (let dy = 0; dy < bh; dy++) {
                        for (let dx = 0; dx < bw; dx++) {
                            if (hash(sc + dx * 5.3, sr + dy * 7.1) > 0.55) continue;
                            const cx = sc + dx;
                            const cy = sr + dy;
                            cells.push({
                                x: cx * CELL + CELL / 2,
                                y: cy * CELL + CELL / 2,
                                c: CH.charAt(1 + ((hash(cx * 1.9, cy * 2.3) * (CH.length - 1)) | 0)),
                                d: hash(cx + 5, cy + 9) * 3,
                                cy: 1.6 + hash(cx + 1, cy + 3) * 2.6,
                                a: 0.1 + hash(cx + 8, cy + 2) * 0.25
                            });
                        }
                    }
                }
            }

            grid = document.createElement('canvas');
            grid.width = W * pr;
            grid.height = H * pr;
            const g = grid.getContext('2d');
            g.setTransform(pr, 0, 0, pr, 0, 0);
            g.fillStyle = 'rgba(255,255,255,0.03)';
            for (let x = 0; x <= cols; x++) g.fillRect(x * CELL, 0, 1, H);
            for (let y = 0; y <= rows; y++) g.fillRect(0, y * CELL, W, 1);
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            if (!document.body.classList.contains('inverted') && grid) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(grid, 0, 0);
                ctx.setTransform(pr, 0, 0, pr, 0, 0);
            }
            if (frame++ % 16 === 0) col = inkRGB(document.body);
            ctx.font = `${CELL - 2}px "Geist Mono", ui-monospace, monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < cells.length; i++) {
                const c = cells[i];
                const life = ((t + c.d) % c.cy) / c.cy;
                const bl = Math.min(ss(0, 0.1, life), 1 - ss(0.7, 1, life));
                if (bl < 0.02) continue;
                ctx.fillStyle = `rgba(${col},${(c.a * bl).toFixed(3)})`;
                ctx.fillText(c.c, c.x, c.y);
            }
        };

        build();
        draw();

        const onResize = () => {
            build();
            draw();
        };
        window.addEventListener('resize', onResize);

        if (!REDUCED) {
            let last = 0;
            const loop = (now) => {
                animId = requestAnimationFrame(loop);
                if (document.hidden || now - last < 50) return;
                t += (now - last) / 1000 || 0.05;
                if (t > 1e4) t = 0;
                last = now;
                draw();
            };
            animId = requestAnimationFrame(loop);
        }

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return <canvas ref={canvasRef} className="bg-ascii" aria-hidden="true" />;
};

export default BgAsciiCanvas;
