"use client"
import React from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { SKILLS } from '../../lib/data';
import { SkillTag } from '../ui/SkillTag';

export function SkillsWindow() {
    return (
        <TerminalBody>
            <InputLine path="~/skills" readOnly value="cat skills.txt" blinking={false} />
            <div className="font-mono text-[13px] mt-2 mb-2">
                <div className="text-[var(--text)] whitespace-pre-wrap mb-4">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  technical/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>
                <div className="flex flex-row flex-wrap gap-2 max-w-[600px] mb-8 lg:mb-12">
                    {SKILLS.technical.map(s => <SkillTag key={s} skill={s} />)}
                </div>

                <div className="text-[var(--text)] whitespace-pre-wrap mb-4">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  creative/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>
                <div className="flex flex-row flex-wrap gap-2 max-w-[600px] mb-8">
                    {SKILLS.creative.map(s => <SkillTag key={s} skill={s} />)}
                </div>

                <div className="text-[var(--text)] whitespace-pre-wrap mb-4">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>
            </div>

            <InputLine path="~/skills" blinking={true} />
        </TerminalBody>
    );
}
