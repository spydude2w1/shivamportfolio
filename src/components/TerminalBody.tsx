import React from 'react';

export function TerminalBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-[16px]">
            {children}
        </div>
    );
}
