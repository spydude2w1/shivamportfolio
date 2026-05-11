export const PERSON = {
    name: "Shivam Biswal",
    tagline: "techpreneur. builder. the one who automated that.",
    location: "Bengaluru, IN",
    email: "shivambiswal01@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivambiswal/",
    github: "https://github.com/spydude2w1",
    coffee: "https://buymeacoffee.com/shivambiswal",
    school: "AECS Magnolia Maaruti Public School",
    graduating: 2027,
}

export const PROJECTS = [
    {
        id: "green_credit",
        name: "green_credit",
        candid: "built an AI sustainability operating system with two teammates. we won at iit bombay.",
        problem: "greenwashing at scale. no scalable way to verify eco claims or make sustainable behavior rewarding, along with a state-of-the-art  ESG AI Agent to automate complete ESG reporting.",
        team: ["shivam biswal", "yuvaan kasliwal", "hamza supediwala"],
        teamName: "net zero ninjas",
        whatIDid: "full technical architecture. carbon footprint estimation, recommendation workflows, impact tracking, gamification, automated data ingestion + verification.",
        stack: ["python", "fastapi", "postgresql", "llm integrations", "automation pipelines"],
        outcome: "all india rank 1 — eureka! junior 2025, e-cell, iit bombay · jan 2026",
        honest: "the hard part wasn't the AI. it was making the data trustworthy first. garbage in = prettier garbage out.",
        link: null,
    },
    {
        id: "urbexa_projects",
        name: "urbexa_projects",
        candid: "designed + built a website for a construction company. make it premium without looking like construction.",
        problem: "construction clients need to understand a complex approval-to-completion process before they commit. most sites are brochureware.",
        team: null,
        whatIDid: "information architecture, SEO-oriented service pages, approval explainer sections, structured FAQ, visual direction.",
        stack: ["next.js", "typescript", "javascript"],
        outcome: "live jan 2026 — serving as client platform + organic SEO engine",
        honest: "hardest part was restraint. clients want to list everything. the job is to cut until only the right things remain.",
        link: null,
    },
    {
        id: "firsttrack_ai",
        name: "firsttrack_ai",
        candid: "my startup. building it while still in school.",
        problem: "most businesses need observability AI but don't know where to start. most consultants sell complexity they don't need.",
        team: null,
        whatIDid: "build and consult on observability AI solutions. hands-on. no decks without deliverables.",
        stack: ["python", "llm tooling", "automation frameworks"],
        outcome: "ongoing — founder & ceo",
        honest: "founding while resource-constrained sharpens decisions fast. you learn what actually matters.",
        link: null,
    },
    {
        id: "holographic_games",
        name: "holographic_games",
        candid: "design lead + game developer for a studio. remotely. at 15.",
        problem: "studios need consistent visual quality across rotating freelancers. quality control is the real job.",
        team: null,
        whatIDid: "led design QC, UI/UX systems, thumbnails, icons. also built game UI framework, matchmaking systems, datastore services in server-side scripts.",
        stack: ["blender", "photoshop", "after effects", "lua"],
        outcome: "5 thumbnails · 7 game icons · 43 UI frames · 3 ads | may 2022 – dec 2023",
        honest: "this is where i learned taste is a system, not a feeling. you can't QC work without articulating exactly what's wrong.",
        link: null,
    },
    {
        id: "hiddendevs",
        name: "hiddendevs",
        candid: "4 years. 60+ clients. where i learned to actually work.",
        problem: "game developers need fast, high-quality assets — icons, thumbnails, banners, 3D renders — with zero back-and-forth.",
        team: null,
        whatIDid: "delivered creative work for 60+ clients including 10+ game studios. graphic design, 3D rendering, UI/UX.",
        stack: ["photoshop", "lightroom", "after effects", "blender"],
        outcome: "60+ clients · 10+ game studios | jun 2020 – aug 2024",
        honest: "60+ clients means 60+ different definitions of done. scope creep, client psychology, fast delivery under pressure.",
        link: null,
    },
]

export const THOUGHTS = [
    {
        text: "the problem with most automation is that it just moves the bottleneck. real automation removes the entire category of problem.",
        tag: "systems",
    },
    {
        text: "i keep coming back to the gap between what LLMs can do and what people think they can do. the interesting work lives in that gap.",
        tag: "ai",
    },
    {
        text: "design and engineering feel like different disciplines until you do both. then they feel like the same thing with different syntax.",
        tag: "craft",
    },
    {
        text: "winning at eureka! taught me that judges evaluate the problem framing before the solution. if they don't believe the problem is real, nothing else matters.",
        tag: "product",
    },
    {
        text: "i haven't solved how to make agentic workflows reliably recover from failure states. still working on it. the logs are not pretty.",
        tag: "honest",
    },
]

export const TIMELINE = [
    { year: "11 y/o", event: "first taste of the internet.", sub: "worked with youtube creators (200k+ subs), built discord bots (node.js/mongodb)." },
    { year: "12-13 y/o", event: "freelancing era & novak.", sub: "60+ clients on roblox for games with 25k+ CCU. bootstrapped NovaK editing cohort." },
    { year: "14 y/o", event: "shipped firsttrack.ai.", sub: "built a self-healing observability agent platform (observe and execute)." },
    { year: "15 y/o", event: "indie software & debugging.", sub: "freelance editing while sharpening software engineering skills on indie projects." },
    { year: "16 y/o", event: "eureka! winner & trinetra.", sub: "won all india rank 1 at iit bombay. shipped trinetra, worked on green credit & commissions." },
    { year: "2027", event: "graduating.", sub: "exploring founding opportunities and building aggressively in parallel." },
]

