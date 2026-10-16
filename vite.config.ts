import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Il sito viene pubblicato come GitHub Pages di progetto
  // (https://<utente>.github.io/demoGestionaleperson/), quindi gli asset
  // vanno referenziati con questo sotto-percorso invece che dalla root "/".
  base: '/demoGestionaleperson/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
})
