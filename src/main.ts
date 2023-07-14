import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vLoading } from 'element-plus'

import MainApp from './App.vue'
import router from './router'
import i18n from './lang'

import type { App } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'

function bootstrap() {
  const app = createApp(MainApp)

  // plugins
  app.use(createPinia())
  app.use(router)
  app.use(i18n)

  // directives
  app.directive('loading', vLoading)

  // wujie
  registerRouter(router)

  app.mount('#app')

  return app
}

function registerRouter(router: Router) {
  window.$wujie?.bus.$on('routeChange', (routeRaw: RouteLocationNormalized) => {
    if(router.hasRoute(routeRaw.name ?? '404')) {
      router.replace(routeRaw)
    }
  })
}

if (window.__POWERED_BY_WUJIE__) {
  console.log('__POWERED_BY_WUJIE__')
  let app: App

  window.__WUJIE_MOUNT = () => {
    console.log('__WUJIE_MOUNT')
    app = bootstrap()
  }
  window.__WUJIE_UNMOUNT = () => {
    console.log('__WUJIE_UNMOUNT')
    app.unmount()
  }
  window.__WUJIE.mount()
} else {
  bootstrap()
}

declare global {
  interface Window {
    $wujie: any
    __POWERED_BY_WUJIE__?: boolean
    __WUJIE: { mount: () => void }
    __WUJIE_MOUNT: () => void
    __WUJIE_UNMOUNT: () => void
    __store__: any
  }
}