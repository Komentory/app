module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', ...require('tailwindcss/defaultConfig').theme.fontFamily.sans],
    },
    extend: {
      width: {
        22: '5.5rem',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',
        'span-23': 'span 23 / span 23',
      },
      colors: {
        main: {
          lighter: '#1FFF8F',
          light: '#00F57A',
          DEFAULT: '#00AB55',
          dark: '#007A3D',
          darker: '#005229',
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
