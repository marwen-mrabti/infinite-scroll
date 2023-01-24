/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    FontFamily: {
      bebas: ["Bebas Neue", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