export const SKILLS = {
    technical: [
        "python", "typescript", "javascript", "next.js", "react.js",
        "fastapi", "django", "html", "c++", "postgresql", "mongodb",
        "distributed systems", "devops workflows", "cloud infrastructure",
        "llm integrations", "agentic workflows", "automation pipelines",
    ],
    creative: [
        "blender", "adobe photoshop", "after effects", "lightroom",
        "ui/ux", "visual systems", "game asset design", "3d rendering",
        "information architecture", "web design",
    ],
}

export type ShipLogEntry = {
    hash: string;
    date: string;
    message: string;
    description: string;
    status: 'live' | 'beta' | 'sunset';
}

export const SHIP_LOG: ShipLogEntry[] = [
    {
        hash: "a8f2c3d",
        date: "2026-05-10",
        message: "feat: portfolio v2 — macos-inspired OS experience",
        description: "complete rewrite. animated wallpaper, terminal CLI, music player, github widget. the one you're looking at right now.",
        status: "live",
    },
    {
        hash: "e91b4f2",
        date: "2026-03-15",
        message: "ship: trinetra — surveillance intelligence platform",
        description: "real-time threat detection system with computer vision and alert pipelines.",
        status: "live",
    },
    {
        hash: "c7d8a1e",
        date: "2026-01-20",
        message: "ship: urbexa projects website",
        description: "premium construction company website. SEO-optimized service pages, approval explainer sections.",
        status: "live",
    },
    {
        hash: "3f9c2b1",
        date: "2025-12-01",
        message: "feat: green credit — AI sustainability OS",
        description: "carbon footprint estimation, ESG AI agent, gamified impact tracking. won eureka! at iit bombay.",
        status: "live",
    },
    {
        hash: "d4e5f6a",
        date: "2025-06-15",
        message: "ship: novak editing cohort platform",
        description: "bootstrapped an editing community & learning platform. managed content pipelines.",
        status: "sunset",
    },
    {
        hash: "b2a3c4d",
        date: "2024-08-01",
        message: "init: firsttrack.ai — observability agent platform",
        description: "self-healing observability platform. observe. execute. repeat.",
        status: "beta",
    },
    {
        hash: "f1e2d3c",
        date: "2023-12-20",
        message: "feat: holographic games UI framework",
        description: "complete game UI system, matchmaking, datastore services. served 25k+ CCU.",
        status: "sunset",
    },
    {
        hash: "a9b8c7d",
        date: "2022-06-01",
        message: "init: hiddendevs freelance career",
        description: "started freelancing. 60+ clients, 10+ game studios, 4 years of shipping.",
        status: "sunset",
    },
    {
        hash: "0a1b2c3",
        date: "2021-01-15",
        message: "feat: discord bots for youtube creators",
        description: "built custom bots (node.js/mongodb) for creators with 200k+ subscribers.",
        status: "sunset",
    },
]

export type GraveyardEntry = {
    name: string;
    born: string;
    died: string;
    epitaph: string;
    causeOfDeath: string;
    postMortem: string;
}

export const GRAVEYARD: GraveyardEntry[] = [
    {
        name: "SocialSync",
        born: "2024",
        died: "2024",
        epitaph: "A social media scheduler that nobody asked for.",
        causeOfDeath: "Market saturation",
        postMortem: "Built a full MVP before doing any customer discovery. Found out there were 47 identical products. Lesson: talk to users before writing a single line of code.",
    },
    {
        name: "StudyBuddy AI",
        born: "2023",
        died: "2024",
        epitaph: "An AI tutoring platform. Smart, but too early.",
        causeOfDeath: "Scope creep → burnout",
        postMortem: "Started as a simple flashcard app, evolved into 'what if it also does video calls, whiteboards, and AR?' — tried to build everything at once. Died under its own ambition.",
    },
    {
        name: "QuickInvoice",
        born: "2023",
        died: "2023",
        epitaph: "Generate invoices in 30 seconds. Died in 30 days.",
        causeOfDeath: "Lost interest",
        postMortem: "Technically worked. But I didn't care about invoicing enough to maintain it. Passion matters. If you're bored building it, users will be bored using it.",
    },
    {
        name: "CodeArena",
        born: "2022",
        died: "2022",
        epitaph: "Competitive coding meets battle royale.",
        causeOfDeath: "Technical complexity",
        postMortem: "Real-time multiplayer + code execution sandboxing + leaderboards. For a solo 13-year-old developer. I learned what 'infrastructure overhead' means the hard way.",
    },
    {
        name: "PixelForge",
        born: "2022",
        died: "2022",
        epitaph: "An online pixel art editor with collaboration.",
        causeOfDeath: "Shipped a better idea instead",
        postMortem: "Was actually going well, but pivoted my energy to freelancing which was generating actual revenue. Sometimes killing a project is the right business decision.",
    },
]

