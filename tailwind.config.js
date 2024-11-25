/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#00A6FF',
        'primary-green': '#7FE84D',
        'dark-bg': '#101113',
        'section-bg': 'rgb(58,59,61)',
        'border': '#3A3B3D',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}