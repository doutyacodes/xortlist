/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#00b050',
      },
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
        "outfit-bold": ["outfit-bold", "sans-serif"],
        "outfit-medium": ["outfit-medium", "sans-serif"],
        "outfit-black": ["outfit-black", "sans-serif"],
        "outfit-extrabold": ["outfit-extrabold", "sans-serif"],
        "outfit-extralight": ["outfit-extraLight", "sans-serif"],
        "outfit-light": ["outfit-light", "sans-serif"],
        "outfit-semibold": ["outfit-semibold", "sans-serif"],
        "outfit-thin": ["outfit-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
}

