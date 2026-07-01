/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1320",
        surface: "#121D2E",
        surface2: "#16243A",
        teal: "#5EEAD4",
        tealDim: "#134E4A",
        ink: "#E6EDF3",
        muted: "#7E93A7",
        line: "#1E2D42",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        fillBubble: {
          "0%": { fill: "transparent", stroke: "#1E2D42" },
          "60%": { fill: "#5EEAD4", stroke: "#5EEAD4" },
          "100%": { fill: "#134E4A", stroke: "#5EEAD4" },
        },
        sweep: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(2000%)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        fadeUp: "fadeUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
