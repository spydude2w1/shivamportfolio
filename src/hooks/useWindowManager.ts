import { useState, useCallback, useEffect } from 'react';
import { WindowState, SectionKey } from '../types';

const DEFAULT_SIZES: Record<SectionKey, { width: number, height: number }> = {
    main: { width: 680, height: 480 },
    projects: { width: 700, height: 520 },
    about: { width: 700, height: 520 },
    skills: { width: 700, height: 520 },
    thoughts: { width: 700, height: 520 },
    timeline: { width: 700, height: 520 },
    contact: { width: 700, height: 520 },
    manual: { width: 760, height: 560 },
};

const OFFSETS = {
    main: { x: 0, y: 19 },
    projects: { x: 30, y: 30 },
    about: { x: 60, y: 60 },
    skills: { x: 90, y: 90 },
    thoughts: { x: 120, y: 120 },
    timeline: { x: 150, y: 150 },
    contact: { x: 180, y: 180 },
    manual: { x: 210, y: 210 },
};

export function useWindowManager() {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const openWindow = useCallback((section: SectionKey, customTitle?: string) => {
        setWindows(prev => {
            // If already open, just focus it
            const existing = prev.find(w => w.section === section);
            if (existing) {
                focusWindow(existing.id);
                return prev.map(w =>
                    w.id === existing.id
                        ? { ...w, isMinimized: false, isVisible: true }
                        : w
                );
            }


            const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
            const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
            const size = DEFAULT_SIZES[section];
            const offset = OFFSETS[section] || { x: 0, y: 0 };

            const newWin: WindowState = {
                id: `win-${Date.now()}-${section}`,
                title: customTitle || `shivam@biswal — ~/${section}`,
                section,
                position: {
                    x: cx - size.width / 2 + offset.x,
                    y: cy - size.height / 2 + offset.y
                },
                size,
                isMinimized: false,
                zIndex: nextZIndex,
                isVisible: true
            };

            setActiveWindowId(newWin.id);
            setNextZIndex(z => z + 1);
            return [...prev, newWin];
        });
    }, [nextZIndex]);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const minimizeWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true, isVisible: false } : w));
    }, []);

    const focusWindow = useCallback((id: string) => {
        setNextZIndex(z => z + 1);
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    }, [nextZIndex]);

    const bringToFront = focusWindow;

    const updatePosition = useCallback((id: string, position: { x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
    }, []);

    const blurAll = useCallback(() => {
        setActiveWindowId(null);
    }, []);

    useEffect(() => {
        if (windows.length === 0) {
            openWindow('main', 'shivam@biswal — ~/');
        }
    }, [openWindow, windows.length]);

    return {
        windows,
        activeWindowId,
        isMobile,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        bringToFront,
        updatePosition,
        blurAll,
    };
}
