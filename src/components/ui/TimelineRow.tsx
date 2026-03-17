import React, { useState, useEffect } from 'react';

type TimelineItemProps = {
    year: string;
    event: string;
    sub: string;
};

export function TimelineRow({ year, event, sub }: TimelineItemProps) {
    const isRedacted = year === "2027";
    const [redactedText, setRedactedText] = useState("█████████████████");

    useEffect(() => {
        if (!isRedacted) return;
        const interval = setInterval(() => {
            setRedactedText(prev => prev.endsWith("_") ? "█████████████████" : "█████████████████_");
        }, 500);
        return () => clearInterval(interval);
    }, [isRedacted]);

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start leading-[1.7]">
            <div className="w-[45px] shrink-0 text-[var(--amber)] text-right font-medium">
                {year}
            </div>
            <div className="w-[20px] shrink-0 text-[var(--muted)] hidden sm:block">
                →
            </div>
            <div className="flex flex-col">
                <div className="text-[var(--text-bright)]">
                    {event}
                </div>
                <div className="text-[var(--muted)]">
                    {isRedacted ? (
                        <span className="text-[var(--amber)] opacity-80">{redactedText} <span className="text-[var(--muted)] opacity-60 ml-2">[still writing this part]</span></span>
                    ) : (
                        sub
                    )}
                </div>
            </div>
        </div>
    );
}
