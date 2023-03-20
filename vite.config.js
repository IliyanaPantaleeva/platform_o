import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/platform_o/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
