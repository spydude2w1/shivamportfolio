"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogoApple } from 'react-icons/io5';

const KERNEL_PANIC_TEXT = `panic(cpu 0 caller 0xffffff7f8a2c1234): "a]
@/BuildRoot/Library/Caches/com.apple.xbs/Sources/xnu/xnu-8020.240.7/osfmk/i386/trap_native.c:220
Debugger message: panic
Memory ID: 0x6
OS version: ShivamOS 16.0
Kernel version: Shivam Kernel Version 22.6.0: root:xnu-8796.141.3~1/RELEASE_ARM64
Kernel UUID: B3A4C2D1-8F90-4E2A-9C71-0x42069F00D
Kernel slide: 0x000000000dc00000
Kernel text base: 0xffffff800e000000
__HIB text base: 0xffffff8006c00000
System model name: ShivamBook Pro (16-inch, 2010)
System shutdown begun: NO
Panic diags file unavailable, panic occurred prior to initialization
Machine-check exception: coffee_overflow_error
Core: Overclocked Neural Net v4.2 — THERMAL LIMIT EXCEEDED

** SYSTEM WILL RECOVER IN 3 SECONDS **`;

const RECOVERY_MESSAGE = "Just kidding. Everything's fine. Unlike my sleep schedule.";

export function BootScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'panic' | 'recovery' | 'boot'>('boot');

    useEffect(() => {
        // 1% chance of kernel panic (use 100 for testing)
        const shouldPanic = Math.random() < 0.01;

        if (shouldPanic) {
            setPhase('panic');
            // Show panic for 3 seconds
            const panicTimer = setTimeout(() => {
                setPhase('recovery');
                // Show recovery message for 2 seconds
                const recoveryTimer = setTimeout(() => {
                    setPhase('boot');
                }, 2000);
                return () => clearTimeout(recoveryTimer);
            }, 3000);
            return () => clearTimeout(panicTimer);
        }
    }, []);

    useEffect(() => {
        if (phase !== 'boot') return;

        const duration = 2400;
        const startTime = Date.now();

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const nextProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(nextProgress);

            if (nextProgress < 100) {
                requestAnimationFrame(update);
            } else {
                setTimeout(onComplete, 400);
            }
        };

        requestAnimationFrame(update);
    }, [onComplete, phase]);

    // Kernel Panic Screen
    if (phase === 'panic') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black p-8"
            >
                <div className="max-w-[700px] w-full">
                    <pre className="text-[11px] md:text-[13px] font-mono text-white/90 leading-relaxed whitespace-pre-wrap break-all animate-pulse">
                        {KERNEL_PANIC_TEXT}
                    </pre>
                </div>
            </motion.div>
        );
    }

    // Recovery Screen
    if (phase === 'recovery') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="text-[40px] mb-4">😅</div>
                    <p className="text-white text-[16px] font-medium mb-2">{RECOVERY_MESSAGE}</p>
                    <p className="text-white/40 text-[13px]">Rebooting...</p>
                </motion.div>
            </motion.div>
        );
    }

    // Normal Boot Screen
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
