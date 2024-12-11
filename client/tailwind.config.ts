/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       shade: {
          100: "#ffe5ec",
          200: "#ffc2d1",
          300: "#ffb3c6",
          400: "#ff8fab",
          500: "#fb6f92",
       },
       alert: "#ff0000",
      },
      fontFamily: {
        spaceGrotsek: ["Space Grotesk", "sans-serif"],
      }
    },
  },
  plugins: [],
}