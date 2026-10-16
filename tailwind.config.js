/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#0a0a0a',
          50: '#262626',
          100: '#1f1f1f',
          200: '#171717',
          300: '#121212',
          400: '#0e0e0e',
          500: '#0a0a0a',
          600: '#070707',
          700: '#050505',
          card: '#111111',
          border: '#222222',
        },
        bone: {
          DEFAULT: '#f4f1ec',
          50: '#ffffff',
          100: '#faf8f5',
          200: '#f4f1ec',
          300: '#e7e2d7',
          400: '#d7cfbf',
          500: '#b8ab94',
          card: '#ebe6de',
          border: '#ddd6c9',
        },
        brass: {
          DEFAULT: '#b08d57',
          light: '#cca975',
          dark: '#8e6f3d',
          glow: 'rgba(176, 141, 87, 0.25)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
