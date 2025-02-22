import { createRouter, createMemoryHistory } from 'vue-router'
import Article from '@/views/Share.vue'

const routes = [{ path: '/article', component: Article }]

export function createSSRRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes
    })
}

export function getSSRRoutePaths(): string[] {
    return routes.map((route) => route.path.replace(/\/:.*$/, ''))
}
