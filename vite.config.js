import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  },
  server: {
    port: 8080,
    hot: true
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'), // carpeta de salida en la raíz
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/seleccionarJuego.html')
      }
    }
  }
})

