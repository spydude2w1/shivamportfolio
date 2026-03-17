import { cn } from '../../lib/utils';
import { SectionKey } from '../../types';

export function MenuItem({
    num,
    keyword,
    desc,
    onClick
}: {
    num: number;
    keyword: SectionKey;
    desc: string;
    onClick: (section: SectionKey) => void;
}) {
    return (
        <div
            onClick={() => onClick(keyword)}
            className="flex flex-row gap-4 group cursor-pointer w-fit py-[2px] pr-4 rounded hover:bg-[var(--surface2)]/50 transition-colors"
        >
            <span className="text-[var(--amber)] group-hover:text-[var(--white)] w-6 text-right transition-colors">{num}.</span>
            <span className="text-[var(--text)] group-hover:text-[var(--white)] w-[100px] transition-colors">{keyword}</span>
            <span className="text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">← {desc}</span>
        </div>
    );
}
