/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'holiday-green': {
          bg: '#E8F5E9',
          text: '#2E7D32',
        },
      },
    },
  },
  plugins: [],
};