import { IoHappyOutline, IoTerminal, IoCompass, IoCodeSlash, IoDocumentText, IoImage, IoSettings, IoTrashOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export function Dock({ isMobile }: { isMobile: boolean }) {
    const docks = [
        { id: 'finder', name: 'Finder', icon: <img src="/icons/Finder_Icon_macOS_Big_Sur.png" className="w-full h-full object-contain p-[2px]" alt="Finder" />, active: false, bg: '' },
        { id: 'terminal', name: 'Terminal', icon: <img src="/icons/terminal-2021-06-03.webp" className="w-full h-full object-contain p-[6px]" alt="Terminal" />, active: true, bg: 'bg-[#1c1c1e]' },
        { id: 'safari', name: 'Safari', icon: <img src="/icons/safari-2025-11-14.webp" className="w-full h-full object-contain" alt="Safari" />, active: false, bg: '' },
        { id: 'vscode', name: 'VS Code', icon: <IoCodeSlash size={24} className="text-white drop-shadow-sm" />, active: true, bg: 'bg-[#007AFF]' },
        // Only show these on desktop
        ...(!isMobile ? [
            { id: 'divider', isDivider: true },
            { id: 'notes', name: 'Notes', icon: <img src="/icons/notes-2025-11-13.webp" className="w-full h-full object-contain" alt="Notes" />, active: false, bg: '' },
            { id: 'photos', name: 'Photos', icon: <img src="/icons/493155.webp" className="w-full h-full object-contain" alt="Photos" />, active: false, bg: '' },
            { id: 'settings', name: 'System Settings', icon: <img src="/icons/system-settings-2025-11-14.webp" className="w-full h-full object-contain p-[4px]" alt="Settings" />, active: false, bg: '' },
            { id: 'trash', name: 'Trash', icon: <IoTrashOutline size={26} className="text-white/80" />, active: false, bg: 'bg-gradient-to-b from-[#4C4C50]/50 to-[#2C2C2E]/50 border border-white/10' },
        ] : [])
    ];

    return (
        <div className="fixed bottom-[12px] left-1/2 -translate-x-1/2 rounded-[24px] p-[8px_10px] flex items-end gap-[10px] z-[9900]"
            style={{
                background: 'rgba(50, 50, 55, 0.45)',
                backdropFilter: 'blur(50px) saturate(200%)',
                WebkitBackdropFilter: 'blur(50px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
            {docks.map((item, i) => {
                if (item.isDivider) {
                    return (
                        <div key={item.id} className="w-[1px] h-[36px] bg-[rgba(255,255,255,0.15)] mx-[2px] mb-[8px]" />
                    );
                }

                return (
                    <motion.div
                        key={item.id}
                        whileHover={{ y: -8, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="dock-icon-wrapper flex flex-col items-center justify-end relative group cursor-pointer mb-[6px]"
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            <div className="absolute -top-[58px] bg-[rgba(30,30,35,0.7)] backdrop-blur-xl px-[12px] py-[6px] rounded-[10px] text-[#f0f0f0] text-[13px] font-semibold tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_sans-serif] scale-90 group-hover:scale-100 -translate-y-2 group-hover:translate-y-0">
                                {item.name}
                                {/* Tooltip Triangle */}
                                <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[rgba(30,30,35,0.7)]"></div>
                            </div>
                        </AnimatePresence>

                        {/* Icon Container (Squircle Style) */}
                        <div className={cn("w-[52px] h-[52px] rounded-[14px] flex items-center justify-center flex-shrink-0 transition-all relative overflow-hidden shadow-2xl", item.bg)}
                            style={{
                                boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)'
                            }}>
                            {/* Inner Top Gloss */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[14px]" />
                            {item.icon}
                        </div>

                        {/* Active Indicator */}
                        {item.active && (
                            <motion.div
                                layoutId={`active-dot-${item.id}`}
                                className="absolute -bottom-[8px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.95)] shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
