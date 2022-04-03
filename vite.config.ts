import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'PWA 视频播放器',
        short_name: 'PWA 视频播放器',
        description: 'PWA 视频播放器',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '512x512'
          }
        ],
        // @ts-ignore
        file_handlers: [
          {
            action: "./index.html",
            accept: {
              "video/*": [".mp4", ".mkv"]
            }
          }
        ]
      }
    })]
})
