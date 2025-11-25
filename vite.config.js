import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://back-m41x.onrender.com', // Tu backend real
        changeOrigin: true,
        secure: false,
      },
    },
  },
})