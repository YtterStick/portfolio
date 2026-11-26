// Synthesized minimalist Web-Audio micro-sound engine (muted by default, zero external assets)

let audioCtx = null;
let enabled = false;
let lastRocketTick = 0;
const listeners = new Set();

function getCtx() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

export const soundEngine = {
    isEnabled: () => enabled,

    subscribe: (fn) => {
        listeners.add(fn);
        return () => listeners.delete(fn);
    },

    toggle: () => {
        enabled = !enabled;
        if (enabled) {
            const ctx = getCtx();
            if (ctx) {
                // Soft harmonic activation chime
                const now = ctx.currentTime;
                [523.25, 783.99].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.055);
                    gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
                    gain.gain.exponentialRampToValueAtTime(0.045, now + idx * 0.055 + 0.015);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.22);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.055);
                    osc.stop(now + idx * 0.055 + 0.24);
                });
            }
        }
        listeners.forEach((fn) => fn(enabled));
        return enabled;
    },

    playHover: () => {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1320, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.022);
        gain.gain.setValueAtTime(0.022, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.026);
    },

    playClick: () => {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);
        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.055);
    },

    playShockwave: () => {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Sub impulse + airy upper harmonic
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(155, now);
        sub.frequency.exponentialRampToValueAtTime(42, now + 0.24);
        subGain.gain.setValueAtTime(0.085, now);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
        sub.connect(subGain);
        subGain.connect(ctx.destination);
        sub.start(now);
        sub.stop(now + 0.27);

        const shimmer = ctx.createOscillator();
        const shimGain = ctx.createGain();
        shimmer.type = 'triangle';
        shimmer.frequency.setValueAtTime(920, now);
        shimmer.frequency.exponentialRampToValueAtTime(460, now + 0.14);
        shimGain.gain.setValueAtTime(0.028, now);
        shimGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        shimmer.connect(shimGain);
        shimGain.connect(ctx.destination);
        shimmer.start(now);
        shimmer.stop(now + 0.16);
    },

    playInvert: (isInverted) => {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isInverted ? 440 : 659.25, now);
        osc.frequency.exponentialRampToValueAtTime(isInverted ? 659.25 : 440, now + 0.16);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
    },

    playRocketPulse: (progress = 0.5) => {
        if (!enabled) return;
        const nowMs = performance.now();
        if (nowMs - lastRocketTick < 95) return;
        lastRocketTick = nowMs;

        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const baseFreq = 260 + (1 - Math.max(0, Math.min(1, progress))) * 320;
        osc.frequency.setValueAtTime(baseFreq, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
    }
};
