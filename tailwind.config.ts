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
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          surface: "var(--primary-surface)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          hover: "var(--accent-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          hover: "var(--secondary-hover)",
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
        whatsapp: {
          DEFAULT: "var(--whatsapp)",
          hover: "var(--whatsapp-hover)",
        },
        brand: {
          navy: "#0B0F1A",
          charcoal: "#0F1420",
          gold: "#C9A24B",
          goldLight: "#D4AF6A",
          blue: "#1E5FA8",
          blueLight: "#2C74C9",
          neutralLight: "#F7F8FA",
          textDark: "#1A1D24",
          textLight: "#FFFFFF",
          textSoft: "#EAEAEA",
          whatsapp: "#25D366",
        },
      },
    },
  },
  plugins: [],
};

export default config;
