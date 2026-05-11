"use client"
import React, { useState } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { PERSON } from '../../lib/data';

export function ContactWindow() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const ContactRow = ({ label, value, action, link }: { label: string, value: string, action?: () => void, link?: string }) => {
        const isCopied = copied === label;

        const handleClick = () => {
            if (link) {
                if (link.startsWith('mailto:')) {
                    window.location.href = link;
                } else {
                    window.open(link, '_blank');
                }
            } else if (action) {
                action();
            }
        };

        return (
            <div className="flex flex-col mb-1 group">
                <div
                    onClick={handleClick}
                    className="flex flex-row items-center cursor-pointer py-1"
                >
                    <span className="w-24 text-[var(--test)]">{label}</span>
                    <span className="w-8 text-[var(--muted)]">→</span>
                    <span className="text-[var(--text-bright)] group-hover:text-[var(--amber)] transition-colors">{value}</span>
                    <span className="ml-auto text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                        {link ? '[open ↗]' : '[copy]'}
                    </span>
                </div>
                {isCopied && (
                    <div className="text-[var(--muted)] text-[11px] ml-32 animate-fade-in">
                        copied to clipboard.
                    </div>
                )}
            </div>
        );
    };

    return (
        <TerminalBody>
            <InputLine path="~/contact" readOnly value="cat contact.txt" blinking={false} />

            <div className="font-mono text-[13px] mt-2 mb-6">
                <div className="text-[var(--text)] whitespace-pre-wrap mb-4">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  reach out/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>

                <div className="flex flex-col w-full max-w-[400px] mb-6">
                    <ContactRow label="email" value={PERSON.email} link={`mailto:${PERSON.email}`} />
                    <ContactRow label="linkedin" value="/in/shivambiswal" link={PERSON.linkedin} />
                    <ContactRow label="github" value="/spydude2w1" link={PERSON.github} />
                </div>

                <div className="text-[var(--text)] whitespace-pre-wrap mb-4">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [click any row to copy / open]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>

                <div className="text-[var(--text)] whitespace-pre-wrap">
                    {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
                </div>
            </div>

            <InputLine path="~/contact" blinking={true} />
        </TerminalBody>
    );
}
