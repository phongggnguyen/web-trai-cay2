import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants.{js,ts,mdx}",
    "./types.{js,ts,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4cdf20",
        "primary-dark": "#3bc015",
        "background-light": "#f9fbf8",
        "background-dark": "#152111",
        "surface-light": "#ffffff",
        "surface-dark": "#1e2e19",
        "text-main": "#111b0e",
        "text-muted": "#609550",
        "border-color": "#eaf3e8",
        "border-dark": "#2a3f23"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};

export default config;
