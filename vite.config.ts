import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/LAGUNEN-ETXEA/',  // Définir le chemin de base pour le déploiement sur GitHub Pages
});