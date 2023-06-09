/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'sidebarblue': '#6E44FF',
        'sidebarbluehover': '#7F5CFF',
        'infored': '#E63946',
        'underscoregreen': '#00CC66',
        'btngreen': '#07ba2b',
        'btnpurple': '#E2A0FF',
        'btnpurplehover': '#A970C2',
        'btnpurpleclick': '#ECC1FF',
        'taskcolor' : '#FF3431',
        'taskcolorhover' : '#ad1e1c'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
