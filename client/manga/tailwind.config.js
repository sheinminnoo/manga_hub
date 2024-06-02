/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.smooth-scroll': {
          'scroll-behavior': 'smooth',
        },
      });
    },
  ],
}