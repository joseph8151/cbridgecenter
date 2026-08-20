import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Purple — brand primary (Academic Purple, not neon)
        purple: {
          50: "#F5F2FA",
          100: "#E9E3F3",
          200: "#D3C7E6",
          300: "#B7A4D3",
          400: "#937FB0",
          500: "#5E4C82",
          600: "#4B3A6B",
          700: "#3C2F57",
          800: "#2E2443",
          900: "#201A30",
        },
        // Light Lavender secondary is purple.100 (#E9E3F3)
        lavender: {
          DEFAULT: "#E9E3F3",
          soft: "#F1EDF8",
        },
        // Cream — main background
        cream: {
          DEFAULT: "#FAF8F2",
          deep: "#F3EFE3",
        },
        // Muted Gold — accent
        gold: {
          50: "#FBF6EC",
          100: "#F3E6C9",
          300: "#DABE8C",
          500: "#C8A96B",
          600: "#AD8E52",
          700: "#8C7140",
        },
        ink: {
          DEFAULT: "#282431",
          soft: "#6F6978",
        },
        line: "#DDD7E5",
        success: "#4F8A6F",
        warn: "#C58A45",
        weak: "#C86464",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(40, 36, 49, 0.04), 0 4px 16px rgba(40, 36, 49, 0.05)",
        card: "0 1px 3px rgba(40, 36, 49, 0.06), 0 8px 24px rgba(75, 58, 107, 0.06)",
        lift: "0 8px 30px rgba(75, 58, 107, 0.14)",
      },
      letterSpacing: {
        wideish: "0.04em",
        label: "0.12em",
      },
    },
  },
  plugins: [],
};
export default config;
