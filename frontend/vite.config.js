import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  },
  plugins: [react()],
})
