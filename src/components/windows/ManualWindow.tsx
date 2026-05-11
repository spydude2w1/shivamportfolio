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
    isInteractiveInput?: boolean;
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

    const [interactiveState, setInteractiveState] = useState<{ step: string; data: any } | null>(null);

    const bottomRef = useRef<HTMLDivElement>(null);
    const { currentInput, setCurrentInput, handleKeyDown, pushToHistory, history } = useTerminalInput();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [logs]);

    const pushLogsWithDelay = async (messages: React.ReactNode[], delayMs = 600) => {
        for (const msg of messages) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            setLogs(prev => [...prev, { id: Date.now().toString() + Math.random(), output: msg }]);
        }
    };

    const sendHireRequest = (message: string, contactInfo: string) => {
        fetch('/api/hire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorName: 'Portfolio Visitor (Agent Parsed)',
                visitorEmail: contactInfo,
                message: message,
            }),
        }).then(res => res.json()).then(data => {
            const followUp: Log = {
                id: Date.now().toString() + '-hire-result',
                output: data.success ? (
                    <div className="text-green-400 mt-2">
                        [system] ✓ Transmission successful. Shivam has been notified.
                    </div>
                ) : (
                    <div className="text-[var(--amber)] mt-2">
                        [system] ⚠ Delivery pending — reach out directly at shivambiswal01@gmail.com
                    </div>
                ),
            };
            setLogs(prev => [...prev, followUp]);
        }).catch(() => {
            const followUp: Log = {
                id: Date.now().toString() + '-hire-error',
                output: (
                    <div className="text-[var(--red)] mt-2">
                        [system] ⚠ Service unreachable — reach out directly at shivambiswal01@gmail.com
                    </div>
                ),
            };
            setLogs(prev => [...prev, followUp]);
        });
    };

    const handleEnter = (val: string) => {
        const cmd = val.trim();
        pushToHistory(cmd);

        if (interactiveState) {
            const rawMessage = cmd;
            setLogs(prev => [...prev, { id: Date.now().toString(), command: cmd, isInteractiveInput: true }]);

            if (interactiveState.step === 'awaiting_payload') {
                const emailMatch = rawMessage.match(/[\w.-]+@[\w.-]+\.\w+/);
                const urlMatch = rawMessage.match(/(https?:\/\/[^\s]+)/);
                const phoneMatch = rawMessage.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);

                const contactInfo = emailMatch?.[0] || urlMatch?.[0] || phoneMatch?.[0];

                if (contactInfo) {
                    setInteractiveState(null);
                    (async () => {
                        await pushLogsWithDelay([
                            <div className="text-[var(--amber)] opacity-80">[agent] analyzing payload...</div>,
                            <div className="text-[var(--blue)] opacity-80">[agent] extracted intent: HIRE</div>,
                            <div className="text-[var(--green)] opacity-80">[agent] extracted contact info: [{contactInfo}]</div>,
                            <div className="text-[var(--amber)] animate-pulse mt-2">[agent] Payload looks solid. Bypassing spam filters and dispatching to Shivam...</div>
                        ], 700);
                        sendHireRequest(rawMessage, contactInfo);
                    })();
                } else {
                    setInteractiveState({ step: 'awaiting_contact', data: { message: rawMessage } });
                    (async () => {
                        await pushLogsWithDelay([
                            <div className="text-[var(--amber)] opacity-80">[agent] analyzing payload...</div>,
                            <div className="text-[var(--blue)] opacity-80">[agent] extracted intent: HIRE</div>,
                            <div className="text-[var(--red)] opacity-80">[agent] warning: no contact info detected in payload.</div>,
                            <div className="text-[var(--text-bright)] mt-2">I got the message, but my parser couldn't find an email, link, or phone number. How should Shivam reach you?</div>
                        ], 700);
                    })();
                }
            } else if (interactiveState.step === 'awaiting_contact') {
                setInteractiveState(null);
                const finalMessage = interactiveState.data.message;
                const contactInfo = rawMessage;
                
                (async () => {
                    await pushLogsWithDelay([
                        <div className="text-[var(--green)] opacity-80">[agent] contact info updated: [{contactInfo}]</div>,
                        <div className="text-[var(--amber)] animate-pulse mt-2">[agent] Dispatching payload to Shivam...</div>
                    ], 600);
                    sendHireRequest(finalMessage, contactInfo);
                })();
            }
            return;
        }

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
            case 'hire':
                newLog.output = <div className="whitespace-pre-wrap text-[var(--text-bright)]">{content as string}</div>;
                setLogs(prev => [...prev, newLog]);
                setInteractiveState({ step: 'awaiting_payload', data: {} });
                
                (async () => {
                    await pushLogsWithDelay([
                        <div className="text-[var(--blue)] opacity-80">[agent] initializing secure connection...</div>,
                        <div className="text-[var(--blue)] opacity-80">[agent] connecting to shivam's recruitment subroutines...</div>,
                        <div className="text-[var(--blue)] opacity-80 mt-2">[agent] Hello. I'm Shivam's portfolio agent. He's probably drinking coffee or compiling code right now.</div>,
                        <div className="text-[var(--text-bright)]">To expedite this, just tell me who you are, what you're looking for, and how to reach you in one message. I'll parse it out.</div>
                    ], 800);
                })();
                return;
        }

        setLogs(prev => [...prev, newLog]);
    };

    return (
        <TerminalBody>
            <div className="relative flex flex-col gap-2 selectable-text">
                {logs.map(log => (
                    <div key={log.id} className="flex flex-col gap-2">
                        {log.command !== undefined && (
                            <InputLine path="~" readOnly value={log.command} blinking={false} isInteractive={log.isInteractiveInput} />
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
                        isInteractive={!!interactiveState}
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
