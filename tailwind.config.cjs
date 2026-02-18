/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clinical: {
          50: "#f6f8fb",
          100: "#eef2f7",
          200: "#d7e1ee",
          300: "#b7c9df",
          400: "#8ba7c8",
          500: "#5f86b0",
          600: "#496c92",
          700: "#3c5776",
          800: "#2f425a",
          900: "#222f41"
        }
      }
    }
  },
  plugins: []
};
