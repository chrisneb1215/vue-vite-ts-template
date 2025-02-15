import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'Dsashboard',
        icon: IconEpMenu,
        component: () => import('@/views/app/Dashboard.vue')
    },
    {
        path: '/accounts',
        name: 'Accounts',
        icon: IconEpAvatar,
        children: [
            {
                path: 'agents',
                name: 'Agents',
                component: () => import('@/views/app/accounts/Agents.vue')
            },
            {
                path: 'players',
                name: 'Players',
                component: () => import('@/views/app/accounts/Players.vue')
            }
        ]
    }
    // {
    //     path: '/',
    //     name: 'Main',
    //     component: MainLayout,
    //     children: [
    //         {
    //             path: 'home',
    //             name: 'Home',
    //             component: () => import('@/views/Home.vue')
    //         },
    //         {
    //             path: 'dashboard',
    //             name: 'Dashboard',
    //             component: () => import('@/views/app/Dashboard.vue')
    //         }
    //     ]
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
