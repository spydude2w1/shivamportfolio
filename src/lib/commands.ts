export type CommandResult = {
    type: 'html' | 'text' | 'clear' | 'download' | 'action' | 'navigation' | 'error';
    content?: string | React.ReactNode;
    url?: string;
    target?: string;
};

export function parseCommand(cmd: string): CommandResult {
    const parts = cmd.trim().toLowerCase().split(/\s+/);
    const base = parts[0];
    const arg = parts.slice(1).join(' ');

    if (!base) return { type: 'text', content: '' };

    const EASTER_EGGS: Record<string, string> = {
        'sudo': "permission denied. nice try.",
        'sudo su': "still no.",
        'rm -rf /': "bold choice. nothing happened.",
        'vim': "just kidding.", // pause logic will be handled if needed
        'why': "still working on that one.",
        'exit': "come back when you've built something.",
        'shivam': "you called? look around.",
        '2am': "you're up late too.",
        'git log': "commit 8a2b3c4d: refactor everything for the 5th time today\ncommit 1b9c4f2a: fix hydration error caused by adding too many divs",
        'ping firsttrack': "no response. still building.",
        'hire': "command not found: hire — try: cat contact.txt"
    };

    if (EASTER_EGGS[cmd.trim().toLowerCase()]) {
        return { type: 'text', content: EASTER_EGGS[cmd.trim().toLowerCase()] };
    }
    if (base === 'rm' && arg === '-rf /') {
        return { type: 'text', content: EASTER_EGGS['rm -rf /'] };
    }
    if (base === 'git' && arg === 'log') {
        return { type: 'text', content: EASTER_EGGS['git log'] };
    }

    switch (base) {
        case 'clear':
            return { type: 'clear' };

        case 'help':
            if (arg === '--honest') return { type: 'text', content: "most people don't read this far. respect." };
            return {
                type: 'html',
                content: `NAVIGATION
  ls                    → list current location
  cd [section]          → navigate to section
  cd ..                 → go up / back to main menu
  pwd                   → current location
  clear                 → clear window

CONTENT
  whoami                → one-liner about Shivam
  cat about.txt         → full about text
  cat contact.txt       → contact info
  cat resume.pdf        → triggers PDF download
  ls projects/          → list all projects
  open [project]        → open project detail
  ls thoughts/          → list thought entries
  cat thoughts/[n]      → read specific entry
  cat timeline.txt      → full timeline
  ls skills/            → list skill categories
  cat skills/technical  → technical skills
  cat skills/creative   → creative skills

META
  history               → commands typed this session
  help                  → this list (partial — not everything)
  version               → BISWAL/OS v1.0.0`
            };

        case 'version':
            return { type: 'text', content: 'BISWAL/OS v1.0.0' };

        case 'pwd':
            return { type: 'text', content: '/users/shivam/desktop' };

        case 'whoami':
            return { type: 'text', content: 'shivam biswal — techpreneur, ai builder, automation engineer.' };

        case 'cd':
            if (['projects', 'about', 'skills', 'thoughts', 'timeline', 'contact', 'manual'].includes(arg)) {
                return { type: 'navigation', target: arg };
            }
            if (arg === '..' || arg === '/') return { type: 'action', target: 'main' }; // signal back to main
            return { type: 'error', content: `cd: no such file or directory: ${arg}` };

        case 'ls':
            if (!arg) return { type: 'text', content: 'projects/  about.txt  skills/  thoughts/  timeline.txt  contact.txt  resume.pdf' };
            if (arg === 'projects/' || arg === 'projects') return { type: 'text', content: 'green_credit  urbexa_projects  firsttrack_ai  holographic_games  hiddendevs' };
            if (arg === 'thoughts/' || arg === 'thoughts') return { type: 'text', content: 'entry_1  entry_2  entry_3  entry_4  entry_5' };
            if (arg === 'skills/' || arg === 'skills') return { type: 'text', content: 'technical  creative' };
            return { type: 'error', content: `ls: cannot access '${arg}': No such file or directory` };

        case 'cat':
            if (arg === 'about.txt') return { type: 'navigation', target: 'about' };
            if (arg === 'contact.txt') return { type: 'navigation', target: 'contact' };
            if (arg === 'timeline.txt') return { type: 'navigation', target: 'timeline' };
            if (arg === 'skills/technical' || arg === 'skills/creative' || arg === 'skills') return { type: 'navigation', target: 'skills' };
            if (arg.startsWith('thoughts/')) return { type: 'navigation', target: 'thoughts' };
            if (arg === 'resume.pdf') return { type: 'download', url: '/resume.pdf' }; // placeholder
            return { type: 'error', content: `cat: ${arg}: No such file or directory` };

        case 'open':
            if (arg === 'projects' || ['green_credit', 'urbexa_projects', 'firsttrack_ai', 'holographic_games', 'hiddendevs'].includes(arg)) {
                return { type: 'navigation', target: 'projects' };
            }
            return { type: 'error', content: `open: no such item: ${arg}` };

        case 'coffee':
        case 'tip':
            return { type: 'action', content: "brewing...", target: "buy_coffee" };

        case 'history':
            return { type: 'action', target: 'history' };

        default:
            return { type: 'error', content: `command not found: ${base}` };
    }
}
