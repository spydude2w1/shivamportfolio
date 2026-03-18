"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useWindowManager } from '../hooks/useWindowManager';
import { Window } from './Window';
import { MainWindow } from './windows/MainWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { AboutWindow } from './windows/AboutWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { ThoughtsWindow } from './windows/ThoughtsWindow';
import { TimelineWindow } from './windows/TimelineWindow';
import { ContactWindow } from './windows/ContactWindow';
import { ManualWindow } from './windows/ManualWindow';
import { SectionKey } from '../types';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';
import { openResumePdf } from '../lib/systemActions';
import { BootScreen } from './BootScreen';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = dynamic(
    () => import('./MusicPlayer/MusicPlayer').then((module) => module.MusicPlayer),
    { ssr: false }
);

export function Desktop() {
    const [booting, setBooting] = React.useState(true);
    const {
        windows,
        isMobile,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
        updatePosition,
        activeWindowId,
        blurAll
    } = useWindowManager();
    const [isMusicOpen, setIsMusicOpen] = React.useState(false);

    const renderContent = (section: SectionKey) => {
        switch (section) {
            case 'main': return <MainWindow onNavigate={openWindow} />;
            case 'projects': return <ProjectsWindow />;
            case 'about': return <AboutWindow />;
            case 'skills': return <SkillsWindow />;
            case 'thoughts': return <ThoughtsWindow />;
            case 'timeline': return <TimelineWindow />;
            case 'contact': return <ContactWindow />;
            case 'manual': return <ManualWindow onNavigate={openWindow} />;
            default: return null;
        }
    };

    const handleMenuAction = (action: string) => {
        if (action === 'reload') window.location.reload();
        else if (action === 'new_window') openWindow('manual', 'New Terminal');
        else if (action === 'close_window' && activeWindowId) closeWindow(activeWindowId);
        else if (action === 'minimize' && activeWindowId) minimizeWindow(activeWindowId);
        else if (action === 'projects') openWindow('projects');
        else if (action === 'about') openWindow('about');
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden pt-0 text-sm md:pt-4 bg-[#0a0a0f]">
            {/* System Wallpaper - Always On Layer (z=1) */}
            <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    backgroundImage: 'url("/icons/26-Tahoe-Light-6K.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Subtle Grain Overlay (z=2) */}
            <div
                className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Aurora Atmosphere Layers (z=3) */}
            <div className="aurora-base aurora-1 z-[3]" />
            <div className="aurora-base aurora-2 z-[3]" />

            <div className="relative z-[10] h-full w-full">
                <AnimatePresence>
                    {booting ? (
                        <BootScreen key="boot" onComplete={() => setBooting(false)} />
                    ) : (
                        <motion.div
                            key="desktop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative h-full w-full"
                        >
                            <div className="absolute inset-0 z-[0]" onPointerDown={blurAll} />

                            {!isMobile && (
                                <>
                                    <MenuBar
                                        activeApp={activeWindowId ? "Terminal" : "Finder"}
                                        onAction={handleMenuAction}
                                        onOpenResume={openResumePdf}
                                        onToggleMusic={() => setIsMusicOpen((value) => !value)}
                                        isMusicOpen={isMusicOpen}
                                    />
                                    <DesktopIcons />
                                    <Dock isMobile={isMobile} />
                                </>
                            )}

                            {isMobile ? (
                                <div className="h-full w-full p-2 pb-safe">
                                    <AnimatePresence>
                                    {windows.filter((windowState) => windowState.isVisible).map((win, idx, arr) => (
                                        <div
                                            key={win.id}
                                            className="h-full w-full"
                                            style={{ display: idx === arr.length - 1 ? 'block' : 'none' }}
                                        >
                                            <Window
                                                {...win}
                                                isMobile={true}
                                                isActive={true}
                                                onClose={() => closeWindow(win.id)}
                                                onFocus={() => { }}
                                                onUpdatePosition={() => { }}
                                            >
                                                {renderContent(win.section)}
                                            </Window>
                                        </div>
                                    ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <AnimatePresence>
                                {windows.map((win) => (
                                    <Window
                                        key={win.id}
                                        {...win}
                                        isMobile={false}
                                        isActive={win.id === activeWindowId}
                                        onClose={() => closeWindow(win.id)}
                                        onFocus={() => bringToFront(win.id)}
                                        onUpdatePosition={(pos: { x: number, y: number }) => updatePosition(win.id, pos)}
                                    >
                                        {renderContent(win.section)}
                                    </Window>
                                ))}
                                </AnimatePresence>
                            )}

                            <MusicPlayer isVisible={isMusicOpen} onClose={() => setIsMusicOpen(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
