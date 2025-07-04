import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      "@": path.resolve(path.__dirname, "./src"),
    },
    server: {
    proxy: {
      '/auth': 'http://localhost:5000'
    }
  }
  },
})
