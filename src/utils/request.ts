import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { ElMessage, menuEmits } from 'element-plus'

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

// 1. Create an alova instance
const alovaInstance = createAlova<Ref<unknown>, Ref<unknown>, AlovaResponseConfig, Response, Headers>({
  baseURL: 'https://admin-ui.qa1fdg.net/admin-api',
  // baseURL: 'https://admin-ui-wujie.fe.qa1fdg.net/admin-api',
  // baseURL: '/admin-api',
  // VueHook is used to create ref status, including request status loading, response data data, request error object error, etc.
  statesHook: VueHook,

  // request adapter, it is recommended to use the fetch request adapter
  requestAdapter: GlobalFetch(),
  beforeRequest: (method) => {
    console.log('sending reqeust:', method)
    // collect url here.

    // signal download and get additional config params hpere

    // set basic headers
    // ElMessage(`sending ${method.url}`)
    // add into request map with unique request id
    const userStore = useUserStore()

    method.config.credentials = 'include'
    method.config.mode = 'cors'
    method.config.referrerPolicy='unsafe-url'
    method.config.headers['X-Token'] = getToken()
    method.config.headers['X-CSRF'] = `csrfToken:${userStore.csrfHeader},${userStore.csrfHeader}`
    method.config.headers['X-Admincommon-Tenant'] = 'main'
    method.config.headers['X-Lang'] = 'en'
    method.config.headers['Content-Type'] = 'application/json'
    // if(method.url.includes('info')) {
    //   if(useUserStore().ready) {
    //     method.config.headers['X-CSRF'] = userCsrfHeader
    //   }
    // }

    // pending some other headers, X-LANG,lang,X-CSRF,X-Admincommon-Tenant

    const requestId = random_unique()

    method.config.requestId = requestId

    method.config.startRequestTime = performance.now()
    // requestMap.set(requestId, method.config.)

  },
  // adapter GlobalFetch will return a Response instance
  // you can set a global response interception to return actual json data
  // responded: async (response, method) => {
  //   console.log('response:', response)
  //   console.log('method:', method)
  //   const endRequestTime = performance.now()
  //   const totalRequestTime = endRequestTime - method.config.startRequestTime!

  //   if(totalRequestTime > 3000) {
  //     console.error(`request to ${response.url} is slow, takes ${totalRequestTime} milliseconds`)
  //   }

  //   const resResult = await response.json()

  //   //TODO: there is a problem here, I want to know why !!!!
  //   if(resResult.status) {
  //     if(resResult.status === STATUS_OK) {
  //       console.log('status ok')
  //       return resResult.data
  //     } else {
  //       setTimeout(() => {
  //         ElMessage(`receiving ${method.url}`)
  //       })

  //       console.log('status error')
  //       return Promise.reject(resResult.errorData)
  //       //return resResult.errorData
  //     }
  //   } else {
  //     console.log('no status')
  //     return resResult
  //   }

  //   // return resResult.status ? resResult.data : resResult

  //   //TODO: check with team on when we have the data directly in result
  //   // if(resResult.status === null || resResult.status === undefined) {
  //   //   return resResult
  //   // } else {
  //   //   //TODO: check how many status we have here
  //   //   if(resResult.status.code === STATUS_OK) {
  //   //     return resResult.data
  //   //   } else if(resResult.status.code === STATUS_ERROR) {
  //   //     const err = resResult.errorData || resResult.message || resResult
  //   //     ElMessage.error(err)
  //   //     return Promise.reject(err)
  //   //   } else {
  //   //     return Promise.reject(resResult)
  //   //   }
  //   // }
  // },
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

      // TODO: there is a problem here, I want to know why !!!!
      if(resResult.status) {
        if(resResult.status === STATUS_OK) {
          console.log('status ok')

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
      console.log('onError response error:', error)
      console.log('onError response method:', method)
    },
  },
  // responded: {
  //   onSuccess: async (response, method) => {
  //     console.log('response:', response)
  //     console.log('method:', method)
  //     const endRequestTime = performance.now()
  //     const totalRequestTime = endRequestTime - method.config.startRequestTime!

  //     if(totalRequestTime > 3000) {
  //       console.error(`request to ${response.url} is slow, takes ${totalRequestTime} milliseconds`)
  //     }

  //     const result = await response.json()

  //     //TODO: check with team on when we have the data directly in result
  //     if(result.status === null || result.status === undefined) {
  //       return result
  //     }

  //     if(result.status) {
  //       //TODO: check how many status we have here
  //       if(result.status.code === STATUS_OK) {
  //         return result.data
  //       } else if(result.status.code === STATUS_ERROR) {
  //         const err = result.errorData || result.message || result
  //         ElMessage.error(err)
  //         return Promise.reject(err)
  //       } else {
  //         return Promise.reject(result)
  //       }
  //     }

  //     return result
  //   },
  //   onError: async (error, method) => {
  //     //TODO: handle 401 and 403 here
  //     return Promise.reject(error)
  //   },
  // },
  timeout: 60000,  // SET This to Env Var
})

export default alovaInstance