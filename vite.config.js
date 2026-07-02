import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
  },
  build: {
    // react-snap prerenders with an old bundled Chromium that doesn't
    // understand optional chaining / nullish coalescing (ES2020+).
    // Target ES2017 so the prerender crawl doesn't throw a SyntaxError.
    target: 'es2017',
  },
})
