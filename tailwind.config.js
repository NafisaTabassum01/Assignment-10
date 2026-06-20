import { heroui } from "@heroui/react";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#22577A",
        secondary: "#216869",
        accent: "#38A3A5",
      },
    },
  },

  plugins: [heroui()],
};

export default config;