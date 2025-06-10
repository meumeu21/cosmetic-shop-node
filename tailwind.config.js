/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
    colors: {
      mud: "#52544E",
      white: "#DADED6",
      darkmud: "#41433E",
      darkmuddeactivated: "#656761",
      dark: "#5E655E",
      darkgreen: "#383A33",
      black: "#191818",
      hoverw: "#A8A4A4",
      hoverb: "#70746C",
      truewhite: "#FFFFFF",
      red: "#B3373E",
    },
  },
  plugins: [],
};
