"use client"
import React from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { TIMELINE } from '../../lib/data';
import { TimelineRow } from '../ui/TimelineRow';

export function TimelineWindow() {
    return (
        <TerminalBody>
            <InputLine path="~/timeline" readOnly value="cat timeline.txt" blinking={false} />

            <div className="font-mono text-[13px] mt-2 mb-6 text-[var(--text)] whitespace-pre-wrap">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  achievements & timeline/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>

            <div className="flex flex-col gap-8 ml-0 sm:ml-[16px] max-w-[650px] relative">
                <div className="absolute left-[34px] sm:left-[64px] top-2 bottom-2 w-px bg-[var(--surface2)] z-0" />
                {TIMELINE.map((item, idx) => (
                    <div key={idx} className="z-10 bg-[var(--bg)] py-1">
                        <TimelineRow {...item} />
                    </div>
                ))}
            </div>

            <div className="text-[var(--text)] whitespace-pre-wrap mt-8 mb-4">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>

            <InputLine path="~/timeline" blinking={true} />
        </TerminalBody>
    );
}
