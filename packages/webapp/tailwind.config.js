const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1400px',
  },
  theme: {
    maxWidth: {
      '1/4': '25%%',
      '2/4': '50%',
      '3/4': '75%',
    },
    colors: {
      naplesYellow: '#F9DC5C',
      crayolaYellow: '#FAE588',
      bananaMania: '#FCEFB4',
      cornsilk: '#FDF8E1',
      ...colors
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['serif'],
    },
    extend: {
      margin: {
        '1/5': '20%',
        '2/5': '400%',
        '3/5': '60%',
        '4/5': '80%',
      }
    },
  },
  plugins: [],
};
