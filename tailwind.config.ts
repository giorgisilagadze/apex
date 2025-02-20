import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "rgba(3, 44, 95, 1)",
        blueOpacity: "rgba(3, 44, 95, 0.5)",
        blueOpacityLight: "rgba(3, 44, 95, 0.1)",
        grey: "rgba(97, 94, 94, 1)",
      },
      backgroundColor: {
        lightBlue: "rgba(64,95,242,1)",
      },
      boxShadow: {
        dropDown: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
    },
  },
  plugins: [],
} satisfies Config;
