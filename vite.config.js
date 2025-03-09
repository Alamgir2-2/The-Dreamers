import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  assetsInclude: ['**/*.jpg','**/*.JPG', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
  plugins: [
    react(),
    tailwindcss(),
  ],
})

