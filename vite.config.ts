import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    return {
        plugins: [
            vue(),
            vueJsx(),
            UnoCSS(),
            AutoImport({
                // include: [/\.[tj]sx?$/],
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    {
                        '@/utils/request': [['default', 'request']]
                    }
                ],
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'icon'
                    })
                ],
                dts: 'types/auto-imports.d.ts'
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'icon',
                        enabledCollections: ['ep']
                    })
                ],
                dts: 'types/components.d.ts'
            }),
            Icons({
                autoInstall: true
            })
        ],
        build: {
            ssr: isSsrBuild, // Enable SSR mode when building for the server
            outDir: isSsrBuild ? 'dist/server' : 'dist/',
            emptyOutDir: true,
            rollupOptions: {
                input: isSsrBuild
                    ? {
                          server: 'server/server.ts', // Server entry
                          main: 'server/main.ts'
                      }
                    : 'index.html' // Client entry
            }
        },
        base: '/',
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode)
        },
        css: {
            preprocessorOptions: {
                scss: { api: 'modern-compiler' }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~': path.resolve(__dirname, 'types')
            }
        },
        server: {
            port: 8080,
            middlewareMode: true,
            proxy: {
                '/s/': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    rewrite: (path) => {
                        const newPath = path.replace(/^\/s/, '')
                        return newPath
                    }
                },
                '/proxy': {
                    target: process.env.VITE_APP_API_HOST,
                    changeOrigin: true,
                    rewrite: (path) => {
                        const newPath = path.replace(/^\/proxy/, '')
                        console.log(`Rewriting ${path} to ${newPath}`)
                        return newPath
                    }
                }
            }
        },
        preview: {
            port: 8080,
            proxy: {
                '/s/': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    rewrite: (path) => {
                        const newPath = path.replace(/^\/s/, '')
                        return newPath
                    }
                }
            }
        }
    }
})
