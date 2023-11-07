/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // "./renderer/**/*.{js,ts,jsx,tsx,mdx}",
        "./predefined/**/*.{ts,js}",
        // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#E23F33',
                'neural-dark': '#0F1114',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            boxShadow: "inset 0 0 160px 130px rgba(0,0,0,1)",
            keyframes: {
                fadeIn: {
                    "0%": {opacity: 0},
                    "100%": {opacity: 1},
                },
                fadeOut: {
                    "0%": {opacity: 1},
                    "100%": {opacity: 0},
                },
                slideIn: {
                    '0%': {transform: 'translateX(-100%)', opacity: '0'},
                    '100%': {transform: 'translateX(0)', opacity: '1'},
                },
                slideOut: {
                    '0%': {transform: 'translateX(0)', opacity: '1'},
                    '100%': {transform: 'translateX(100%)', opacity: '0'},
                },
                shadowBlinkIn: {
                    '0%': {boxShadow: "inset 0 0 100vh 100vh rgba(0,0,1)", opacity: '0'},
                    '100%': {boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)", opacity: '1'},
                },
                shadowBlinkOut: {
                    '0%': {boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)", opacity: '1'},
                    '100%': {boxShadow: "inset 0 0 100vh 100vh rgba(0,0,0,1)", opacity: '0'},
                },
                zoomIn: {
                    '0%': { transform: 'scale(0, 0)' },
                    '100%': { transform: 'scale(1, 1)' },
                },
                zoomOut: {
                    '0%': { transform: 'scale(1, 1)' },
                    '100%': { transform: 'scale(0, 0)' },
                }
            },
            animation: {
                fadeIn: "fadeIn 1s ease-in forwards",
                fadeOut: "fadeOut 0.3s ease-in forwards",
                slideIn: 'slideIn 1s ease-in-out forwards',
                slideOut: 'slideOut 1s ease-in-out forwards',
                shadowBlinkIn: 'shadowBlinkIn 2.5s ease-in-out forwards',
                shadowBlinkOut: 'shadowBlinkOut 1.5s ease-in-out forwards',
                zoomIn: 'zoomIn 0.6s ease forwards',
                zoomOut: 'zoomOut 0.6s ease forwards'
            },
        },
    },
    plugins: [],
};