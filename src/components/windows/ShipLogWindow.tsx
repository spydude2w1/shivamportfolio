"use client";

import React, { useState } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { SHIP_LOG, ShipLogEntry } from '../../lib/data';
import { motion } from 'framer-motion';

const STATUS_CONFIG = {
    live: { emoji: '🟢', label: 'Live', color: 'text-green-400' },
    beta: { emoji: '🟡', label: 'Beta', color: 'text-yellow-400' },
    sunset: { emoji: '🔴', label: 'Sunset', color: 'text-red-400' },
};

type FilterStatus = 'all' | 'live' | 'beta' | 'sunset';

export function ShipLogWindow() {
    const [filter, setFilter] = useState<FilterStatus>('all');

    const filtered = filter === 'all' ? SHIP_LOG : SHIP_LOG.filter(e => e.status === filter);

    return (
        <TerminalBody>
            <InputLine path="~/shiplog" readOnly value="git log --oneline --decorate" blinking={false} />

            <div className="flex gap-3 mt-3 mb-4 ml-2">
                {(['all', 'live', 'beta', 'sunset'] as FilterStatus[]).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-[12px] px-3 py-1 rounded-full border transition-all ${
                            filter === f
                                ? 'bg-white/15 border-white/30 text-white font-semibold'
                                : 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'
                        }`}
                    >
                        {f === 'all' ? '✦ All' : `${STATUS_CONFIG[f].emoji} ${STATUS_CONFIG[f].label}`}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-1 ml-1">
                {filtered.map((entry, idx) => (
                    <motion.div
                        key={entry.hash}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        className="group relative pl-6 pb-4 border-l border-white/10 last:border-l-0"
                    >
                        {/* Timeline dot */}
                        <div className={`absolute left-[-5px] top-[6px] w-[10px] h-[10px] rounded-full border-2 border-[#1c1c1e] ${
                            entry.status === 'live' ? 'bg-green-400' :
                            entry.status === 'beta' ? 'bg-yellow-400' : 'bg-red-400/60'
                        }`} />

                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-[var(--amber)] font-mono text-[12px] opacity-70">{entry.hash}</span>
                            <span className="text-white/30 text-[11px]">•</span>
                            <span className="text-white/40 text-[12px] font-mono">{entry.date}</span>
                            <span className={`text-[11px] font-semibold ${STATUS_CONFIG[entry.status].color}`}>
                                {STATUS_CONFIG[entry.status].emoji} {STATUS_CONFIG[entry.status].label}
                            </span>
                        </div>

                        <div className="text-[var(--text-bright)] text-[13px] font-medium mb-1">
                            {entry.message}
                        </div>

                        <div className="text-white/40 text-[12px] leading-relaxed group-hover:text-white/60 transition-colors">
                            {entry.description}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 text-[11px] text-white/30 ml-2">
                {filtered.length} commit{filtered.length !== 1 ? 's' : ''} shown. {SHIP_LOG.length} total shipped.
            </div>

            <div className="mt-2">
                <InputLine path="~/shiplog" blinking={true} />
            </div>
        </TerminalBody>
    );
}
