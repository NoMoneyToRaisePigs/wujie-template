
import { useRequest } from 'alova'
import { getUserInfo } from '@/api/user/userInfo'

import type { Method, RequestBody, RequestHookConfig, UseHookReturnType } from 'alova'
import { computed } from 'vue'

export function useUser() {
  const { loading, data, error } = useRequest(getUserInfo)

  return {
    loading,
    data,
    error,
  }
}

// import { updateReviewResult, type ReviewResult } from '@/api/taskpool/sso/updateReviewResult'

// export function updateSsoResult() {
//   const payload = {
//     id: 123,
//     cid: null,
//     status: 'PENDING',
//     businessStatus: 'PENDING_ARCHIVE',
//     priority: '',
//     expireDate: 123124123,
//     suspectUid: null,
//     usdValue: 123,
//     note: null,
//   } as ReviewResult


//   const { loading, data, error, send }  = useRequest(updateReviewResult(payload))
// }

// export function useFetchTest(){

// }

// interface RequestMethod<S = any, E = any, R = any, T = any, RC = any, RE = any, RH = any, P extends RequestBody = any> extends Method<S, E, R, T, RC, RE, RH> {
//   data?: P
// }

// interface APIProcessor<T,TR, V extends RequestBody = RequestBody> {
//   fetcher: RequestMethod<any, any, T, any, any, any, any, V>
//   normorlizer: (data: TR) => T
// }

// interface useFetchReturn<T =  any, TR = any, V extends RequestBody = RequestBody>> {

// }

// export function useFetch<T =  any, TR = any, V extends RequestBody = RequestBody>(processor: APIProcessor<T, TR, V>, options?: RequestHookConfig<any, any, T, any, any, any, any>) {

//   const { loading, data, error, send } = useRequest(processor.fetcher, options)


//   const nomorlizedData = computed(() => processor.normorlizer(data.value))

//   return {
//     loading,
//     data,
//     error,
//     send,
//   }
// }

// interface Processor {
//   fetcher: Method
//   nomorlize: (raw: any) => any
// }

// export function useFetcher(processor: Processor, options?: RequestHookConfig) {
//   const { loading, data, error, send } = useRequest(processor.fetcher, options)

//   const nomorlizedData = computed(() => processor.nomorlize(data.value))

//   return {
//     loading,
//     data,
//     nomorlizedData,
//     error,
//     send,
//   }
// }


// const { loading, data, nomorlizedData, error, send } = useFetcher({ fetcher: getUserInfo, nomorlize: (data) => data })