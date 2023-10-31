/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./renderer/**/*.{js,ts,jsx,tsx,mdx}",
    "./predefined/**/*.{js,ts,jsx,tsx,mdx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn 3s ease-in forwards",
        fadeOut: "fadeOut 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
