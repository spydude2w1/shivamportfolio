import React from 'react';
import { IoTerminal, IoDocumentText, IoFolder } from 'react-icons/io5';

export function DesktopIcons() {
    const icons = [
        { name: 'biswal-os.app', icon: <IoTerminal size={32} className="text-[#6cb6ff]" /> },
        { name: 'resume.pdf', icon: <IoDocumentText size={34} className="text-white" /> },
        { name: 'firsttrack-ai', icon: <IoFolder size={36} className="text-[#6cb6ff]" /> },
    ];

    return (
        <div className="absolute top-[48px] right-[16px] flex flex-col gap-6 p-4 z-[0]">
            {icons.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 group w-[80px] cursor-default">
                    <div className="w-[64px] h-[64px] rounded-xl flex items-center justify-center bg-black/20 border border-white/5 shadow-md group-hover:bg-black/40 transition-colors">
                        {item.icon}
                    </div>
                    <span
                        className="text-[12px] text-[rgba(255,255,255,0.9)] text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-hover:bg-[#0058d0] group-hover:text-white px-1 rounded-[4px]"
                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                    >
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
