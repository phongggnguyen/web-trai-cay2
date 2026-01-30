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
        // Primary Gradient System - Vibrant Green
        primary: {
          DEFAULT: "#4cdf20",
          light: "#8FFF5F",
          dark: "#3bc015",
          darker: "#2D5016"
        },
        // Accent Colors - Warm tones for "ripe fruit" feel
        accent: {
          warm: "#FF6B35",
          orange: "#F4A259",
          yellow: "#FFE66D"
        },
        // Backgrounds
        background: {
          light: "#f6f8f6",
          dark: "#0f1710" // Deeper "Forest Night"
        },
        // Surfaces
        surface: {
          light: "#ffffff",
          dark: "#1a2c15"
        },
        // Text
        text: {
          main: "#111b0e",
          muted: "#609550",
          secondary: "#a0c695"
        },
        // Borders
        border: {
          color: "#eaf3e8",
          dark: "#2d4625"
        }
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
