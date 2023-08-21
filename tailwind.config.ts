import { type Config } from "tailwindcss";

export default {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tungsten: ["tungsten", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
