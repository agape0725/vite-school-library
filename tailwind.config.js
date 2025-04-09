/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        dirtyWhite: "#F5F5F5",
        dirtyWhite200: "#EDE8DC",
        blue100: "#F2F9FF",
        blue200: "#D9EAFD",
        blue400: "#789DBC",
        blue500: "#00215E",
        blue600: "#0A5EB0",
        blue700: "#0B192C",
        blue900: "#183B4E",
        black500: "#2C2C2C",
        black900: "#1A1A1D",
        orange100: "#FFB433",
        orange200: "#EC5228",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        londrina: ["Londrina Outline", "sans-serif"],
        bungee: ["Bungee Outline", "sans-serif"],
        chango: ["Chango", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lilita: ["Lilita One", "sans-serif"],
      },
      backgroundImage: {
        "stack-book": "url('./assets/images/stack-book-1.png')",
      },
    },
  },
  plugins: [],
};
