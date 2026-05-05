import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  publicDir: 'Assets',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three'
          if (id.includes('node_modules/gsap') || id.includes('split-type') || id.includes('framer-motion') || id.includes('lenis')) {
            return 'animation'
          }
          if (id.includes('node_modules/swiper')) return 'carousel'
          if (id.includes('node_modules')) return 'vendor'
          return undefined
        },
      },
    },
  },
})
