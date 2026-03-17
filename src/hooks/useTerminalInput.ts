import { useState, useCallback } from 'react';

export function useTerminalInput() {
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentInput, setCurrentInput] = useState('');

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHistoryIndex(prev => {
                    const next = prev < history.length - 1 ? prev + 1 : prev;
                    if (next >= 0 && next < history.length) {
                        setCurrentInput(history[history.length - 1 - next]);
                    }
                    return next;
                });
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHistoryIndex(prev => {
                    const next = prev > -1 ? prev - 1 : prev;
                    if (next === -1) {
                        setCurrentInput('');
                    } else if (next >= 0 && next < history.length) {
                        setCurrentInput(history[history.length - 1 - next]);
                    }
                    return next;
                });
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Simple autocomplete implementation could go here
            }
        },
        [history]
    );

    const pushToHistory = useCallback((cmd: string) => {
        if (cmd.trim()) {
            setHistory(prev => [...prev, cmd]);
        }
        setHistoryIndex(-1);
        setCurrentInput('');
    }, []);

    return {
        currentInput,
        setCurrentInput,
        handleKeyDown,
        pushToHistory,
        history
    };
}
