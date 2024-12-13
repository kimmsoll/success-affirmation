/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      while: {
        500: '#FFFFFF',
      },
      gray: {
        100: '#E8E8E8',
        200: '#D3D3D3',
        300: '#B2B2B4',
        400: '#8C8C8E',
        500: '#7B7B7E',
        600: '#515155',
        700: '#3F3F44',
        800: '#363638',
        900: '#2F3032',
      },
      black: {
        500: '#252527',
      },
      yellow: {
        500: '#F5F378',
        600: '#E1E06E',
      },
      green: {
        500: '#7FEC93',
      },
      pink: {
        500: '#F799B1',
      },
      red: {
        500: '#F55E5F',
      },
    },
  },
  plugins: [],
};
