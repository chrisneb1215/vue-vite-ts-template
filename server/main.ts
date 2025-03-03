// server/entry-server.ts
import { createSSRApp } from 'vue'
import { createSSRRouter } from '../src/router/ssrRoutes'
import { renderToString } from 'vue/server-renderer'
import { createHead, renderHeadToString } from '@vueuse/head'

export async function render(url: string, baseUrl: string): Promise<{ appHtml: string; head: string }> {
    console.log(`🚀 [SSR] Rendering for: ${url}`)

    const router = createSSRRouter()
    const matchedRoute = router.resolve(url)

    if (!matchedRoute.matched.length) {
        console.warn(`❌ [SSR] No matching route for: ${url}`)
        return { appHtml: `<h1>404 Not Found</h1>`, head: '' }
    }

    // ✅ Dynamically load the matched component (without App.vue)
    const PageComponent = matchedRoute.matched[0].components!.default

    if (!PageComponent) {
        console.error(`❌ [SSR] No component found for ${url}`)
        return { appHtml: `<h1>SSR Error: No Component</h1>`, head: '' }
    }

    const app = createSSRApp(PageComponent)
    const head = createHead({})

    app.use(router)
    app.use(head)

    await router.push(url)
    await router.isReady()

    const appHtml = await renderToString(app)
    const headTags = await renderHeadToString(head)

    console.log(`✅ [SSR] Rendered HTML for ${url}`)

    return {
        appHtml,
        head: headTags.headTags.replace('content="/', `content="${baseUrl}/`)
    }
}
