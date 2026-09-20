import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Material 3 — Navy Blue & White ──────────────────────── */
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          surface: "var(--primary-surface)",
          container: "var(--primary-container)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          hover: "var(--secondary-hover)",
          container: "var(--secondary-container)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          hover: "var(--accent-hover)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          dim: "var(--surface-dim)",
          "container-lowest": "var(--surface-container-lowest)",
          "container-low": "var(--surface-container-low)",
          container: "var(--surface-container)",
          "container-high": "var(--surface-container-high)",
        },
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
        neutral: {
          light: "var(--neutral-light)",
          surface: "var(--neutral-surface)",
          border: "var(--neutral-border)",
        },
        text: {
          dark: "var(--text-dark)",
          light: "var(--text-light)",
          soft: "var(--text-soft)",
          muted: "var(--text-muted)",
        },
        on: {
          primary: "var(--on-primary)",
          secondary: "var(--on-secondary)",
          surface: "var(--on-surface)",
          "surface-variant": "var(--on-surface-variant)",
          "primary-container": "var(--on-primary-container)",
          "secondary-container": "var(--on-secondary-container)",
        },
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
        },
        success: {
          DEFAULT: "var(--success)",
          container: "var(--success-container)",
        },
        whatsapp: {
          DEFAULT: "var(--whatsapp)",
          hover: "var(--whatsapp-hover)",
        },
      },
      borderRadius: {
        /* Material 3 shape scale */
        "m3-xs": "4px",
        "m3-sm": "8px",
        "m3-md": "12px",
        "m3-lg": "16px",
        "m3-xl": "28px",
        "m3-full": "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
