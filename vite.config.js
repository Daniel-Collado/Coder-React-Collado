import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Cambia el límite (en KB)
    outDir: 'dist', // Carpeta de salida
    assetsDir: 'assets', // Subcarpeta para JS, CSS, etc.
  },
  base: '/', // Asegura que las rutas sean relativas a la raíz
})


  
