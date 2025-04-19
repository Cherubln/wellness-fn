import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import plugin from "tailwindcss/plugin";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F5EFEB",
        secondary: "#17df7f",
        accent: "#e7f5f0",
        neutral: "#8c8c8c",
      },
    },
  },
  plugins: [
    daisyui,
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari */,
          },
        },
      };

      addUtilities(newUtilities);
    }),
  ],
  daisyui: {
    themes: [],
  },
} satisfies Config;
