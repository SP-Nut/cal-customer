import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FA",
          100: "#D6DFEF",
          200: "#ADBFDF",
          300: "#7B98C9",
          400: "#4D72B0",
          500: "#2E5499",
          600: "#243F7A",
          700: "#1A2F5C",
          800: "#111F3D",
          900: "#0A1325"
        },
        ink: "#0F172A"
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        panel: "0 14px 40px rgba(15, 23, 42, 0.09)",
        card: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.05)"
      },
      borderRadius: {
        DEFAULT: "0.5rem"
      }
    }
  },
  plugins: []
};

export default config;
