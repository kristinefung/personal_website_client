/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      'stone': {
        400: '#37373f',
        500: '#242528',
      }
    },
    extend: {
      colors: {
        'white': '#FFFFFF',
        'transparent': 'transparent'
      },
    },
  },
  plugins: [],
}

