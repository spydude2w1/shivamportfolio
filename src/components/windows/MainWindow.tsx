"use client"
import React, { useState, useEffect } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { MenuItem } from '../ui/MenuItem';
import { useAutoType } from '../../hooks/useAutoType';
import { SectionKey } from '../../types';

const ENTRY_LINES = [
    "empty1", // blank
    "BISWAL/OS v1.0.0 — Bengaluru, IN",
    "All systems operational. Welcome.",
    "empty2",
    "Hey. I'm Shivam.",
    "Techpreneur. AI builder. The one who automated that.",
    "empty3",
    "Select a section to explore. Type a number, keyword, or click.",
    "empty4",
    "menu",
    "empty5"
];

// Delays in ms
const DELAYS = [
    200, // delay after first line
    0,   // "BISWAL/OS"
    400, // "All systems..."
    0,
    300, // "Hey. I'm Shivam"
    0,
    0,
    0,
    0,
    0
];

export function MainWindow({ onNavigate }: { onNavigate: (s: SectionKey) => void }) {
    const { visibleLines, finished, linesToRender } = useAutoType(ENTRY_LINES, DELAYS, 300);
    const [echoCommand, setEchoCommand] = useState<string | null>(null);

    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        setDateStr(new Date().toString());
    }, []);

    const handleInput = (val: string) => {
        const v = val.trim().toLowerCase();
        if (!v) return;

        setEchoCommand(val);

        // Resolve keyword or number
        const navMap: Record<string, SectionKey> = {
            '1': 'projects', 'project': 'projects', 'projects': 'projects', 'pro': 'projects',
            '2': 'about', 'about': 'about', 'ab': 'about',
            '3': 'skills', 'skill': 'skills', 'sk': 'skills', 'skills': 'skills',
            '4': 'thoughts', 'thought': 'thoughts', 'th': 'thoughts', 'thoughts': 'thoughts',
            '5': 'timeline', 'time': 'timeline', 'ti': 'timeline', 'timeline': 'timeline',
            '6': 'contact', 'contacts': 'contact', 'co': 'contact', 'contact': 'contact',
            '7': 'manual', 'cmd': 'manual', 'man': 'manual', 'ma': 'manual', 'manual': 'manual',
        };

        const target = navMap[v] || Object.keys(navMap).find(k => k.startsWith(v)) ? navMap[Object.keys(navMap).find(k => k.startsWith(v)) as string] : null;

        setTimeout(() => {
            if (target) {
                onNavigate(target as SectionKey);
            }
            setEchoCommand(null); // allow re-enter
        }, 200);
    };

    return (
        <TerminalBody>
            {/* First line instant */}
            <div className="text-[var(--muted)] opacity-80">Last login: {dateStr} on ttys001</div>

            {linesToRender.map((line, idx) => {
                if (line.startsWith("empty")) return <div key={idx} className="h-4" />;

                if (line === "BISWAL/OS v1.0.0 — Bengaluru, IN") {
                    return <div key={idx} className="text-[var(--amber)] font-bold">{line}</div>;
                }

                if (line === "All systems operational. Welcome.") {
                    return <div key={idx} className="text-[var(--muted)]">{line}</div>;
                }

                if (line.startsWith("Select a section")) {
                    return <div key={idx} className="text-[var(--muted)] italic">{line}</div>;
                }

                if (line === "menu") {
                    return (
                        <div key={idx} className="flex flex-col gap-1 ml-4 animate-fade-in">
                            <MenuItem num={1} keyword="projects" desc="what i've built" onClick={onNavigate} />
                            <MenuItem num={2} keyword="about" desc="who i am" onClick={onNavigate} />
                            <MenuItem num={3} keyword="skills" desc="what i use" onClick={onNavigate} />
                            <MenuItem num={4} keyword="thoughts" desc="how i think" onClick={onNavigate} />
                            <MenuItem num={5} keyword="timeline" desc="where i've been" onClick={onNavigate} />
                            <MenuItem num={6} keyword="contact" desc="get in touch" onClick={onNavigate} />
                            <MenuItem num={7} keyword="manual" desc="cmd mode" onClick={onNavigate} />
                        </div>
                    );
                }

                return <div key={idx} className="text-[var(--text)]">{line}</div>;
            })}

            {finished && (
                <div className="mt-2 text-[var(--text-bright)]">
                    {echoCommand !== null ? (
                        <InputLine path="~" readOnly value={echoCommand} blinking={false} />
                    ) : (
                        <InputLine path="~" autoFocus onEnter={handleInput} />
                    )}
                </div>
            )}
        </TerminalBody>
    );
}
