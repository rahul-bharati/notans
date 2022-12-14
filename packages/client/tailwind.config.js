/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      beige: "#F5F5DC",
      orange: "#FF6B00",
      "navy-blue": "#030225",
    },
  },
  plugins: [],
};
