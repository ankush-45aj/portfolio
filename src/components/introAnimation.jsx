import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

export default function IntroAnimation({ onFinish }) {
    // ✅ Sanskrit Power Words
    const words = useMemo(
        () => [
            "बुद्ध्या",
            "धर्मेण",
            "न्यायेन",
            "विवेकेण",
            "सत्येन",
            "तेजसा",
            "विजयः",
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (index < words.length - 1) {
            const id = setTimeout(() => {
                setIndex((i) => i + 1);
            }, 400); // 👈 word change speed

            return () => clearTimeout(id);
        } else {
            const t = setTimeout(() => {
                setVisible(false); // 👈 exit animation
            }, 800);

            return () => clearTimeout(t);
        }
    }, [index, words.length]);

    return (
        <AnimatePresence onExitComplete={onFinish}>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{
                        duration: 1.05,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <motion.h1
                        key={index}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {words[index]}
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
