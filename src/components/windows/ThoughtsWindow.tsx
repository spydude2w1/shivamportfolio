"use client"
import React from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { THOUGHTS } from '../../lib/data';
import { ThoughtEntry } from '../ui/ThoughtEntry';

export function ThoughtsWindow() {
    return (
        <TerminalBody>
            <InputLine path="~/thoughts" readOnly value="ls" blinking={false} />

            <div className="text-[var(--muted)] my-2">
                {THOUGHTS.length} entries. most recent first.
            </div>

            <InputLine path="~/thoughts" readOnly value="cat *" blinking={false} />

            <div className="text-[var(--text)] whitespace-pre-wrap mt-2 mb-6">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>

            <div className="flex flex-col gap-6 max-w-[650px]">
                {THOUGHTS.map((t, idx) => (
                    <ThoughtEntry key={idx} thought={t} />
                ))}
            </div>

            <div className="text-[var(--text)] whitespace-pre-wrap mt-8 mb-4">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>

            <InputLine path="~/thoughts" blinking={true} />
        </TerminalBody>
    );
}
