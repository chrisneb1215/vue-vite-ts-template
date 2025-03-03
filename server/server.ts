// server/server.ts
import Fastify from 'fastify'
import middie from '@fastify/middie' // ✅ Import Fastify middleware plugin
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import path from 'path'
import { getSSRRoutePaths } from '@/router/ssrRoutes'
import { checkIsCrawler } from './crawler'

async function createServer() {
    const fastify = Fastify()

    // ✅ Register Fastify middleware plugin before using Vite
    await fastify.register(middie)

    const isDev = process.env.NODE_ENV !== 'production'

    // ✅ Create Vite in middleware mode (for development)
    const vite = await createViteServer({
        server: { middlewareMode: isDev }, // ✅ Use middleware mode only in dev
        appType: 'custom'
    })

    if (isDev) {
        fastify.use(vite.middlewares) // ✅ Only use Vite middleware in dev
    }

    const entryServerPath = isDev ? path.resolve('server/main.ts') : path.resolve('dist/server/main.js') // ✅ Use correct entry point

    fastify.get('/*', async (req, reply) => {
        try {
            const userAgent = req.headers['user-agent'] || ''
            const url = req.originalUrl
            console.log(url)

            const isCrawler = checkIsCrawler(userAgent)
            if (!isCrawler) {
                reply.status(301).redirect('viber://pa?chatURI=megabangla&context=xxxxx')
            }
            // const url = req.url
            const baseUrl = `${req.protocol}://${req.headers.host}`

            let template = fs.readFileSync(path.resolve('index.html'), 'utf-8')

            if (isDev) {
                template = await vite.transformIndexHtml(url, template) // ✅ Only transform in dev
            }

            let appHtml = ''
            let headTags = ''

            const { render } = await vite.ssrLoadModule(entryServerPath)
            const result = await render(url, baseUrl)
            appHtml = result.appHtml
            headTags = result.head

            // ✅ Inject OG meta tags
            template = template
                .replace('<!--head-outlet-->', `${headTags}`)
                .replace('<title>Vite + Vue + TS</title>', '')

            const html = template.replace('<!--ssr-outlet-->', appHtml)

            reply.type('text/html').send(html)
        } catch (e) {
            vite.ssrFixStacktrace(e)
            reply.status(500).send(e.stack)
        }
    })

    return fastify
}

// Start Fastify server
createServer().then((fastify) => {
    fastify.listen({ port: 3000 }, () => {
        console.log('🚀 Server running at http://localhost:3000')
    })
})
