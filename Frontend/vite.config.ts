import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation
          'vendor-animation': ['framer-motion', 'gsap'],
          // UI & forms
          'vendor-ui': ['lucide-react', 'react-icons', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // 3D / WebGL
          'vendor-3d': ['three', 'ogl', 'postprocessing'],
          // Backend SDKs
          'vendor-backend': ['@supabase/supabase-js'],
        },
      },
    },
  },
})
