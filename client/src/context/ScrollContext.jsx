import { createContext, useContext, useMemo } from 'react';

const ScrollContext = createContext({
    lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    // High-performance controller: preserves full API compatibility for start/stop/scrollTo
    // while allowing the browser's native hardware compositor to handle 120Hz/144Hz scroll with 0 input lag.
    const lenis = useMemo(() => ({
        start: () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        },
        stop: () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        },
        scrollTo: (target) => {
            if (typeof window === 'undefined') return;
            if (typeof target === 'string') {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else if (typeof target === 'number') {
                window.scrollTo({ top: target, behavior: 'smooth' });
            }
        }
    }), []);

    return (
        <ScrollContext.Provider value={{ lenis }}>
            {children}
        </ScrollContext.Provider>
    );
};
