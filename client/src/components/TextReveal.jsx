import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TextReveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0 }
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default TextReveal;
