import { Thought } from '../../types';

export function ThoughtEntry({ thought }: { thought: Thought }) {
    return (
        <div className="flex flex-col gap-[8px] pl-[12px] border-l-[3px] border-l-[var(--border)] hover:border-l-[var(--amber)] transition-colors py-1 group">
            <div className="italic text-[var(--text)] whitespace-pre-wrap leading-[1.7]">
                "{thought.text}"
            </div>
            <div className="text-right text-[var(--muted)] text-[11px] group-hover:text-[var(--amber-dim)] transition-colors">
                — {thought.tag}
            </div>
        </div>
    );
}
