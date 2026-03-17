import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0d0d0d",
        surface: "#141414",
        "surface-tint-blue": "#10141c",
        "surface-tint-orange": "#1c1510",
        "surface-tint-pink": "#1c1015",
        "surface-tint-green": "#101c15",
        accent: "#C8A96E",
        "accent-cyan": "#00F0FF",
        "accent-pink": "#FF003C",
        "accent-green": "#00FF66",
        "text-primary": "#E8E6E0",
        muted: "#555555",
        border: "#1F1F1F",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "Courier New", "monospace"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      animation: {
        blink: "blink 1.1s step-start infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
