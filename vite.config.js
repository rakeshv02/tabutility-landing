import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Split React into its own cached chunk — users download it once
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Inline small assets to save round trips
    assetsInlineLimit: 4096,
  },
})
