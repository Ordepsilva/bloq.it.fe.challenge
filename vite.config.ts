import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['normal_pokeball.svg', 'ultra_ball.svg'],
      manifest: {
        name: 'Bloq-it Pokédex',
        short_name: 'Pokédex',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        icons: [
          {
            src: '72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
