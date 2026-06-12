import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      colors: {
        canvas: "#EEF1F8",
        surface: "#FFFFFF",
        ink: { DEFAULT: "#0F172A", 700: "#334155" },
        muted: "#64748B",
        faint: "#94A3B8",
        line: "#E5EAF2",
        win: { DEFAULT: "#0E9F6E", soft: "#E7F7F0" },
        loss: { DEFAULT: "#E02424", soft: "#FCEAEA" },
        draw: { DEFAULT: "#94A3B8", soft: "#EEF1F8" },
        warn: { DEFAULT: "#B45309", soft: "#FEF4E6" },
        // Active-team accent (set at runtime via CSS vars).
        team: { DEFAULT: "var(--team)", soft: "var(--team-soft)", on: "var(--team-on)" }
      },
      boxShadow: {
        tile: "0 2px 4px -2px rgba(15,23,42,0.06), 0 12px 28px -12px rgba(15,23,42,0.12)",
        lift: "0 8px 16px -6px rgba(15,23,42,0.1), 0 24px 50px -18px rgba(15,23,42,0.22)",
        pop: "0 1px 2px rgba(15,23,42,0.06)"
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.75rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pop: { "0%": { opacity: "0", transform: "scale(0.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        sweep: { "100%": { transform: "translateX(100%)" } }
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        pop: "pop 0.35s cubic-bezier(0.22,1,0.36,1) both"
      }
    }
  },
  plugins: []
} satisfies Config;
