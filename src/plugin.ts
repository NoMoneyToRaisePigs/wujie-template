import type { Plugin } from 'vue'

export default {
  install: (app: any, options: any) => {
    // TODO: inject your plugin here, can do some fomatters here.
    app.config.globalProperties.$thousands = (key: string) => {
      // turn 1000000 -> 1,000,000
      return ''
    }

    return app
  },
} as Plugin