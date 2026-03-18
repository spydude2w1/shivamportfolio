"use client"
import React, { useState } from 'react';
import { DragControls } from 'framer-motion';

type TitleBarProps = {
    title: string;
    onClose: () => void;
    dragControls?: DragControls;
    isActive?: boolean;
};

export function TitleBar({ title, onClose, dragControls, isActive = true }: TitleBarProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex items-center px-[12px] h-[38px] select-none border-b border-[#1a1a1a] flex-shrink-0 cursor-default"
            style={{
                background: isActive
                    ? 'linear-gradient(180deg, #3c3c3c 0%, #323232 100%)'
                    : 'linear-gradient(180deg, #323232 0%, #2a2a2a 100%)'
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                dragControls?.start(e);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex gap-[7px] items-center">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-[12px] h-[12px] rounded-full flex items-center justify-center cursor-default group"
                    style={{
                        background: isActive ? '#ff5f57' : 'rgba(255,255,255,0.2)',
                        border: isActive ? '1px solid #e0443e' : 'none'
                    }}
                >
                    {isHovered && isActive && <span className="text-black text-[9px] opacity-70 leading-none">✕</span>}
                </button>
                <button
                    className="w-[12px] h-[12px] rounded-full flex items-center justify-center cursor-default group"
                    style={{
                        background: isActive ? '#ffbd2e' : 'rgba(255,255,255,0.2)',
                        border: isActive ? '1px solid #dea123' : 'none'
                    }}
                >
                    {isHovered && isActive && <span className="text-black text-[9px] opacity-70 leading-none">−</span>}
                </button>
                <button
                    className="w-[12px] h-[12px] rounded-full flex items-center justify-center cursor-default group"
                    style={{
                        background: isActive ? '#28c840' : 'rgba(255,255,255,0.2)',
                        border: isActive ? '1px solid #1aab29' : 'none'
                    }}
                >
                    {isHovered && isActive && <span className="text-black text-[9px] opacity-70 leading-none">+</span>}
                </button>
            </div>
            <div
                className={`flex-1 text-center font-normal text-[13px] ml-[-60px] tracking-tight ${isActive ? 'text-[#dedede]' : 'text-[#888888]'}`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif' }}
            >
                {title}
            </div>
        </div>
    );
}
