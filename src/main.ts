import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import 'virtual:uno.css'
import '@/styles/index.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')
