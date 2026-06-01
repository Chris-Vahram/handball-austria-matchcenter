import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#08284f", 950: "#041a36", 900: "#08284f", 800: "#123a67", 100: "#dce9f7", 50: "#f1f6fc" },
        accent: { DEFAULT: "#d7283f", 700: "#aa1930", 100: "#ffe0e4", 50: "#fff2f3" },
        mist: "#f3f6fa",
        ink: "#10243d",
        line: "#dbe3ed",
        success: { DEFAULT: "#18724b", 50: "#edf9f2" },
        warning: { DEFAULT: "#a15c06", 50: "#fff8e7" }
      },
      boxShadow: {
        card: "0 10px 28px rgba(8, 40, 79, 0.08)",
        lift: "0 18px 44px rgba(8, 40, 79, 0.16)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
} satisfies Config;
