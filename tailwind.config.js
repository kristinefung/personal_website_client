/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'stone': {
          400: '#37373f',
          500: '#242528',
        }
      },
    },
  },
  plugins: [],
}

