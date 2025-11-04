import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api'로 시작하는 요청은
      // target에 설정된 주소(백엔드 서버)로 대신 보내줍니다.
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true, // CORS 에러 방지를 위해 필요
      },
    },
  },
})
