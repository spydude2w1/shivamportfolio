import { useState, useEffect } from 'react';

export function useAutoType(lines: string[], delays: number[], startDelay: number = 300) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Initial delay before starting the sequence
        timeoutId = setTimeout(() => {
            setStarted(true);
        }, startDelay);

        return () => clearTimeout(timeoutId);
    }, [startDelay]);

    useEffect(() => {
        if (!started || visibleLines >= lines.length) return;

        const timeoutId = setTimeout(() => {
            setVisibleLines(v => v + 1);
        }, delays[visibleLines] || 150);

        return () => clearTimeout(timeoutId);
    }, [started, visibleLines, lines.length, delays]);

    return {
        visibleLines,
        finished: visibleLines >= lines.length,
        linesToRender: lines.slice(0, visibleLines)
    };
}
