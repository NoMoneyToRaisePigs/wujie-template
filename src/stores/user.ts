import { defineStore } from 'pinia'

import { getToken } from '@/utils/token'
import { getUserInfo } from '@/api/user/userInfo'
import type { IUserInfo } from '@/type/user'

// TODO: define Store type interface
export const useUserStore = defineStore('user', () => {
  // TODO: try to get parent store, this should be properly encapsulated
  const parentUserStore = window.parent.__store__?.state?.user

  const email = ref(parentUserStore?.email ?? '')
  const token = ref(parentUserStore?.token ?? getToken())
  const permissionMap = ref(parentUserStore?.authMap ?? {} as Record<string, any>)
  const tagMap = ref(parentUserStore?.tags ?? {} as Record<string, any>)
  const ready = ref(!!parentUserStore?.email)
  const csrfHeader = ref(parentUserStore?.csrfHeader ?? '')

  async function getInfo() {
    const data : IUserInfo = await getUserInfo().send()

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