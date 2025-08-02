import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', // ← this is your source
          dest: '.'                 // ← this means "copy to dist/"
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },



})
