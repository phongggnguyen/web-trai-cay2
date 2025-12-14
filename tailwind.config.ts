import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

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
        "background-light": "#f6f8f6",
        "background-dark": "#152111",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2c15",
        "text-main": "#111b0e",
        "text-muted": "#609550",
        "text-secondary": "#a0c695",
        "border-color": "#eaf3e8",
        "border-dark": "#2d4625"
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
    forms,
    containerQueries
  ]
};

export default config;
