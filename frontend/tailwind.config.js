/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(28.0deg)' },
          '20%': { transform: 'rotate(-16.0deg)' },
          '30%': { transform: 'rotate(28.0deg)' },
          '40%': { transform: 'rotate(-8.0deg)' },
          '50%': { transform: 'rotate(20.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        bounce: {
          '0%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },

          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
      animation: {
        'waving-button': 'wave 1s linear infinite',
        'bounce-fast': 'bounce 0.4s infinite',
        'bounce-slow': 'bounce 4s infinite',
        'bounce-reverse': 'bounce-reverse 4s reverse',
        'spin-fast': 'spin 0.4s linear infinite',
        'ping-once': 'ping 1s linear',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
