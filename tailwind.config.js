/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        harubang: {
          blue: '#0082B0',
          'blue-dark': '#006b91',
          sky: '#F0F9FF',
          ink: '#334155',
          'ink-light': '#64748B',
        }
      }
    },
  },
  plugins: [],
}

