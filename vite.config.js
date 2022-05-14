import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/course': {
        target: 'https://course-nccu.ebg.tw',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/user': {
        target: 'https://course-nccu.ebg.tw',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/api': {
        target: 'https://course-nccu.ebg.tw',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
