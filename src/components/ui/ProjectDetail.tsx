import { Project } from '../../types';

export function ProjectDetail({
    project,
    onBack
}: {
    project: Project;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col font-mono text-[13px] leading-[1.7]">
            <div className="text-[var(--text)] whitespace-pre-wrap">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${project.name}/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  candid     →  "${project.candid}"

  problem    →  ${project.problem}

  team       →  ${project.teamName ? project.teamName + '\n                ' : ''}${project.team ? project.team.join(' · ') : 'solo'}

  what i did →  ${project.whatIDid}

  stack      →  ${project.stack.join(' · ')}

  outcome    →  ${project.outcome}

  honest     →  ${project.honest}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>
            <button
                onClick={onBack}
                className="text-[var(--muted)] hover:text-[var(--text-bright)] text-left mt-2 px-1 w-fit transition-colors group cursor-default"
            >
                <span className="group-hover:text-[var(--amber)]">[←</span> back to projects<span className="group-hover:text-[var(--amber)]">]</span>
            </button>
        </div>
    );
}
