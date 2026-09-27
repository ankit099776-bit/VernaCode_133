import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8000',
        changeOrigin: true,
        secure: false
      },
      '/ws': {
        target: 'wss://127.0.0.1:8000',
        ws: true,
        secure: false
      },
      '/health': {
        target: 'https://127.0.0.1:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
