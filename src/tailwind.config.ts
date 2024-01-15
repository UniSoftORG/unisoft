/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./predefined/**/*.{ts,tsx,js}",
    "./renderer/strategies/**/*.{ts,tsx,js}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#060708",
        "gray-dark": "#292C33",
        "gray-darker": "#181B1F",
        'gray-lightest': '#E6EAF2',
        'gray-light': '#C7CDD9',
        'gray': '#6F7480',
        primary: "#E23F33",
        "neural-dark": "#0F1114",
        "red-light": "#F5655C",
        red: "#E23F33",
        "red-dark": "#8F241C",
        "red-darker": "#591611",
        "orange-lightest": "#FFDBA6",
        "orange-light": "#FFB74D",
        orange: "#D9932B",
        "orange-dark": "#8D6118",
        "orange-darker": "#593E0F",
      },
      maxHeight: {
        full: "100%",
      },
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: "inset 0 0 160px 130px rgba(0,0,0,1)",
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "50%": { opacity: "0.1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "50%": { opacity: "0.1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        shadowBlinkIn: {
          "0%": {
            boxShadow: "inset 0 0 100vh 100vh rgba(0,0,1)",
            opacity: "0",
          },
          "100%": { boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)", opacity: "1" },
        },
        shadowBlinkOut: {
          "0%": { boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)", opacity: "1" },
          "100%": {
            boxShadow: "inset 0 0 100vh 100vh rgba(0,0,0,1)",
            opacity: "0",
          },
        },
        zoomIn: {
          "0%": { transform: "scale(0)"},
          "100%": { transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(0, 0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeOut: "fadeOut 0.3s ease-in forwards",
        slideInRight: "slideInRight 0.6s ease-in-out forwards",
        slideInLeft: "slideInLeft 0.6s ease-in-out forwards",
        slideOut: "slideOut 0.6s ease-in-out forwards",
        slideOutLeft: "slideOutLeft 0.3s ease-in-out forwards",
        shadowBlinkIn: "shadowBlinkIn 2.5s ease-in-out forwards",
        shadowBlinkOut: "shadowBlinkOut 1.5s ease-in-out forwards",
        zoomIn: "zoomIn 0.6s ease forwards",
        zoomOut: "zoomOut 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
