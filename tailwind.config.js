/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope'],
        heading: ['Manrope'],
        title: ['TT-Carvist-Trial-Bold']
      },
      fontWeight: {
        light: 300,
        bold: 800,
        extralight: 200,
      },
      fontSize: {
        x1: '22px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}