module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono', 'Consolas', 'ui-monospace', 'monospace']
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
      colors: {
        epistemic: '#5db84e',
        constellation: '#fcc831',
        chaos: '#ff8c36',
        agentic: '#ec4245',
        anthropic: '#e458bb',
        physical: '#954bff',
        digital: '#0090fe',
        autonomic: '#0ecbb1',
        darkgray: '#1D2225',
        grey: '#D9D9D9',
        middlegrey: '#3D4451',
      },
      borderColor: {
        DEFAULT: "#e2ddd9",
      },
      borderWidth: {
        DEFAULT: '2px',
        '1': '1px',
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
        business: {
          ...require("daisyui/src/colors/themes")["[data-theme=business]"],
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
        },
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          "primary": "#1d2226",
          "primary-content": "#e2ddd9",
          "secondary": "#1d2226",
          "accent": "#fffe00",
          "neutral": "#1d2226",
          "base-100": "#000000",
          "info": "#0f2cff",
          "success": "#00ffa8",
          "warning": "#fffe00",
          "error": "#FF0056",
        },
      }
    ],
  },
}
