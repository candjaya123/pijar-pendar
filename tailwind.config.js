/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF5EE',
          100: '#FFE9DC',
          200: '#FFDAB9',
          300: '#FFCB96',
          400: '#FFB873',
          500: '#FFA550',
          600: '#FF922D',
          700: '#E67300',
          800: '#B35900',
          900: '#804000',
        },
        primary: '#FFDAB9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
