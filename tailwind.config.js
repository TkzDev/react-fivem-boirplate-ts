/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: "'Archivo', sans-serif",
        archivob: "'Archivo Black', sans-serif"
      },
      colors: {
        'neutral': '#ff006828',
        'primary': 'var(--primary-color)'
      },
      backgroundImage: {
        'background': 'url("./background/background.png")',
        'topShape': 'url("/icons/topShape.svg")'
      },
      borderWidth: {
        '1' : '1.4px',
        '4' : '3px',
      },
      borderColor: {
        'base': '#ffffff1e'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}