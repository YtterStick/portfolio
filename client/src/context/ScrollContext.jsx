import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({
    lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduced) return;

        const instance = new Lenis({
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        instance.on('scroll', ScrollTrigger.update);
        const tickerCallback = (time) => {
            instance.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        setLenis(instance);
        window.__lenis = instance;

        return () => {
            gsap.ticker.remove(tickerCallback);
            instance.destroy();
            window.__lenis = null;
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ lenis }}>
            {children}
        </ScrollContext.Provider>
    );
};
