"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogoApple } from 'react-icons/io5';

export function BootScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const duration = 2400; // 2.4s boot
        const startTime = Date.now();

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const nextProgress = Math.min((elapsed / duration) * 100, 100);
            
            setProgress(nextProgress);

            if (nextProgress < 100) {
                requestAnimationFrame(update);
            } else {
                setTimeout(onComplete, 400); // Small delay then trigger complete
            }
        };

        requestAnimationFrame(update);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-12"
            >
                <IoLogoApple size={80} color="white" />
            </motion.div>

            <div className="relative h-[4px] w-[140px] overflow-hidden rounded-full bg-white/20">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </motion.div>
    );
}
