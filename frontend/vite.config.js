import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // For Render subpath
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url.onrender.com', // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
