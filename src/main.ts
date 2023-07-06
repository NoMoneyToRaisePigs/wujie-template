import './assets/main.css'
// import '@element-plus/theme-chalk/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vLoading } from 'element-plus'

import App from './App.vue'
import router from './router'
import i18n from './lang'

import type { I18n } from 'vue-i18n'
// import plugin from './plugin'
import type { RouteLocationNormalized } from 'vue-router'

function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(i18n)

  app.directive('loading', vLoading)

  // app.use(plugin)

  registerRouter()
  app.mount('#app')

  return app
}

const urlMapping = {
  '/users/sso-report-review': '/users/sso-report-review',
} as Record<string, string>

// admin-token=ac9c881d-48d5-4402-b1fa-bedc86d8da14
function registerRouter() {
  window.$wujie?.bus.$on('routeChange', (routeRaw: RouteLocationNormalized) => {
    if(urlMapping[routeRaw.path]) {
      router.push(routeRaw)
    }
  })
}

declare global {
  interface Window {
    __store__: any
    $wujie: any
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean
    // 子应用mount函数
    __WUJIE_MOUNT: () => void
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void
    // 子应用无界实例
    __WUJIE: { mount: () => void }
  }
}

if (window.__POWERED_BY_WUJIE__) {
  console.log('__POWERED_BY_WUJIE__')
  let app: any

  window.__WUJIE_MOUNT = () => {
    console.log('__WUJIE_MOUNT')
    app = bootstrap()
  }
  window.__WUJIE_UNMOUNT = () => {
    console.log('__WUJIE_UNMOUNT')
    app.unmount()
  }
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  bootstrap()
}