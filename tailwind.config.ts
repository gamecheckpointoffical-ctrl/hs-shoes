import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        cream: "#F8F6F1",
        stone: "#E8E4DC",
        ash: "#9B9588",
        gold: "#A88B5C",
        sand: "#D4C5A9",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-up": "fadeUp 0.8s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideIn: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};

export default config;
