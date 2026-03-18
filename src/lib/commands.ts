import type { ReactNode } from 'react';

export type CommandResult = {
    type: 'html' | 'text' | 'clear' | 'download' | 'open_url' | 'action' | 'navigation' | 'error';
    content?: string | ReactNode;
    url?: string;
    target?: string;
    filename?: string;
};

export function parseCommand(cmd: string): CommandResult {
    const normalized = cmd.trim().toLowerCase();
    const parts = normalized.split(/\s+/);
    const base = parts[0];
    const arg = parts.slice(1).join(' ');

    if (!base) return { type: 'text', content: '' };

    const EASTER_EGGS: Record<string, string> = {
        'sudo': 'permission denied. nice try.',
        'sudo su': 'still no.',
        'rm -rf /': 'bold choice. nothing happened.',
        'vim': 'just kidding.',
        'why': 'still working on that one.',
        'exit': "come back when you've built something.",
        'shivam': 'you called? look around.',
        '2am': "you're up late too.",
        'git log': 'commit 8a2b3c4d: refactor everything for the 5th time today\ncommit 1b9c4f2a: fix hydration error caused by adding too many divs',
        'ping firsttrack': 'no response. still building.',
        'hire': 'command not found: hire - try: cat contact.txt'
    };

    if (EASTER_EGGS[normalized]) {
        return { type: 'text', content: EASTER_EGGS[normalized] };
    }

    if (base === 'sudo' && arg === 'hire me') {
        return {
            type: 'text',
            content: `[sudo] password for visitor:
✓ Authentication successful
✓ Sending offer letter to Shivam...
✓ Done. Check shivambiswal01@gmail.com`
        };
    }

    if (base === 'open' && (arg === 'resume.pdf' || arg === 'resume')) {
        return { type: 'open_url', content: 'Opening ShivamBiswalResume.pdf...', url: '/ShivamBiswalResume.pdf' };
    }

    if ((base === 'download' && (arg === 'resume' || arg === 'resume.pdf')) || (base === 'wget' && (arg === 'resume' || arg === 'resume.pdf'))) {
        return {
            type: 'download',
            content: 'Downloading ShivamBiswalResume.pdf...',
            url: '/ShivamBiswalResume.pdf',
            filename: 'ShivamBiswalResume.pdf'
        };
    }

    if (base === 'cat' && arg === 'resume') {
        return {
            type: 'text',
            content: `┌─────────────────────────────────────┐
│         SHIVAM BISWAL               │
│  Founder & CEO | AI | Design        │
├─────────────────────────────────────┤
│  📧 shivambiswal01@gmail.com         │
│  📍 Bengaluru, India                 │
│  🏆 AIR 1 — Eureka! Junior, IIT Bombay│
├─────────────────────────────────────┤
│  EXPERIENCE                          │
│  • Technical Lead @ Green Credit     │
│  • Founder @ Firsttrack AI           │
│  • Lead Designer @ Holographic Games │
├─────────────────────────────────────┤
│  SKILLS                              │
│  Python | React | FastAPI | LLM      │
│  Blender | Photoshop | After Effects │
└─────────────────────────────────────┘
Type "download resume" to save the PDF.`
        };
    }

    switch (base) {
        case 'clear':
            return { type: 'clear' };

        case 'help':
            if (arg === '--honest') return { type: 'text', content: "most people don't read this far. respect." };
            return {
                type: 'html',
                content: `NAVIGATION
  ls                    -> list current location
  ls ~/Desktop          -> list desktop items
  cd [section]          -> navigate to section
  cd ..                 -> go up / back to main menu
  pwd                   -> current location
  clear                 -> clear window

CONTENT
  whoami                -> one-liner about Shivam
  cat about.txt         -> full about text
  cat contact.txt       -> contact info
  cat resume            -> preview resume summary
  cat resume.pdf        -> trigger PDF download
  open resume.pdf       -> open the resume
  download resume       -> save the resume
  wget resume.pdf       -> save the resume
  ls projects/          -> list all projects
  open [project]        -> open project detail
  ls thoughts/          -> list thought entries
  cat thoughts/[n]      -> read specific entry
  cat timeline.txt      -> full timeline
  ls skills/            -> list skill categories
  cat skills/technical  -> technical skills
  cat skills/creative   -> creative skills

META
  history               -> commands typed this session
  sudo hire me          -> absolutely not documented
  help                  -> this list (partial - not everything)
  version               -> BISWAL/OS v1.0.0`
            };

        case 'version':
            return { type: 'text', content: 'BISWAL/OS v1.0.0' };

        case 'pwd':
            return { type: 'text', content: '/users/shivam/desktop' };

        case 'whoami':
            return { type: 'text', content: 'shivam biswal - techpreneur, ai builder, automation engineer.' };

        case 'cd':
            if (['projects', 'about', 'skills', 'thoughts', 'timeline', 'contact', 'manual'].includes(arg)) {
                return { type: 'navigation', target: arg };
            }
            if (arg === '..' || arg === '/') return { type: 'action', target: 'main' };
            return { type: 'error', content: `cd: no such file or directory: ${arg}` };

        case 'ls':
            if (!arg) return { type: 'text', content: 'projects/  about.txt  skills/  thoughts/  timeline.txt  contact.txt  resume.pdf' };
            if (arg === 'projects/' || arg === 'projects') return { type: 'text', content: 'green_credit  urbexa_projects  firsttrack_ai  holographic_games  hiddendevs' };
            if (arg === 'thoughts/' || arg === 'thoughts') return { type: 'text', content: 'entry_1  entry_2  entry_3  entry_4  entry_5' };
            if (arg === 'skills/' || arg === 'skills') return { type: 'text', content: 'technical  creative' };
            if (arg === '~/desktop') return { type: 'text', content: 'Resume.pdf  Projects/  Contact.txt  README.md' };
            return { type: 'error', content: `ls: cannot access '${arg}': No such file or directory` };

        case 'cat':
            if (arg === 'about.txt') return { type: 'navigation', target: 'about' };
            if (arg === 'contact.txt') return { type: 'navigation', target: 'contact' };
            if (arg === 'timeline.txt') return { type: 'navigation', target: 'timeline' };
            if (arg === 'skills/technical' || arg === 'skills/creative' || arg === 'skills') return { type: 'navigation', target: 'skills' };
            if (arg.startsWith('thoughts/')) return { type: 'navigation', target: 'thoughts' };
            if (arg === 'resume.pdf') {
                return {
                    type: 'download',
                    content: 'Downloading ShivamBiswalResume.pdf...',
                    url: '/ShivamBiswalResume.pdf',
                    filename: 'ShivamBiswalResume.pdf'
                };
            }
            return { type: 'error', content: `cat: ${arg}: No such file or directory` };

        case 'open':
            if (arg === 'projects' || ['green_credit', 'urbexa_projects', 'firsttrack_ai', 'holographic_games', 'hiddendevs'].includes(arg)) {
                return { type: 'navigation', target: 'projects' };
            }
            return { type: 'error', content: `open: no such item: ${arg}` };

        case 'coffee':
        case 'tip':
            return { type: 'action', content: 'brewing...', target: 'buy_coffee' };

        case 'history':
            return { type: 'action', target: 'history' };

        default:
            return { type: 'error', content: `command not found: ${base}` };
    }
}
