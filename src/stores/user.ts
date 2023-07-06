import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRequest } from 'alova'

import { getToken } from '@/utils/token'
import { getUserInfo } from '@/api/user/userInfo'
import type { IUserInfo } from '@/type/user'

export const useUserStore = defineStore('user', () => {
  const parentUserStore = window.parent.__store__?.state?.user

  const email = ref(parentUserStore?.email ?? '')
  const token = ref(parentUserStore?.token ?? getToken())
  const permissionMap = ref({} as Record<string, any>)
  const tagMap = ref(parentUserStore?.tags ?? {} as Record<string, any>)
  const ready = ref(!!parentUserStore?.email)
  const csrfHeader = ref(parentUserStore?.csrfHeader ?? '')

  async function getInfo() {
    const data : IUserInfo = await getUserInfo().send()
    // const { data } =  useRequest(getUserInfo)

    email.value = data.email
    permissionMap.value = data.permissionCodes.reduce((acc, cur) => ({ ...acc, [cur.resourceCode]: cur }) , {})
    tagMap.value = data.tagMap

    ready.value = true
    csrfHeader.value = data.csrfHeader
  }

  // const userCsrfHeader = computed(() => {
  //   return csrfHeader.value
  // })

  return {
    ready,
    email,
    token,
    permissionMap,
    tagMap,
    csrfHeader,
    // userCsrfHeader,
    getInfo,
  }
})

// export const useUserStore = defineStore('user', {
//   state: () => ({
//     email: '',
//     token: '',
//     permissionMap: {},
//     tagMap: {},
//     ready: false,
//     csrfHeader: '',
//   }),
//   actions: {
//     async getInfo() {
//       return new Promise((resolve, reject) => {
//         resolve({
//           email: '123',
//           token: getToken(),
//         })
//         // getUserInfo.send().then((data : IUserInfo) => {
//         //   this.email = data.email
//         //   this.tagMap = data.tagMap

//         //   this.ready = true
//         //   this.csrfHeader = data.csrfHeader
//         // })
//       })
//     },
//   },
// })