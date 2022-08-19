module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono', 'Consolas', 'monospace']
    },
    fontSize: {
      xs: ['0.4rem', { lineHeight: '0.8rem' }],
      sm: ['0.5rem', { lineHeight: '0.8rem' }],
      base: ['0.6rem', { lineHeight: '1rem' }],
      lg: ['0.7rem', { lineHeight: '1.2rem' }],
      xl: ['0.8rem', { lineHeight: '1.4rem' }],
      '2xl': ['1rem', { lineHeight: '1.6rem' }],
      '3xl': ['1.2rem', { lineHeight: '1.8rem' }],
      '4xl': ['1.4rem', { lineHeight: '2.2rem' }],
      '5xl': ['1.6rem', { lineHeight: '2.8rem' }],
      '6xl': ['1.8rem', { lineHeight: '3.2rem' }],
      '7xl': ['2.2rem', { lineHeight: '3.8rem' }],
      '8xl': ['2.8rem', { lineHeight: '4.4rem' }],
      '9xl': ['3.5rem', { lineHeight: '5rem' }],
    },
    extend: {
      borderColor: {
        DEFAULT: "white",
      },
      borderWidth: {
        DEFAULT: '2px',
      },
      spacing: {
        '1/10': '10%',
        '9/10': '90%',
      },
      transitionProperty: {
        // allow transitioning max height
        'max-h': 'max-height',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          "base-100": "#121b1e",
        }
      }
    ],
  }
}
