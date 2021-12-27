import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        VitePWA({
            manifest: {
                name: 'PwaPlayer',
                icons: [
                    {
                        src: 'favicon.svg',
                        sizes: '144x144'
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
            },
        })
    ]
})