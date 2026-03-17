"use client"
import React, { useState } from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { PROJECTS } from '../../lib/data';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectDetail } from '../ui/ProjectDetail';

export function ProjectsWindow() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const renderContent = () => {
        if (expandedId) {
            const p = PROJECTS.find(proj => proj.id === expandedId);
            if (!p) return null;
            return (
                <div className="animate-fade-in-fast">
                    <InputLine path="~/projects" readOnly value={`open ${p.name}`} blinking={false} />
                    <div className="my-4" />
                    <ProjectDetail project={p} onBack={() => setExpandedId(null)} />
                </div>
            );
        }

        return (
            <div className="animate-fade-in-fast flex flex-col gap-[16px]">
                <InputLine path="~/projects" readOnly value="ls -la" blinking={false} />

                <div className="text-[var(--muted)] my-2">
                    {PROJECTS.length} projects found. Select to expand.
                </div>

                <div className="flex flex-col gap-4 max-w-[650px]">
                    {PROJECTS.map((proj, idx) => (
                        <ProjectCard
                            key={proj.id}
                            project={proj}
                            num={idx + 1}
                            onExpand={() => setExpandedId(proj.id)}
                        />
                    ))}
                </div>
                <div className="h-4" />
                <InputLine path="~/projects" blinking={true} />
            </div>
        );
    };

    return (
        <TerminalBody>
            {renderContent()}
        </TerminalBody>
    );
}
