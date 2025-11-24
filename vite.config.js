import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                VantResolver(),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
            'pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            'components': fileURLToPath(new URL('./src/components', import.meta.url)),
            'interfaces': fileURLToPath(new URL('./src/interfaces', import.meta.url)),
            'dtos': fileURLToPath(new URL('./src/dtos', import.meta.url)),
        },
    },
})
