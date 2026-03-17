"use client"
import React, { useState, useEffect } from 'react';
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

export function Desktop() {
    const { windows, isMobile, openWindow, closeWindow, minimizeWindow, bringToFront, updatePosition, activeWindowId, blurAll } = useWindowManager();

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
        <div className="relative w-screen h-screen overflow-hidden text-sm pt-0 md:pt-4">
            {/* Background Click Catcher - Unfocuses windows when clicking empty space */}
            <div className="absolute inset-0 z-[0]" onPointerDown={blurAll} />

            {/* Tahoe-style dark gradient desktop */}
            <div
                className="absolute inset-0 z-[-1] pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 60% at 30% 70%, rgba(20, 40, 80, 0.6) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 80% at 75% 25%, rgba(40, 20, 60, 0.4) 0%, transparent 65%),
                        radial-gradient(ellipse 100% 100% at 50% 50%, #0d1117 0%, #0a0a0f 100%)
                    `
                }}
            />
            {/* Grain overlay */}
            <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Aurora Shimmer */}
            <div className="aurora-base aurora-1"></div>
            <div className="aurora-base aurora-2"></div>

            {/* macOS Chrome Components */}
            {!isMobile && (
                <>
                    <MenuBar activeApp={activeWindowId ? "Terminal" : "Finder"} onAction={handleMenuAction} />
                    <DesktopIcons />
                    <Dock isMobile={isMobile} />
                </>
            )}

            {isMobile ? (
                // Mobile layout: Stack single window full width
                <div className="w-full h-full p-2 pb-safe">
                    {windows.filter(w => w.isVisible).map((win, idx, arr) => (
                        <div
                            key={win.id}
                            className="w-full h-full"
                            style={{ display: idx === arr.length - 1 ? 'block' : 'none' }} // Show only the topmost
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
                </div>
            ) : (
                // Desktop Layout
                windows.map(win => (
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
                ))
            )}
        </div>
    );
}
