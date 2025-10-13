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
          DEFAULT: "#0a1a3f", // Lacivert
          light: "#1e3a8a",
        },
        accent: {
          DEFAULT: "#f97316", // Turuncu CTA rengi
        },
      },
    },
  },
  plugins: [],
};

export default config;
