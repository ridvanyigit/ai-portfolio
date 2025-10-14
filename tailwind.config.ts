import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0a1a3f", // Blue
          light: "#1e3a8a",
        },
        accent: {
          DEFAULT: "#f97316", // Orange CTA
        },
      },
    },
  },
  plugins: [],
};

export default config;
