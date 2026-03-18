import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { IoLogoApple, IoWifiSharp, IoBatteryHalfOutline, IoSearchOutline, IoOptionsOutline } from 'react-icons/io5';
import { ControlCenter } from './ControlCenter';

export type MenuAction = 'new_window' | 'close_window' | 'minimize' | 'reload' | 'projects' | 'about';

export function MenuBar({
    activeApp,
    onAction,
    onOpenResume,
    onToggleMusic,
    isMusicOpen
}: {
    activeApp: string,
    onAction?: (action: MenuAction) => void,
    onOpenResume: () => void,
    onToggleMusic: () => void,
    isMusicOpen: boolean
}) {
    const [time, setTime] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isControlCenterOpen, setControlCenterOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const timeString = new Date().toLocaleTimeString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setTime(timeString.replace(/,/g, ''));
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);

        const handleClickOutside = (e: PointerEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setActiveMenu(null);
                setControlCenterOpen(false);
            }
        };
        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            clearInterval(interval);
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (menu: string) => {
        if (activeMenu === menu) setActiveMenu(null);
        else setActiveMenu(menu);
        setControlCenterOpen(false);
    };

    const handleAction = (action: MenuAction) => {
        setActiveMenu(null);
        if (onAction) onAction(action);
    };

    // Menu dropdown liquid animation variants
    const menuVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.96,
            y: -10,
            filter: 'blur(8px)',
            transformOrigin: 'top left'
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.5,
                duration: shouldReduceMotion ? 0 : 0.4
            }
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            y: -4,
            filter: 'blur(6px)',
            transition: {
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    };

    const liquidMenuClasses = "absolute top-[100%] left-0 mt-2 w-[220px] bg-[rgba(30,30,35,0.6)] backdrop-blur-[16px] saturate-[200%] border border-white/15 rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.2)] p-1.5 z-50 font-normal origin-top-left overflow-hidden";
    const liquidItemClasses = "flex justify-between px-3 py-1.5 text-white/90 hover:bg-[#007AFF] hover:text-white rounded-[8px] cursor-pointer transition-colors duration-150 relative overflow-hidden group";

    return (
        <div ref={ref} className="absolute top-[8px] left-[16px] w-[calc(100vw-32px)] h-[28px] rounded-full flex items-center justify-between px-[16px] z-[9900]"
            style={{
                background: 'rgba(20, 20, 22, 0.35)',
                backdropFilter: 'blur(32px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(32px) saturate(200%) brightness(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.4)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
            }}>

            <div className="flex items-center space-x-1 cursor-default text-[13px] font-medium tracking-tight">
                <div onClick={() => toggleMenu('apple')} className="relative px-3 py-[2px] rounded-full hover:bg-white/20 transition-colors cursor-pointer active:bg-white/30">
                    <IoLogoApple size={15} color="white" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    <AnimatePresence>
                        {activeMenu === 'apple' && (
                            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className={liquidMenuClasses}>
                                <div className={liquidItemClasses} onClick={() => handleAction('about')}>About This Mac</div>
                                <div className="h-[1px] bg-white/15 my-1.5 mx-2" />
                                <div className={liquidItemClasses} onClick={() => handleAction('reload')}>Restart...</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <span className="text-white font-bold px-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{activeApp}</span>

                <div onClick={() => toggleMenu('file')} className="relative px-3 py-[2px] rounded-full hover:bg-white/20 transition-colors hidden sm:block cursor-pointer text-white/95 active:bg-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    File
                    <AnimatePresence>
                        {activeMenu === 'file' && (
                            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className={liquidMenuClasses}>
                                <div className={liquidItemClasses} onClick={() => handleAction('new_window')}>
                                    <span className="relative z-10">New Terminal Window</span>
                                    <span className="opacity-50 relative z-10 font-[system-ui]">⌘N</span>
                                </div>
                                <div className="h-[1px] bg-white/15 my-1.5 mx-2" />
                                <div className={liquidItemClasses} onClick={() => handleAction('close_window')}>
                                    <span className="relative z-10">Close Window</span>
                                    <span className="opacity-50 relative z-10 font-[system-ui]">⌘W</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div onClick={() => toggleMenu('edit')} className="relative px-3 py-[2px] rounded-full hover:bg-white/20 transition-colors hidden sm:block cursor-pointer text-white/95 active:bg-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    Edit
                    <AnimatePresence>
                        {activeMenu === 'edit' && (
                            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className={liquidMenuClasses}>
                                <div className="flex justify-between px-3 py-1.5 text-white/40 cursor-pointer rounded-[8px]">
                                    <span>Can't Undo</span>
                                    <span className="opacity-50 font-[system-ui]">⌘Z</span>
                                </div>
                                <div className="h-[1px] bg-white/15 my-1.5 mx-2" />
                                <div className={liquidItemClasses}>
                                    <span className="relative z-10">Copy</span>
                                    <span className="opacity-50 relative z-10 font-[system-ui]">⌘C</span>
                                </div>
                                <div className={liquidItemClasses}>
                                    <span className="relative z-10">Paste</span>
                                    <span className="opacity-50 relative z-10 font-[system-ui]">⌘V</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div onClick={() => toggleMenu('view')} className="relative px-3 py-[2px] rounded-full hover:bg-white/20 transition-colors hidden sm:block cursor-pointer text-white/95 active:bg-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    View
                    <AnimatePresence>
                        {activeMenu === 'view' && (
                            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className={liquidMenuClasses}>
                                <div className={liquidItemClasses} onClick={() => handleAction('projects')}><span className="relative z-10">View Projects</span></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div onClick={() => toggleMenu('window')} className="relative px-3 py-[2px] rounded-full hover:bg-white/20 transition-colors hidden sm:block cursor-pointer text-white/95 active:bg-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    Window
                    <AnimatePresence>
                        {activeMenu === 'window' && (
                            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className={liquidMenuClasses}>
                                <div className={liquidItemClasses} onClick={() => handleAction('minimize')}>
                                    <span className="relative z-10">Minimize</span>
                                    <span className="opacity-50 relative z-10 font-[system-ui]">⌘M</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    type="button"
                    onClick={onOpenResume}
                    className="hidden sm:block rounded-full px-3 py-[2px] text-white/95 transition-colors hover:bg-white/20 active:bg-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                >
                    Resume
                </button>
            </div>

            <div className="flex items-center space-x-[16px] text-white/95 font-medium tracking-tight cursor-default relative">
                <IoBatteryHalfOutline size={21} className="hover:opacity-80 transition-opacity cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                <IoWifiSharp size={19} className="hover:opacity-80 transition-opacity cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                <IoSearchOutline size={18} className="hover:opacity-80 transition-opacity cursor-pointer stroke-[40px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />

                <div
                    className={`relative p-1 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${isControlCenterOpen ? 'bg-white/25 shadow-inner' : ''}`}
                    onClick={() => {
                        setControlCenterOpen(!isControlCenterOpen);
                        setActiveMenu(null);
                    }}
                >
                    <IoOptionsOutline size={19} />
                </div>

                <span className="text-[13px] ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-semibold">{time}</span>
            </div>

            <ControlCenter
                isOpen={isControlCenterOpen}
                onClose={() => setControlCenterOpen(false)}
                onToggleMusic={onToggleMusic}
                isMusicOpen={isMusicOpen}
            />
        </div>
    );
}
