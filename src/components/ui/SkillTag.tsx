export function SkillTag({ skill }: { skill: string }) {
    return (
        <span className="inline-block px-1 border border-transparent rounded-[2px] transition-colors cursor-default hover:border-[var(--amber)] hover:text-[var(--amber)] text-[var(--text)]">
            [{skill}]
        </span>
    );
}
