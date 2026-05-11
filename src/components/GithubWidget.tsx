"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PERSON } from '../lib/data';

export function GithubWidget() {
    const githubUsername = PERSON.github.split('/').pop() || 'spydude2w1';
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-4 bottom-[100px] w-[300px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[20px] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-[5] pointer-events-auto"
        >
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => window.open(PERSON.github, '_blank')}>
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center p-[2px]">
                    <img src={`https://github.com/${githubUsername}.png`} className="w-full h-full rounded-full" alt="GitHub" />
                </div>
                <div>
                    <h3 className="text-white font-semibold text-[14px]">GitHub Activity</h3>
                    <p className="text-white/60 text-[12px] hover:text-white/80 transition-colors">@{githubUsername}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-full min-h-[90px] bg-white/[0.03] rounded-[12px] border border-white/[0.05] overflow-hidden flex items-center justify-center p-2">
                    <img 
                        src={`https://ghchart.rshah.org/4ec9a0/${githubUsername}`} 
                        alt="Github chart" 
                        className="w-full opacity-80" 
                    />
                </div>
                <div className="text-[11px] text-white/40 text-center mt-1">
                    Contributions in the last year
                </div>
            </div>
        </motion.div>
    );
}
