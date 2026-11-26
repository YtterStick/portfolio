import { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

const RAMP = ' .:-=+*#%@AD';

const AsciiPortrait = ({ src = '/grad_pic.png', alt = 'Portrait of Andrei Dilag' }) => {
    const [asciiMode, setAsciiMode] = useState(false);
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const imgDataRef = useRef(null);
    const pointerRef = useRef({ x: -9999, y: -9999, active: false, pulse: 0, px: 0, py: 0 });

    // Preload portrait bitmap once so toggling to ASCII is instant
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
            imgDataRef.current = img;
        };
    }, [src]);

    useEffect(() => {
        if (!asciiMode) return;
        const wrap = wrapRef.current;
        const cv = canvasRef.current;
        if (!wrap || !cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        let rafId = 0;
        let disposed = false;
        let cells = [];
        let W = 0;
        let H = 0;
        let cellW = 6;
        let cellH = 8;

        const samplePortrait = () => {
            const img = imgDataRef.current;
            const rect = wrap.getBoundingClientRect();
            W = Math.max(220, Math.round(rect.width));
            H = Math.max(275, Math.round(rect.height));

            const pr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = W * pr;
            cv.height = H * pr;
            cv.style.width = `${W}px`;
            cv.style.height = `${H}px`;
            ctx.setTransform(pr, 0, 0, pr, 0, 0);

            cellW = W < 340 ? 5.5 : 6.5;
            cellH = cellW * 1.32;

            if (!img || !img.naturalWidth) return;

            const off = document.createElement('canvas');
            off.width = W;
            off.height = H;
            const octx = off.getContext('2d');
            if (!octx) return;

            // Match CSS object-fit: cover; object-position: 50% 20%
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(W / iw, H / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (W - dw) * 0.5;
            const dy = (H - dh) * 0.2;

            octx.fillStyle = '#0a0a0a';
            octx.fillRect(0, 0, W, H);
            octx.drawImage(img, dx, dy, dw, dh);

            const data = octx.getImageData(0, 0, W, H).data;
            const next = [];

            for (let y = cellH * 0.5; y < H; y += cellH) {
                for (let x = cellW * 0.5; x < W; x += cellW) {
                    const ix = Math.min(W - 1, x | 0);
                    const iy = Math.min(H - 1, y | 0);
                    const idx = (iy * W + ix) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];
                    // Contrast-stretched luminance
                    let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                    lum = Math.max(0, Math.min(1, (lum - 0.1) * 1.22));
                    if (lum > 0.05) {
                        next.push({ x, y, lum });
                    }
                }
            }
            cells = next;
        };

        const render = (now) => {
            if (disposed) return;
            if (!cells.length && imgDataRef.current?.naturalWidth) {
                samplePortrait();
            }

            ctx.fillStyle = '#0c0c0c';
            ctx.fillRect(0, 0, W, H);
            ctx.font = `500 ${Math.max(7.5, cellW * 1.18)}px "Geist Mono", ui-monospace, monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const ptr = pointerRef.current;
            if (ptr.pulse > 0.01) {
                ptr.pulse *= 0.92;
            } else {
                ptr.pulse = 0;
            }

            const t = now * 0.001;
            const radius = 92;

            for (let i = 0; i < cells.length; i++) {
                const c = cells[i];
                let dx = 0;
                let dy = 0;
                let boost = 0;

                if (ptr.active && !reduced) {
                    const vx = c.x - ptr.x;
                    const vy = c.y - ptr.y;
                    const dist = Math.hypot(vx, vy);
                    if (dist < radius) {
                        const f = 1 - dist / radius;
                        boost = f * f * 0.45;
                        const push = f * f * 9;
                        const ang = Math.atan2(vy, vx);
                        dx += Math.cos(ang) * push;
                        dy += Math.sin(ang) * push;
                    }
                }

                if (ptr.pulse > 0.02 && !reduced) {
                    const vx = c.x - ptr.px;
                    const vy = c.y - ptr.py;
                    const dist = Math.hypot(vx, vy) + 1e-3;
                    const waveR = (1 - ptr.pulse) * Math.max(W, H) * 0.85;
                    const band = Math.max(0, 1 - Math.abs(dist - waveR) / 48);
                    if (band > 0) {
                        const kick = band * ptr.pulse * 18;
                        dx += (vx / dist) * kick;
                        dy += (vy / dist) * kick;
                        boost += band * ptr.pulse * 0.55;
                    }
                }

                const shimmer = reduced ? 0 : Math.sin(t * 2.2 + c.x * 0.04 + c.y * 0.03) * 0.035;
                const val = Math.max(0, Math.min(1, c.lum + boost + shimmer));
                const gIdx = Math.min(RAMP.length - 1, Math.max(1, Math.round(val * (RAMP.length - 1))));
                const alpha = Math.min(1, 0.28 + val * 0.78);

                ctx.fillStyle = `rgba(237, 237, 237, ${alpha.toFixed(3)})`;
                ctx.fillText(RAMP[gIdx], c.x + dx, c.y + dy);
            }

            if (!reduced) {
                rafId = requestAnimationFrame(render);
            }
        };

        samplePortrait();
        render(performance.now());

        const onResize = () => {
            samplePortrait();
            if (reduced) render(performance.now());
        };
        window.addEventListener('resize', onResize);

        return () => {
            disposed = true;
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(rafId);
        };
    }, [asciiMode]);

    const handleToggle = (e) => {
        e.stopPropagation();
        soundEngine.playClick();
        setAsciiMode((v) => !v);
    };

    const handlePointerMove = (e) => {
        if (!asciiMode) return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
        pointerRef.current.active = true;
    };

    const handlePointerDown = (e) => {
        if (!asciiMode) return;
        if (e.target?.closest?.('button')) return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current.px = e.clientX - rect.left;
        pointerRef.current.py = e.clientY - rect.top;
        pointerRef.current.pulse = 1;
        soundEngine.playShockwave();
    };

    return (
        <figure
            ref={wrapRef}
            className={`photo-bw ascii-portrait-wrap ${asciiMode ? 'is-ascii' : ''}`}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointerRef.current.active = false;
            }}
            onPointerDown={handlePointerDown}
        >
            <img src={src} alt={alt} loading="lazy" />

            {asciiMode && (
                <canvas
                    ref={canvasRef}
                    className="ascii-portrait-canvas"
                    aria-hidden="true"
                />
            )}

            <div className="portrait-hud">
                <button
                    type="button"
                    onClick={handleToggle}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="portrait-mode-btn"
                    aria-pressed={asciiMode}
                >
                    {asciiMode ? '⇄ PHOTO MODE' : '⇄ ASCII PORTRAIT'}
                </button>
                {asciiMode && (
                    <span className="portrait-hint">Sweep or click matrix</span>
                )}
            </div>
        </figure>
    );
};

export default AsciiPortrait;
