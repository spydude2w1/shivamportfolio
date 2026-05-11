import React from 'react';

export function AboutThisMacWindow() {
    return (
        <div className="flex flex-col items-center h-full p-6 text-white bg-[#1c1c1e] overflow-y-auto no-scrollbar rounded-b-xl">
            <div className="flex flex-col items-center mt-4">
                <div className="w-24 h-24 mb-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white/20">
                    <img src="https://github.com/spydude2w1.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-[26px] font-semibold tracking-tight mb-1">Shivam OS</h1>
                <p className="text-[13px] text-white/50 mb-6 font-medium">Version 16.0 (Built 2010)</p>
            </div>
            
            <div className="w-full max-w-[320px] space-y-[10px] text-[13px] mt-2 font-medium">
                <div className="flex">
                    <span className="w-24 text-white/50 text-right pr-4 font-semibold">Brain</span>
                    <span className="text-white">Overclocked Neural Net</span>
                </div>
                <div className="flex">
                    <span className="w-24 text-white/50 text-right pr-4 font-semibold">Memory</span>
                    <span className="text-white">Photographic (mostly)</span>
                </div>
                <div className="flex">
                    <span className="w-24 text-white/50 text-right pr-4 font-semibold">Startup Disk</span>
                    <span className="text-white">Macintosh HD (Coffee)</span>
                </div>
                <div className="flex">
                    <span className="w-24 text-white/50 text-right pr-4 font-semibold">Graphics</span>
                    <span className="text-white">Pixel Perfect Pro Max</span>
                </div>
                <div className="flex">
                    <span className="w-24 text-white/50 text-right pr-4 font-semibold">Serial Number</span>
                    <span className="text-white">SB-2010-BENGALURU</span>
                </div>
            </div>

            <div className="flex gap-2 mt-8">
                <button className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded-[6px] text-[13px] font-medium transition-colors border border-white/5 shadow-sm">
                    System Report...
                </button>
                <button className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded-[6px] text-[13px] font-medium transition-colors border border-white/5 shadow-sm">
                    Software Update...
                </button>
            </div>

            <div className="mt-8 pt-4 w-full max-w-[320px] text-center">
                <p className="text-[11px] text-white/40">™ and © 2010-2027 Shivam Biswal.</p>
                <p className="text-[11px] text-white/40">All Rights Reserved.</p>
            </div>
        </div>
    );
}
