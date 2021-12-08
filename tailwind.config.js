const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        rose: colors.rose,
        teal: colors.teal,
        cyan: colors.cyan,
      },
      fontFamily: {
        'oswal': ['Oswald'],
      },
      backgroundImage: theme => ({
        'milthon': "url(/img/MaskGroup.png)", 
      }),
      borderWidth: {
        'default': '1px'
      },
      animation: {
        'jello-horizontal': 'jelloHorizontal .6s linear',
      },
      keyframes: {
        jelloHorizontal: {
          '0%': {
            '-webkit-transform': 'scale3d(1, 1, 1)',
                    transform: 'scale3d(1, 1, 1)',
          },
          '30%': {
            '-webkit-transform': 'scale3d(1.25, 0.75, 1)',
                    transform: 'scale3d(1.25, 0.75, 1)',
          },
          '40%': {
            '-webkit-transform': 'scale3d(0.75, 1.25, 1)',
                    transform: 'scale3d(0.75, 1.25, 1)',
          },
          '50%': {
            '-webkit-transform': 'scale3d(1.15, 0.85, 1)',
                    transform: 'scale3d(1.15, 0.85, 1)',
          },
          '65%': {
            '-webkit-transform': 'scale3d(0.95, 1.05, 1)',
                    transform: 'scale3d(0.95, 1.05, 1)',
          },
          '75%': {
            '-webkit-transform': 'scale3d(1.05, 0.95, 1)',
                    transform: 'scale3d(1.05, 0.95, 1)',
          },
          '100%': {
            '-webkit-transform': 'scale3d(1, 1, 1)',
                    transform: 'scale3d(1, 1, 1)',
          },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
