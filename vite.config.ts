import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Bind explicitly to IPv4 loopback — on Windows `localhost` may resolve to
    // IPv6 (::1) while Vite listens on IPv4, leaving the page unreachable.
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
})
