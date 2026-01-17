import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate PDF generation libraries (only loaded when needed)
          'pdf-libs': ['jspdf', 'jspdf-autotable'],
          // Separate Supabase client
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Increase chunk size warning limit to 600kb (since we're splitting now)
    chunkSizeWarningLimit: 600,
  },
})
