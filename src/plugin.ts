import type { Plugin } from 'vue'

export default {
  install: (app: any, options: any) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$ttt = (key: string) => {
      return `${key}-xxx`
    }

    app.config.globalProperties.$t = (key: string) => {
      return `${key}-xxx`
    }

    return app
  },
} as Plugin