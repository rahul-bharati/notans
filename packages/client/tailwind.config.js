/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      beige: "#F5F5DC",
      orange: "#FF6B00",
      "navy-blue": "#030225",
    },
  },
  plugins: [],
};
