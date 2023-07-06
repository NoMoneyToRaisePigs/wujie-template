import { createI18n } from 'vue-i18n'

import enMessages from './en'
import zhMessages from './zh'

const messages = {
  en: {
    ...enMessages,
  },
  zh: {
    ...zhMessages,
  },
}

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages,
})

const org_t = i18n.global.t

// TODO: add typing, temporary solution for i18n, need optimization
i18n.global.t = function(key: string | number, ...args: any[]) {
  console.log('t has been called with', key)
  const localLocaleText = org_t?.apply(this, [key, ...args]) ?? key

  if(localLocaleText !== key) {
    return localLocaleText
  }

  const parentLocaleText = window.parent?.__i18n__?.t(key) ?? key

  return parentLocaleText
}

console.log('i18n global t has been replaced')


export default i18n