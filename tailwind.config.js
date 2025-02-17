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
    sans: ['Outfit', 'sans-serif'],
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
        primaryColor: withOpacity('--primaryColor'),
        secondaryColor: withOpacity('--secondaryColor'),
        thirdyColor: withOpacity('--thirdyColor'),
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #DC095E 0%, #760532 100%)',
      }
    },
  },
};
