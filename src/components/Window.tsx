"use client"
import React from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { TitleBar } from './TitleBar';
import { WindowState } from '../types';

type WindowProps = WindowState & {
    isMobile: boolean;
    isActive: boolean;
    onClose: () => void;
    onFocus: () => void;
    onUpdatePosition: (pos: { x: number, y: number }) => void;
    children: React.ReactNode;
};

export function Window({
    id,
    title,
    position,
    size,
    zIndex,
    isMobile,
    isActive,
    onClose,
    onFocus,
    onUpdatePosition,
    children
}: WindowProps) {
    const dragControls = useDragControls();

    // Explicitly track the visual drag delta and reset it to zero after drag
    // so it doesn't duplicate the translation when React updates the absolute left/top
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);

    if (isMobile) {
        return (
            <div
                className="flex flex-col rounded-[10px] overflow-hidden bg-bg shadow-2xl border border-border w-full h-full max-h-[90vh]"
                style={{
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)'
                }}
            >
                <TitleBar title={title} onClose={onClose} />
                <div className="flex-1 overflow-auto bg-bg p-4 flex flex-col relative no-scrollbar">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false} // Only titlebar can trigger drag
            dragMomentum={false}
            onDragEnd={() => {
                onUpdatePosition({
                    x: position.x + dragX.get(),
                    y: position.y + dragY.get()
                });
                dragX.set(0);
                dragY.set(0);
            }}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onPointerDownCapture={onFocus}
            style={{
                x: dragX,
                y: dragY,
                position: 'absolute',
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
                zIndex: zIndex,
                boxShadow: isActive
                    ? '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)'
            }}
            className="flex flex-col rounded-[10px] overflow-hidden bg-bg border border-border"
        >
            <TitleBar
                title={title}
                onClose={onClose}
                dragControls={dragControls}
                isActive={isActive}
            />
            <div className="flex-1 overflow-auto bg-bg p-[16px_20px] flex flex-col relative no-scrollbar">
                {children}
            </div>
        </motion.div>
    );
}
