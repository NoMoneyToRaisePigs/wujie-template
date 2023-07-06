import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vLoading } from 'element-plus'

import i18n from '@/lang'

import App from './App.vue'
import router from './router/index'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.directive('loading', vLoading)

app.mount('#app')
