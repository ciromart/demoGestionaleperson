import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const BASE_PATH = '/demoGestionaleperson/'

// https://vite.dev/config/
export default defineConfig({
  // Il sito viene pubblicato come GitHub Pages di progetto
  // (https://<utente>.github.io/demoGestionaleperson/), quindi gli asset
  // vanno referenziati con questo sotto-percorso invece che dalla root "/".
  base: BASE_PATH,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa/apple-touch-icon.png'],
      manifest: {
        id: BASE_PATH,
        name: 'Nimbus Gestionale',
        short_name: 'Nimbus',
        description: 'Gestione clienti, ordini e notifiche in tempo reale.',
        lang: 'it',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        display: 'standalone',
        theme_color: '#1E40AF',
        background_color: '#F8FAFC',
        icons: [
          {
            src: 'pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        // Serve la index.html in cache per le rotte client-side (es.
        // /demoGestionaleperson/clienti) quando l'app è offline o installata.
        navigateFallback: `${BASE_PATH}index.html`,
      },
    }),
  ],
  server: {
    host: true,
  },
})
