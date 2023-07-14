import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { ElMessage } from 'element-plus'

import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/user'

import type { FetchRequestInit } from 'alova/GlobalFetch'
import type { Ref } from 'vue'

const requestMap = new Map()
const STATUS_OK = 'OK'
const STATUS_ERROR = 'ERROR'
const CODE_MAP = {
  '000000000': 'OK',
  '100001003': 'user report not found', // TODO: move this to i18n config
}

export function random_unique() {
  return Date.now() + Math.random().toString(16)
    .slice(2)
}

export interface AlovaResponseConfig extends FetchRequestInit {
  requestId?: string
  startRequestTime?: number
}

const alovaInstance = createAlova<Ref<unknown>, Ref<unknown>, AlovaResponseConfig, Response, Headers>({
  baseURL: import.meta.env.MODE === 'localhost' ? '/admin-api' : import.meta.env.VITE_APP_API_URL,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: (method) => {
    console.log('sending reqeust:', method)
    // TODO: collect url here.

    // TODO:  signal download and get additional config params here


    const userStore = useUserStore()

    // set basic headers
    method.config.credentials = 'include'
    method.config.mode = 'cors'
    method.config.referrerPolicy='unsafe-url'
    method.config.headers['X-Token'] = getToken()
    method.config.headers['X-CSRF'] = `csrfToken:${userStore.csrfHeader},${userStore.csrfHeader}`
    // TODO: take X-Admincommon-Tenant header from userStore.
    method.config.headers['X-Admincommon-Tenant'] = 'main'
    method.config.headers['X-Lang'] = 'en'
    method.config.headers['Content-Type'] = 'application/json'

    // TODO: correct csrf header below
    // if(method.url.includes('info')) {
    //   if(useUserStore().ready) {
    //     method.config.headers['X-CSRF'] = userCsrfHeader
    //   }
    // }

    // set unique request id
    const requestId = random_unique()

    method.config.requestId = requestId

    // track api performance
    method.config.startRequestTime = performance.now()
  },
  responsed: {
    onSuccess: async(response, method) => {
      console.log('on success response:', response)
      console.log('on success method:', method)
      const endRequestTime = performance.now()
      const totalRequestTime = endRequestTime - method.config.startRequestTime!

      if(totalRequestTime > 3000) {
        console.error(`request to ${response.url} is slow, takes ${totalRequestTime} milliseconds`)
      }

      const resResult = await response.json()

      if(resResult.status) {
        // TODO: fill logics for other status
        if(resResult.status === STATUS_OK) {
          console.log('status ok')

          // TODO: check with BE is there any API that returns 200 without data?
          return resResult.data
        } else {
          setTimeout(() => {
            ElMessage(`receiving ${method.url}`)
          })

          console.log('status error')

          return Promise.reject(resResult.errorData)
          // return resResult.errorData
        }
      } else {
        console.log('no status')

        return resResult
      }
    },
    onError: async(error, method) => {
      // TODO: handle 401 and 403 here:
      console.log('onError response error:', error)
      console.log('onError response method:', method)
    },
  },
  timeout: 60000,  // TODO: SET This to Env Var
})

export default alovaInstance