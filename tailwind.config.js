/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B8755",
        secondary: "#d9fdd3",
        navcolor: "#f7f5f3",
        iconcolor: "#636261",
        brandColor: "#1daa61",
        elementBg: "#D9FDD3",
      },
    },
  },
  plugins: [],
}