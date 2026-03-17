import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `
  query ContributionGraph($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function generateFallbackData() {
    const weeks = [];
    const now = new Date();
    for (let w = 51; w >= 0; w--) {
        const days = [];
        for (let d = 0; d < 7; d++) {
            const date = new Date(now);
            date.setDate(date.getDate() - w * 7 - d);
            // Realistic pattern — active bursts with quiet periods
            const base = Math.random();
            let count = 0;
            if (base > 0.55) count = Math.floor(Math.random() * 8) + 1;
            if (base > 0.85) count = Math.floor(Math.random() * 15) + 5;
            days.push({
                date: date.toISOString().split("T")[0],
                contributionCount: count,
            });
        }
        weeks.push({ contributionDays: days });
    }
    return { weeks, totalContributions: 847 };
}

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME || "shivambiswal";

    if (!token) {
        // Fallback gracefully
        return NextResponse.json({
            calendar: generateFallbackData(),
            isFallback: true,
        });
    }

    try {
        const res = await fetch(GITHUB_GRAPHQL, {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: QUERY, variables: { username } }),
            next: { revalidate: 3600 }, // cache 1hr
        });

        if (!res.ok) throw new Error("GitHub API error");

        const data = await res.json();
        const calendar =
            data?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) throw new Error("No calendar data");

        return NextResponse.json({ calendar, isFallback: false });
    } catch {
        return NextResponse.json({
            calendar: generateFallbackData(),
            isFallback: true,
        });
    }
}
