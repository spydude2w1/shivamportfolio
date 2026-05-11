"use client";

import React, { useState } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { GRAVEYARD } from '../../lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export function GraveyardWindow() {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    return (
        <TerminalBody>
            <InputLine path="~/graveyard" readOnly value="ls -la /var/graveyard/" blinking={false} />

            <div className="mt-3 mb-4 ml-2 text-[13px] text-white/50 italic">
                {"// projects that didn't make it. every failure is a shipped lesson."}
            </div>

            <div className="flex flex-col gap-4 ml-1">
                {GRAVEYARD.map((entry, idx) => (
                    <motion.div
                        key={entry.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        className="group cursor-pointer"
                        onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    >
                        <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-[14px] p-4 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                            {/* Tombstone header */}
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-[15px] font-semibold text-white/90 flex items-center gap-2">
                                        <span className="text-[18px]">🪦</span>
                                        {entry.name}
                                    </h3>
                                    <p className="text-[12px] text-white/40 mt-1 font-mono">
                                        {entry.born} — {entry.died}
                                    </p>
                                </div>
                                <span className="text-[11px] text-red-400/70 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full font-medium">
                                    {entry.causeOfDeath}
                                </span>
                            </div>

                            <p className="text-[13px] text-white/60 italic mb-2">
                                "{entry.epitaph}"
                            </p>

                            {/* Expandable post-mortem */}
                            <AnimatePresence>
                                {expandedIdx === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 pt-3 border-t border-white/[0.08]">
                                            <div className="text-[11px] text-[var(--amber)] font-semibold uppercase tracking-wider mb-2">
                                                Post-Mortem
                                            </div>
                                            <p className="text-[13px] text-white/70 leading-relaxed">
                                                {entry.postMortem}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {expandedIdx !== idx && (
                                <div className="text-[11px] text-white/30 mt-1">
                                    click to read post-mortem →
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 text-[12px] text-white/30 ml-2 italic">
                {GRAVEYARD.length} projects resting in peace. each one taught me something money can't buy.
            </div>

            <div className="mt-2">
                <InputLine path="~/graveyard" blinking={true} />
            </div>
        </TerminalBody>
    );
}
