"use client"
import React, { useRef, useEffect } from 'react';

type InputLineProps = {
    path?: string;
    autoFocus?: boolean;
    onEnter?: (value: string) => void;
    readOnly?: boolean;
    value?: string;
    blinking?: boolean;
    onChange?: (val: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function InputLine({
    path = "~",
    autoFocus = false,
    onEnter,
    readOnly,
    value,
    blinking = true,
    onChange,
    onKeyDown
}: InputLineProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current && !readOnly) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [autoFocus, readOnly]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onKeyDown) onKeyDown(e);
        if (e.key === 'Enter' && onEnter && inputRef.current) {
            const val = inputRef.current.value;
            onEnter(val);
            if (!onChange) {
                inputRef.current.value = '';
            }
        }
    };

    return (
        <div className="flex flex-row items-center gap-2 group whitespace-pre-wrap word-break flex-wrap leading-[1.7]">
            <div className="flex flex-row gap-0 shrink-0">
                <span className="text-[var(--green)] font-medium">shivam</span>
                <span className="text-[var(--muted)]">@</span>
                <span className="text-[var(--blue)] font-medium">biswal</span>
                <span className="text-[var(--text)]">:</span>
                <span className="text-[var(--amber)]">{path}</span>
                <span className="text-[var(--muted)]">$</span>
            </div>

            {readOnly ? (
                <span className="text-[var(--text-bright)] whitespace-pre-wrap flex-1">{value}</span>
            ) : (
                <div className="relative flex-1 flex items-center min-w-[200px]">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent outline-none border-none text-[var(--text-bright)] caret-transparent"
                        autoComplete="off"
                        spellCheck="false"
                        onKeyDown={handleKeyDown}
                        value={value}
                        onChange={(e) => onChange && onChange(e.target.value)}
                    />
                    {/* Custom block blinking cursor overlay */}
                    {blinking && (
                        <span
                            className="absolute pointer-events-none bg-[var(--amber)] h-[1.2rem] w-[8px] animate-pulse"
                            style={{
                                left: `calc(${(inputRef.current?.value || value || '').length}ch)` // Roughly follows cursor in monospace font
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
