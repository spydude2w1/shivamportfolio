import { Project } from '../../types';

export function ProjectCard({
    project,
    num,
    onExpand
}: {
    project: Project;
    num: number;
    onExpand: () => void;
}) {
    return (
        <div
            onClick={onExpand}
            className="flex flex-col border border-[var(--border)] border-l-[3px] border-l-[var(--amber)] rounded-[4px] p-[12px_16px] cursor-pointer hover:bg-[var(--surface2)]/30 hover:border-l-[var(--white)] transition-all group group-hover:bg"
        >
            <div className="flex justify-between items-center mb-1">
                <span className="text-[var(--text-bright)] font-medium">[{num}] {project.name}</span>
                <span className="text-[var(--muted)] group-hover:text-[var(--white)] transition-colors opacity-0 group-hover:opacity-100">[open ↵]</span>
            </div>
            <div className="text-[var(--text)] italic">"{project.candid}"</div>
            <div className="text-[var(--blue)] font-mono text-[11px] mt-2 opacity-80">
                {project.stack.join(' · ')}
            </div>
        </div>
    );
}
