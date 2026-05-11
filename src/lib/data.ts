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
        text: "i haven't solved how to make agentic workflows reliably execute in independent parallel states without failure. still working on it. the logs are not pretty.",
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
        "fastapi", "html", "postgresql", "mongodb atlas", "redis",
        "distributed systems", "devops workflows", "cloud infrastructure",
        "llm integrations", "agentic workflows", "automation pipelines",
        "flutter", "vercel", "claude code", "amazon bedrock",
        "n8n", "docker", "antigravity", "ollama",
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
        hash: "3f9c2b1",
        date: "2025-12-01",
        message: "feat: green credit — AI sustainability OS",
        description: "carbon footprint estimation, ESG AI agent, gamified impact tracking. won eureka! at iit bombay.",
        status: "live",
    },
    {
        hash: "e91b4f2",
        date: "2026-03-15",
        message: "ship: trinetra — OSINT multi agent orchestrator",
        description: "shipped trinetra an OSINT multi agent orchestrator platform using advanced reasoning and puzzle piecing to find an individual",
        status: "live",
    },
    {
        hash: "b2a3c4d",
        date: "2024-08-01",
        message: "init: firsttrack.ai — observability dashboard agent",
        description: "firsttrack.ai is an observability dashboard agent which observes anomalies and executes to self-heal any problem",
        status: "beta",
    },
    {
        hash: "c2b5x9e",
        date: "2026-05-08",
        message: "ship: splitta — expense tracking app",
        description: "shipped a small expense tracking app with automated reminders and upi payment redirects called splitta using mongodb atlas",
        status: "live",
    },
    {
        hash: "m9z1p4q",
        date: "2026-04-22",
        message: "ship: RS fitness website",
        description: "shipped RS fitness website for a local gym",
        status: "live",
    },
    {
        hash: "k7l2w8n",
        date: "2026-04-10",
        message: "feat: HPC automation tool",
        description: "shipped HPC automation tool which is just some basic tool to help teachers make HPC files of 200+ students at one time at much faster pace, saving hours",
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
        hash: "d4e5f6a",
        date: "2025-06-15",
        message: "ship: novak editing cohort platform",
        description: "bootstrapped an editing community & learning platform. managed content pipelines.",
        status: "sunset",
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
        message: "feat: discord bots for cafe games and hotel games",
        description: "built custom discord bots for cafe games and hotel games",
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
        name: "edusentry",
        born: "2025",
        died: "2025",
        epitaph: "an agentic automated question paper generator using custom pipelines and RAG",
        causeOfDeath: "Lack of support",
        postMortem: "a multi-agent system to generate a perfect question paper for school teachers in less than 10 minutes, which is directly printable (success rate 95.6% tested). reason of discontinue: not enough value addition and support from the community, everyone told me it would fail as a SaaS, because frontier LLMs provide almost same outputs, which is false.",
    },
    {
        name: "pacea",
        born: "2025",
        died: "2025",
        epitaph: "an agentic fitness coach which analyses bca reports and tailors workouts",
        causeOfDeath: "Oversaturated market",
        postMortem: "an agentic fitness coach which analyses bca reports and tailors workouts based on an individuals output. reason of discontinue: too generic and oversaturated",
    },
    {
        name: "rekal",
        born: "2024",
        died: "2024",
        epitaph: "a free and open source custom aio downloader/converter tool supporting all sites and all formats",
        causeOfDeath: "Inefficient architecture",
        postMortem: "a free and open source custom aio downloader/converter tool supporting all sites and all formats. reason of discontinue: inefficient and too bulky to distribute",
    },
]

