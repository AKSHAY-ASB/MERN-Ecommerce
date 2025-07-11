// import path from "path"
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     resolve: {
//     alias: {
//       "@": path.resolve(path.__dirname, "./src"),
//     },
//     server: {
//     proxy: {
//       '/auth': 'http://localhost:5000'
//     }
//   }
//   },
// })



import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
    },
  },
});
