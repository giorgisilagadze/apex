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
        purple: "rgba(45, 54, 145, 1)",
      },
      backgroundColor: {
        lightBlue: "rgba(64,95,242,1)",
      },
      boxShadow: {
        dropDown: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        topShadow: "0px 10px 40px 0px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "soft-bounce": "soft-bounce 1.5s infinite",
      },
      keyframes: {
        "soft-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
    screens: {
      md: { min: "375px" },
      md500: { min: "500px" },
      md600: { min: "600px" },
      sm: { min: "768px" },
      lg: { min: "1024px" },
      lg1110: { min: "1110px" },
      lg1250: { min: "1250px" },
      lg1350: { min: "1350px" },
      xl: { min: "1440px" },
      xl1550: { min: "1550px" },
      xl1600: { min: "1600px" },
      xl1680: { min: "1680px" },
      xl1740: { min: "1740px" },
      xxl: { min: "1920px" },
    },
  },
  plugins: [],
} satisfies Config;
