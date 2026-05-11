"use client"
import React from 'react';
import { TerminalBody } from '../TerminalBody';
import { InputLine } from '../InputLine';
import { PERSON } from '../../lib/data';

export function AboutWindow() {
    return (
        <TerminalBody>
            <InputLine path="~/about" readOnly value="cat about.txt" blinking={false} />
            <div className="font-mono text-[13px] leading-[1.7] whitespace-pre-wrap mt-2 select-text">
                {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${PERSON.name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  I won a national entrepreneurship hackathon at IIT Bombay at 16. 
  Not by luck, by shipping.

  That experience crystallized something I already knew: 
  the gap between a good idea and a good product is execution. 
  I live in that gap.

  I'm a full-stack engineer and product builder based in Bengaluru. 
  I work at the intersection of engineering, design, and product strategy, 
  writing production-grade code while keeping the user experience and 
  business outcome in clear view.

  [Tech stack]
  → React, Next.js, TypeScript, n8n, JavaScript, Python, MongoDB, Supabase, Clerk, Sentry, Git, Lua
  → Cloud infrastructure, DevOps workflows, scalable architectures
  → UI/UX design using Next.js, React, Framer, Photoshop & After Effects
  → VFX using Adobe After Effects, Blender for 3D Design

  [What makes me different?]
  I've been building real products for clients since I was 11.

  At 11: Worked with YouTube creators (200k+ subs), built Discord bots (Node.js/MongoDB).
  At 12-13: Freelanced on Roblox (60+ clients, 25k+ CCU games). Bootstrapped NovaK editing cohort.
  At 14: Shipped firsttrack.ai (self-healing observability agent platform).
  At 15: Freelance editing whilst shipping indie software, sharpening debugging skills.
  At 16: Won Eureka! (IIT Bombay). Shipped trinetra, green credit, and client commissions.

  I don't just write code. I ask why we're building this, who it's for, 
  and what success actually looks like.

  Currently a student (Target 2027), building aggressively, exploring 
  founding opportunities, and learning in public.

  If you're a founder who needs a technical co-founder or someone who's 
  crazy about building, I'm always open.

  📩 DM me or connect. Let's build something worth shipping.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>
            <div className="mt-2">
                <InputLine path="~/about" blinking={true} />
            </div>
        </TerminalBody>
    );
}
