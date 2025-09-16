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
          blue: '#4e7aadff', // <-- 변경된 메인 색상
          'blue-dark': '#337ac1', // <-- 메인 색상에 맞춰 어두운 버전도 변경
          sky: '#F0F9FF',
          ink: '#334155',
          'ink-light': '#64748B',
        }
      }
    },
  },
  plugins: [],
}