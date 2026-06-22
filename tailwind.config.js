/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-red': '#8B0000',
        'dark-red-light': '#A52A2A',
        'dark-red-dark': '#5C0000',
        'bg-black': '#121212',
        'bg-card': '#1C1C1C',
        'bg-card-2': '#242424',
        gold: '#D4AF37',
        'gold-light': '#F0D060',
      },
      fontFamily: {
        hebrew: ['Heebo', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
