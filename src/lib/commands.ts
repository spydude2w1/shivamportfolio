import type { ReactNode } from 'react';
import { PERSON, SHIP_LOG, SKILLS, THOUGHTS, TIMELINE } from './data';

export type CommandResult = {
    type: 'html' | 'text' | 'clear' | 'download' | 'open_url' | 'action' | 'navigation' | 'error' | 'hire';
    content?: string | ReactNode;
    url?: string;
    target?: string;
    filename?: string;
};

// Session start time for uptime tracking
const SESSION_START = Date.now();

const FORTUNES = [
    "the best time to ship was yesterday. the second best time is now.",
    "if your code works on the first try, you should be worried.",
    "a product is never finished, only abandoned — or funded.",
    "debugging is like being the detective in a crime movie where you're also the murderer.",
    "first make it work. then make it right. then make it fast. then rewrite everything.",
    "sleep is just a longer compile time.",
    "\"it works on my machine\" — certified production engineer.",
    "every 'quick fix' is a future tech debt with compound interest.",
    "the real MVP is the MVP you actually shipped.",
    "move fast and break things. then fix them at 2am.",
    "your commit message is a love letter to your future self.",
    "a startup is just a to-do list that raises money.",
];

const TRASH_RESPONSES = [
    "You can't delete shipped products.",
    "Are you sure? This took 3 weeks of my life.",
    "Trash is empty. I ship everything.",
    "404: Regrets not found.",
    "sudo rm -rf /regrets → Permission denied.",
    "I don't throw away code. I archive lessons.",
    "The only thing in my trash is imposter syndrome. And it keeps coming back.",
];

