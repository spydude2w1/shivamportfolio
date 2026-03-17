"use client"
import React, { useState, useRef, useEffect } from 'react';
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
  manual mode — type commands directly
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
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

        const { type, content, target, url } = parseCommand(cmd);

        switch (type) {
            case 'clear':
                setLogs([]);
                return;
            case 'text':
                newLog.output = <div className="text-[var(--text-bright)] whitespace-pre-wrap">{content}</div>;
                break;
            case 'html':
                newLog.output = <div className="text-[var(--text-bright)] whitespace-pre-wrap">{content as React.ReactNode}</div>;
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
                    newLog.output = <div className="text-[var(--amber)] animate-pulse">{content}</div>;
                } else if (target === 'history') {
                    newLog.output = (
                        <div className="flex flex-col gap-1 text-[var(--muted)]">
                            {history.map((h, i) => <span key={i}>  {i + 1}  {h}</span>)}
                        </div>
                    );
                }
                break;
            case 'download':
                if (url) {
                    window.open(url, '_blank');
                    newLog.output = <div className="text-[var(--muted)] opacity-60">downloading {url}...</div>;
                }
                break;
        }

        setLogs(prev => [...prev, newLog]);
    };

    return (
        <TerminalBody>
            <div className="flex flex-col gap-2 relative">
                {logs.map(log => (
                    <div key={log.id} className="flex flex-col gap-2">
                        {log.command !== undefined && (
                            <InputLine path="~" readOnly value={log.command} blinking={false} />
                        )}
                        {log.output && (
                            <div className="mt-1 mb-3 ml-2 border-l border-[var(--border)] pl-3 animate-fade-in-fast font-mono leading-[1.7] text-[13px]">
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
