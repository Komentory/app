module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', ...require('tailwindcss/defaultConfig').theme.fontFamily.sans],
    },
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      colors: {
        main: {
          lighter: '#BFEAD4',
          light: '#80D5AA',
          DEFAULT: '#00AB55',
          dark: '#008743',
          darker: '#006231',
          darkest: '#004321',
        },
        secondary: {
          lighter: '#FDFCFB',
          light: '#F6F4EF',
          DEFAULT: '#E3DDCF',
          dark: '#626268',
          darker: '#3E3E41',
          darkest: '#333333',
        },
        blue: {
          DEFAULT: '#2D7DD2',
        },
        yellow: {
          DEFAULT: '#FFB238',
        },
        red: {
          DEFAULT: '#FE4A49',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