function formatUptime(): string {
    const elapsed = Date.now() - SESSION_START;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function getNeofetch(): string {
    return `
                 .:'          shivam@biswal
             __ :'__          ──────────────────
          .'  \`  -  \`.       OS: ShivamOS 16.0 (Bengaluru Build)
         :  .-    -.  :       Host: AECS Magnolia Maaruti Public School
         :  :      :  :       Kernel: Coffee-Fueled Neural Net v4.2
          :  '-.  .-'  :      Uptime: ${formatUptime()}
           \\  _ \\/ _  /       Shell: biswal/zsh 1.0
            \\ \\  / / /        Resolution: Pixel Perfect™
   jgs   /'.'--./-'.'\\       DE: macOS Sequoia (Fake)
         /   /   /  \\  \\      WM: React + Framer Motion
        '   /   '    '  '     Theme: Dark [always]
                               Terminal Font: SF Mono
                               CPU: Overclocked Brain @ 3.2GHz
                               GPU: Adobe Creative Suite
                               Memory: Photographic (mostly)
                               Disk: 60+ shipped projects
                               Battery: ██████████░░ 83% (coffee pending)`;
}

export function parseCommand(cmd: string): CommandResult {
    const normalized = cmd.trim().toLowerCase();
    const parts = normalized.split(/\s+/);
    const base = parts[0];
    const arg = parts.slice(1).join(' ');
    const rawArg = cmd.trim().substring(base.length).trim();

    if (!base) return { type: 'text', content: '' };

    // ── Easter Eggs ──────────────────────────────────────
    const EASTER_EGGS: Record<string, string> = {
        'sudo': 'permission denied. nice try.',
        'sudo su': 'still no.',
        'vim': 'you\'re stuck now. just kidding. (but seriously, :q!)',
        'nano': 'a man of culture. but this isn\'t that kind of terminal.',
        'why': 'still working on that one.',
        'exit': "come back when you've built something.",
        'shivam': 'you called? look around.',
        '2am': "you're up late too.",
        'ping firsttrack': 'PING firsttrack.ai (127.0.0.1): 56 data bytes\n64 bytes: icmp_seq=0 ttl=64 time=0.042ms\n--- still building ---',
        'hire': 'command not found: hire → try: sudo hire shivam',
        'man woman': 'No manual entry for woman. Try: man shivam',
        'make sandwich': 'What? Make it yourself.',
        'make me a sandwich': 'What? Make it yourself.',
        'sudo make me a sandwich': 'Okay.',
        'curl girlfriend': 'curl: (7) Failed to connect: No girlfriend found on port 443',
        'python': '>>> import this\nThe Zen of Shivam: Ship it before it\'s perfect.',
        'node': 'Welcome to Shivam.js v16.0.0\n> process.exit() // nice try',
        'top': 'PID   USER      CPU%  MEM%  COMMAND\n1     shivam    99.9  42.0  building-stuff\n2     shivam    0.1   1.0   sleep (suspended)',
        'ps aux': 'USER     PID  %CPU  COMMAND\nshivam   1    99.9  /usr/bin/build-products\nshivam   2    0.0   /usr/bin/sleep (NOT RUNNING)',
        'git status': 'On branch main\nYour branch is ahead of \'origin/main\' by 847 commits.\n  (use "git push" to publish your local commits)\n\nnothing to commit, working tree clean\n(jk there\'s always something to commit)',
        'git push': 'Everything up-to-date\n(narrator: it was not up-to-date)',
        'git blame': 'It was me. It\'s always me. I\'m the only developer.',
        'git commit -m "fix"': 'Please write better commit messages. — Future Shivam',
    };

    if (EASTER_EGGS[normalized]) {
        return { type: 'text', content: EASTER_EGGS[normalized] };
    }

    // ── sudo hire shivam (multi-step) ────────────────────
    if (base === 'sudo' && (arg === 'hire shivam' || arg === 'hire me')) {
        return {
            type: 'hire',
            content: `[sudo] password for visitor: ••••••••
✓ Verifying credentials...
✓ Running background check... PASSED
✓ Checking portfolio... IMPRESSIVE
✓ Analyzing shipping velocity... OFF THE CHARTS
✓ Evaluating coffee consumption... SUSTAINABLE

╔══════════════════════════════════════════╗
║  OFFER LETTER GENERATED SUCCESSFULLY     ║
║                                          ║
║  To: ${PERSON.email}             ║
║  Role: Whatever needs building           ║
║  Start: Yesterday (he's already late)    ║
║                                          ║
║  Status: SENDING EMAIL NOTIFICATION...   ║
╚══════════════════════════════════════════╝`
        };
    }

    // ── rm -rf / (dramatic fake deletion) ────────────────
    if (normalized === 'rm -rf /' || normalized === 'rm -rf /*') {
        return {
            type: 'text',
            content: `rm: removing '/users/shivam/projects/'... ██████████ DONE
rm: removing '/users/shivam/skills/'...  ██████████ DONE
rm: removing '/users/shivam/timeline/'.. ██████████ DONE
rm: removing '/users/shivam/thoughts/'.. ██████████ DONE
rm: removing '/users/shivam/sleep/'...... ALREADY EMPTY
rm: removing '/users/shivam/ego/'........ FILE NOT FOUND
rm: removing '/users/shivam/regrets/'.... ████░░░░░░ PERMISSION DENIED

⚠️  Just kidding. Nothing happened.
    You think I'd let you delete my portfolio?
    I have backups. And trust issues.`
        };
    }

    // ── open resume ──────────────────────────────────────
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

    if (base === 'cat' && (arg === 'resume' || arg === 'resume.txt')) {
        return {
            type: 'text',
            content: `┌──────────────────────────────────────────┐
│           SHIVAM BISWAL                  │
│   Founder & CEO | AI | Design            │
├──────────────────────────────────────────┤
│  📧 ${PERSON.email}              │
│  📍 ${PERSON.location}                          │
│  🏆 AIR 1 — Eureka! Junior, IIT Bombay   │
├──────────────────────────────────────────┤
│  EXPERIENCE                              │
│  • Technical Lead @ Green Credit         │
│  • Founder @ Firsttrack AI               │
│  • Lead Designer @ Holographic Games     │
│  • 60+ Freelance Clients (HiddenDevs)   │
├──────────────────────────────────────────┤
│  SKILLS                                  │
│  ${SKILLS.technical.slice(0, 6).join(' | ')}│
│  ${SKILLS.creative.slice(0, 5).join(' | ')}│
├──────────────────────────────────────────┤
│  SHIPPED                                 │
│  ${SHIP_LOG.filter(s => s.status === 'live').slice(0, 3).map(s => s.message.split('—')[0].replace('ship: ', '').replace('feat: ', '').trim()).join(' · ')}│
└──────────────────────────────────────────┘
Type "download resume" to save the PDF.`
        };
    }

    // ── Main command switch ──────────────────────────────
    switch (base) {
        case 'clear':
            return { type: 'clear' };

        case 'help':
            if (arg === '--honest') return { type: 'text', content: "most people don't read this far. respect." };
            return {
                type: 'html',
                content: `NAVIGATION
  ls                    → list current location
  ls thoughts/          → list thought entries
  ls skills/            → list skill categories
  ls ~/Desktop          → list desktop items
  cd [section]          → navigate to section
  cd ..                 → back to main menu
  pwd                   → current location
  clear                 → clear window

CONTENT
  whoami                → about Shivam
  cat about.txt         → full about text
  cat contact.txt       → contact info
  cat resume.txt        → ASCII resume card
  cat resume.pdf        → download resume
  cat timeline.txt      → full timeline
  cat skills/technical  → technical skills
  cat skills/creative   → creative skills
  cat thoughts/[n]      → read specific thought
  open resume.pdf       → open the resume
  download resume       → save the resume

SYSTEM
  neofetch              → system info
  uptime                → session duration
  date                  → current date/time
  fortune               → wisdom (maybe)
  history               → commands this session
  echo [text]           → echo text back
  version               → BISWAL/OS version

FUN
  sudo hire shivam      → 👀
  rm -rf /              → try it. i dare you.
  git log               → ship log
  git status            → branch status
  git blame             → who did this

  not everything is listed here. explore.`
            };

        case 'version':
            return { type: 'text', content: 'BISWAL/OS v1.0.0 — built with next.js, framer motion, and sleep deprivation.' };

        case 'pwd':
            return { type: 'text', content: '/users/shivam/desktop' };

        case 'whoami':
            return {
                type: 'text',
                content: `shivam biswal
├── techpreneur, ai builder, automation engineer
├── founder @ firsttrack.ai
├── AIR 1 — eureka! junior, iit bombay
├── 60+ clients shipped since age 11
├── based in bengaluru, india
└── graduating 2027 • building until then & after

"the gap between a good idea and a good product is execution. i live in that gap."`
            };

        case 'neofetch':
            return { type: 'text', content: getNeofetch() };

        case 'uptime':
            return { type: 'text', content: `up ${formatUptime()} — visitor session on biswal/os` };

        case 'date':
            return { type: 'text', content: new Date().toString() };

        case 'fortune':
            return { type: 'text', content: FORTUNES[Math.floor(Math.random() * FORTUNES.length)] };

        case 'echo':
            if (!rawArg) return { type: 'text', content: '' };
            return { type: 'text', content: rawArg };

        case 'cd':
            if (['projects', 'about', 'skills', 'thoughts', 'timeline', 'contact', 'manual', 'shiplog', 'graveyard'].includes(arg)) {
                return { type: 'navigation', target: arg };
            }
            if (arg === '..' || arg === '/') return { type: 'action', target: 'main' };
            return { type: 'error', content: `cd: no such file or directory: ${arg}` };

        case 'ls':
            if (!arg) return { type: 'text', content: 'about.txt  skills/  thoughts/  timeline.txt  contact.txt  resume.pdf  shiplog/  graveyard/' };
            if (arg === 'thoughts/' || arg === 'thoughts') {
                const listing = THOUGHTS.map((t, i) => `  entry_${i + 1}    [${t.tag}]    ${t.text.slice(0, 50)}...`).join('\n');
                return { type: 'text', content: `total ${THOUGHTS.length}\n${listing}` };
            }
            if (arg === 'skills/' || arg === 'skills') return { type: 'text', content: 'technical/  creative/' };
            if (arg === 'skills/technical') return { type: 'text', content: SKILLS.technical.join('  ') };
            if (arg === 'skills/creative') return { type: 'text', content: SKILLS.creative.join('  ') };
            if (arg === '~/desktop') return { type: 'text', content: 'Resume.pdf  Projects/  Contact.txt  README.md  ShipLog/  Graveyard/' };
            if (arg === 'shiplog/' || arg === 'shiplog') return { type: 'navigation', target: 'shiplog' };
            if (arg === 'graveyard/' || arg === 'graveyard') return { type: 'navigation', target: 'graveyard' };
            return { type: 'error', content: `ls: cannot access '${arg}': No such file or directory` };

        case 'cat':
            if (arg === 'about.txt') return { type: 'navigation', target: 'about' };
            if (arg === 'contact.txt') return { type: 'navigation', target: 'contact' };
            if (arg === 'timeline.txt') {
                const tl = TIMELINE.map(t => `  [${t.year.padEnd(10)}] ${t.event}\n${''.padEnd(16)}${t.sub}`).join('\n\n');
                return { type: 'text', content: `━━━ TIMELINE ━━━\n\n${tl}` };
            }
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
            return { type: 'error', content: `cat: ${arg || '(no file specified)'}: No such file or directory` };

        case 'open':
            if (arg === 'shiplog') return { type: 'navigation', target: 'shiplog' };
            if (arg === 'graveyard') return { type: 'navigation', target: 'graveyard' };
            return { type: 'error', content: `open: no such item: ${arg}` };

        case 'git':
            if (arg === 'log') return { type: 'navigation', target: 'shiplog' };
            if (arg === 'status') return { type: 'text', content: EASTER_EGGS['git status'] || 'On branch main' };
            if (arg === 'blame') return { type: 'text', content: EASTER_EGGS['git blame'] || '' };
            if (arg === 'push') return { type: 'text', content: EASTER_EGGS['git push'] || '' };
            if (arg.startsWith('commit')) return { type: 'text', content: 'Please write better commit messages. — Future Shivam' };
            return { type: 'error', content: `git: '${arg}' is not a git command.` };

        case 'coffee':
        case 'tip':
            return { type: 'action', content: 'brewing...', target: 'buy_coffee' };

        case 'history':
            return { type: 'action', target: 'history' };

        case 'tree':
            return {
                type: 'text',
                content: `.
├── skills/
│   ├── technical/
│   └── creative/
├── thoughts/
│   ${THOUGHTS.map((_, i) => `├── entry_${i + 1}`).join('\n│   ')}
├── about.txt
├── contact.txt
├── resume.pdf
├── timeline.txt
├── shiplog/
└── graveyard/

${THOUGHTS.length + 8} items`
            };

        case 'which':
        case 'where':
            if (arg === 'shivam') return { type: 'text', content: '/users/shivam/bengaluru/building-stuff' };
            return { type: 'text', content: `${arg}: not found` };

        case 'man':
            if (arg === 'shivam') return { type: 'navigation', target: 'about' };
            return { type: 'text', content: `No manual entry for ${arg || '(nothing)'}` };

        case 'touch':
            return { type: 'text', content: `touch: cannot touch '${arg}': Read-only file system. This is a portfolio, not a playground.` };

        case 'mkdir':
            return { type: 'text', content: `mkdir: cannot create directory '${arg}': This portfolio is carefully curated.` };

        case 'chmod':
            return { type: 'text', content: 'chmod: changing permissions of \'portfolio\': Operation not permitted. Nice try though.' };

        case 'curl':
            if (arg.includes('shivam') || arg.includes('portfolio')) {
                return { type: 'text', content: 'You\'re already here. Look around.' };
            }
            return { type: 'text', content: `curl: (7) Failed to connect to ${arg}: Connection refused` };

        case 'ping':
            if (arg === 'shivam' || arg === 'biswal') {
                return { type: 'text', content: `PING ${arg} (127.0.0.1): 56 data bytes\n64 bytes: icmp_seq=0 ttl=64 time=0.028ms\n64 bytes: icmp_seq=1 ttl=64 time=0.031ms\n--- ${arg} is alive and building ---` };
            }
            return { type: 'text', content: `PING ${arg}: Name or service not known` };

        case 'hostname':
            return { type: 'text', content: 'biswal-os.local' };

        case 'uname':
            return { type: 'text', content: 'ShivamOS 16.0.0 biswal-os arm64 Bengaluru/IN' };

        default:
            return { type: 'error', content: `command not found: ${base}. type 'help' for available commands.` };
    }
}

export { TRASH_RESPONSES };
