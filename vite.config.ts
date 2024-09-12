import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
  plugins: [react()],
  base: mode === 'production' ? '/LAGUNEN-ETXEA/' : '/',  // En prod: avec préfixe, en dev: sans  // Définir le chemin de base pour le déploiement sur GitHub Pages
  }
});