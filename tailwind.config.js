/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
module.exports = {
  fontFamily: {
    sans: ['Montserrat', 'sans-serif'],
  },
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      colors: {
        "green-500": '#50B258',
        "red-500": '#B74646',
        "gray-500": '#1C1C1C',
        primaryColor: withOpacity('--primaryColor'),
        secondaryColor: withOpacity('--secondaryColor'),
        thirdyColor: withOpacity('--thirdyColor'),
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #DC095E 0%, #760532 100%)',
        'gradient-1': 'linear-gradient(120deg, rgba(23, 23, 23, 0.85) 4.31%, rgba(20, 20, 20, 0.85) 105.5%)',
      }
    },
  },
};
