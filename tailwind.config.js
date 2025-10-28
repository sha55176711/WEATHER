/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./{App,components,services,utils}/**/*.{js,ts,jsx,tsx}",
    "./components/weather-graphics/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(5%)' },
        },
        'sun-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.95 },
        },
        'icon-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'icon-drift': {
          '0%': { transform: 'translateX(-3px)' },
          '100%': { transform: 'translateX(3px)' },
        },
        'icon-sway': {
            '0%, 100%': { transform: 'rotate(-5deg)' },
            '50%': { transform: 'rotate(5deg)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'cloud-drift': 'cloud-drift 20s alternate infinite ease-in-out',
        'sun-pulse': 'sun-pulse 5s infinite ease-in-out',
        'icon-pulse': 'icon-pulse 3s infinite ease-in-out',
        'icon-drift': 'icon-drift 4s infinite alternate ease-in-out',
        'icon-sway': 'icon-sway 2.5s infinite ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.4)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.4)',
        },
        '.text-shadow-lg': {
          textShadow: '0 10px 20px rgba(0,0,0,0.4)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      })
    })
  ],
}