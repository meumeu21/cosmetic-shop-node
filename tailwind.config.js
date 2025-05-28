/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
    colors: {
      'mud': '#52544E',
      'white': '#DADED6',
      'darkmud': '#41433E',
      'darkmud-deactivated': '#656761',
      'dark': '#5E655E',
    },
  },
  plugins: [],
}

