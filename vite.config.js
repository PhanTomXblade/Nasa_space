import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    exclude: ['maplibre-gl']
  },
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Silent Sentinels – NASA Space Apps 2026',
        short_name: 'Silent Sentinels',
        description: "Explore NASA's forgotten hardware on the Moon and Mars. A 2026 NASA Space Apps Challenge experience.",
        theme_color: '#030712',
        background_color: '#030712',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/problem.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2,woff,ttf}'],
        globDirectory: 'dist',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cartocdn-gusc\.global\.ssl\.fastly\.net\/opmbuilder\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'planetary-tiles-cache',
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/images-assets\.nasa\.gov\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nasa-images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets-cache'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
