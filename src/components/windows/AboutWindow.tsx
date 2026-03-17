"use client"
import React from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { PERSON } from '../../lib/data';

export function AboutWindow() {
    return (
        <TerminalBody>
            <InputLine path="~/about" readOnly value="cat about.txt" blinking={false} />
            <div className="font-mono text-[13px] leading-[1.7] whitespace-pre-wrap mt-2 select-text">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${PERSON.name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  operating out of bengaluru, india.

  founder of firsttrack ai.
  building it while still in school.

  technical lead at green credit (2024–2025).
  built the AI backbone end-to-end.

  won eureka! junior 2025 at iit bombay.
  team: net zero ninja. rank 1. national.

  started designing at 14.
  still do. that's where the taste comes from.

  i stay close to the code even when i'm leading.
  engineering, product, and design — simultaneously.
  most people pick one. i haven't.

  currently obsessing over agentic workflows
  and how far you can push production-grade AI
  without it becoming a liability.

  graduating 2027. building until then. and after.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>
            <div className="mt-2">
                <InputLine path="~/about" blinking={true} />
            </div>
        </TerminalBody>
    );
}
