/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      PlayfairDisplay: ['PlayfairDisplay', 'sans-serif'],
      Heebo: ['Heebo', 'sans-serif'],
    },
    screens: {
      // follow Material UI break point ::https://mui.com/material-ui/customization/breakpoints/
      sm: '600px',
      md: '900px',
      lg: ' 1200px',
      xl: '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      subTextColor: 'rgb(153 162 168)',
      borderColor: '#D0D0D0',
      secondaryColor: '#EAC46E',
      success: '#33B9A1',
      primary: '#032240',
      errorColor: '#FF6B6B',
      warning: '#FE8653',
      info: '#395FC1',
      white: '#fff',
      black: '#000',

      light: {
        Bg: '#f8f8f8',
        Text: '#032240',
        subText: '#707B84',
        border: 'rgb(224 224 224)',
        highLightText: '#385D7E',
        scrollbarTrack: '#eeeeee',
        scrollbarThumb: '#c1c1c1',
      },
      dark: {
        Bg: '#122231',
        Text: '#fff',
        subText: '#707B84',
        modalBg: '#0c1b2f',
        border: '#45525E',
        highLightText: '#447DAF',
        scrollbarTrack: '#25384A',
        scrollbarThumb: '#ACBBC7',
      },
    },
    extend: {},
  },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false,
  },
  // important: true, // <= This is needed to some cases that Tailwind need to override Antd
  plugins: [],
};
