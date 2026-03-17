import React from 'react';
import { IoHappyOutline, IoTerminal, IoCompass, IoCodeSlash, IoDocumentText, IoImage, IoSettings, IoTrashOutline } from 'react-icons/io5';
import { cn } from '../lib/utils';

export function Dock({ isMobile }: { isMobile: boolean }) {
    const docks = [
        { id: 'finder', name: 'Finder', icon: <IoHappyOutline size={30} className="text-white drop-shadow-sm" />, active: false, bg: 'bg-gradient-to-b from-[#00A1FF] to-[#0070F5]' },
        { id: 'terminal', name: 'Terminal', icon: <IoTerminal size={26} className="text-[#323232]" />, active: true, bg: 'bg-gradient-to-b from-[#4C4C50] to-[#2C2C2E]' },
        { id: 'safari', name: 'Safari', icon: <IoCompass size={38} className="text-white drop-shadow-md" />, active: false, bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4EBAFF] to-[#0070F5]' },
        { id: 'vscode', name: 'VS Code', icon: <IoCodeSlash size={24} className="text-white drop-shadow-sm" />, active: true, bg: 'bg-[#007AFF]' },
        // Only show these on desktop
        ...(!isMobile ? [
            { id: 'divider', isDivider: true },
            { id: 'notes', name: 'Notes', icon: <IoDocumentText size={30} className="text-[#F2C94C] drop-shadow-sm" />, active: false, bg: 'bg-gradient-to-b from-white to-[#F5F5F5]' },
            { id: 'photos', name: 'Photos', icon: <IoImage size={28} className="text-white drop-shadow-sm" />, active: false, bg: 'bg-gradient-to-br from-[#FF3B30] via-[#FF9500] to-[#4CD964]' },
            { id: 'settings', name: 'System Settings', icon: <IoSettings size={30} className="text-[#F0F0F0] drop-shadow-sm" />, active: false, bg: 'bg-gradient-to-b from-[#A1A1A6] to-[#71717A]' },
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
                    <div key={item.id} className="dock-icon-wrapper flex flex-col items-center justify-end relative group cursor-pointer mb-[6px]">

                        {/* Tooltip */}
                        <div className="absolute -top-[52px] bg-[rgba(30,30,35,0.6)] backdrop-blur-xl px-[12px] py-[6px] rounded-[6px] text-[#f0f0f0] text-[13px] font-medium tracking-tight opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[rgba(255,255,255,0.15)] shadow-[0_4px_16px_rgba(0,0,0,0.4)] font-['SF_Pro_Text',_-apple-system,_BlinkMacSystemFont,_sans-serif]">
                            {item.name}
                            {/* Tooltip Triangle */}
                            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[rgba(30,30,35,0.6)] backdrop-blur-xl"></div>
                        </div>

                        {/* Icon Container (Squircle Style) */}
                        <div className={cn("w-[52px] h-[52px] rounded-[14px] flex items-center justify-center flex-shrink-0 transition-transform relative overflow-hidden", item.bg)}
                            style={{
                                boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }}>
                            {/* Inner Top Gloss */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[14px]" />
                            {item.icon}
                        </div>

                        {/* Active Indicator */}
                        {item.active && (
                            <div className="absolute -bottom-[7px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.8)] shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
