const SCRAMBLE_CHARS = '.:-=+*#%@AD';
const activeTimers = new WeakMap();

export function scrambleElementText(el) {
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

    const original = el.dataset.origText || el.textContent || '';
    if (!el.dataset.origText) {
        el.dataset.origText = original;
    }

    const prev = activeTimers.get(el);
    if (prev) clearInterval(prev);

    let step = 0;
    const totalSteps = 8;

    const timer = setInterval(() => {
        step++;
        if (step >= totalSteps) {
            el.textContent = original;
            clearInterval(timer);
            activeTimers.delete(el);
            return;
        }
        const revealCount = Math.floor((step / totalSteps) * original.length);
        let next = '';
        for (let i = 0; i < original.length; i++) {
            const ch = original[i];
            if (ch === ' ' || ch === '↗' || ch === '✓' || i < revealCount) {
                next += ch;
            } else {
                next += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
            }
        }
        el.textContent = next;
    }, 24);

    activeTimers.set(el, timer);
}

export function attachMagneticMove(e, strengthX = 0.26, strengthY = 0.34) {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strengthX;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strengthY;
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
}

export function resetMagneticMove(e) {
    const el = e.currentTarget;
    el.style.transform = '';
}
