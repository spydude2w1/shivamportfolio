"use client";

import React, { useEffect, useRef, useState } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { useTerminalInput } from '../../hooks/useTerminalInput';
import { parseCommand } from '../../lib/commands';
import { SectionKey } from '../../types';

type Log = {
    id: string;
    command?: string;
    output?: React.ReactNode;
};

export function ManualWindow({ onNavigate }: { onNavigate: (s: SectionKey) => void }) {
    const [logs, setLogs] = useState<Log[]>([{
        id: 'startup',
        output: (
            <div className="text-[var(--text)] whitespace-pre-wrap">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  manual mode - type commands directly
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  type 'help' for available commands.
  or just explore. not everything is in help.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>
        )
    }]);

    const bottomRef = useRef<HTMLDivElement>(null);
    const { currentInput, setCurrentInput, handleKeyDown, pushToHistory, history } = useTerminalInput();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [logs]);

    const handleEnter = (val: string) => {
        const cmd = val.trim();
        pushToHistory(cmd);

        const logId = Date.now().toString();
        const newLog: Log = { id: logId, command: cmd };

        if (!cmd) {
            setLogs(prev => [...prev, newLog]);
            return;
        }

        const result = parseCommand(cmd);
        const { type, content, target, url } = result;

        switch (type) {
            case 'clear':
                setLogs([]);
                return;
            case 'text':
                newLog.output = <div className="whitespace-pre-wrap text-[var(--text-bright)]">{content}</div>;
                break;
            case 'html':
                newLog.output = <div className="whitespace-pre-wrap text-[var(--text-bright)]">{content as React.ReactNode}</div>;
                break;
            case 'error':
                newLog.output = <div className="text-[var(--red)]">{content}</div>;
                break;
            case 'navigation':
                if (target) {
                    onNavigate(target as SectionKey);
                    newLog.output = <div className="text-[var(--muted)] opacity-60">navigating to {target}...</div>;
                }
                break;
            case 'action':
                if (target === 'main') {
                    onNavigate('main');
                    newLog.output = <div className="text-[var(--muted)] opacity-60">returning to main menu...</div>;
                } else if (target === 'buy_coffee') {
                    window.open('https://buymeacoffee.com/shivambiswal', '_blank');
                    newLog.output = <div className="animate-pulse text-[var(--amber)]">{content}</div>;
                } else if (target === 'history') {
                    newLog.output = (
                        <div className="flex flex-col gap-1 text-[var(--muted)]">
                            {history.map((h, i) => <span key={i}>  {i + 1}  {h}</span>)}
                        </div>
                    );
                }
                break;
            case 'open_url':
                if (url) {
                    window.open(url, '_blank');
                    newLog.output = <div className="text-[var(--muted)] opacity-60">{content as string}</div>;
                }
                break;
            case 'download':
                if (url) {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = result.filename || url.split('/').pop() || 'download';
                    a.click();
                    newLog.output = <div className="text-[var(--muted)] opacity-60">{(content as string) || `downloading ${url}...`}</div>;
                }
                break;
        }

        setLogs(prev => [...prev, newLog]);
    };

    return (
        <TerminalBody>
            <div className="relative flex flex-col gap-2 selectable-text">
                {logs.map(log => (
                    <div key={log.id} className="flex flex-col gap-2">
                        {log.command !== undefined && (
                            <InputLine path="~" readOnly value={log.command} blinking={false} />
                        )}
                        {log.output && (
                            <div className="mt-1 mb-3 ml-2 animate-fade-in-fast border-l border-[var(--border)] pl-3 font-mono text-[13px] leading-[1.7]">
                                {log.output}
                            </div>
                        )}
                    </div>
                ))}
                <div className="mt-2" ref={bottomRef}>
                    <InputLine
                        path="~"
                        autoFocus
                        blinking={true}
                        value={currentInput}
                        onChange={setCurrentInput}
                        onKeyDown={handleKeyDown}
                        onEnter={handleEnter}
                    />
                </div>
            </div>
        </TerminalBody>
    );
}
