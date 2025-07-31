import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel için root path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
