/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffd05e", // original yellow color for primary
        secondary: "#ffb55e", // original yellow color for secondary
        tertiary: "#3282B8",
        offwhite: "#FAF9F6",
        offWhite2: "#F5F5F5",
        offWhite3: "#e8e8e8",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "sans-serif"],
        Lustria: ["Lustria", "serif"],
        Lato: ["Lato", "sans-serif"],
      },  // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [],
};
