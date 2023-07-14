
import { useRequest } from 'alova'

import { getUserInfo } from '@/api/user/userInfo'

export function useUser() {
  const { loading, data, error } = useRequest(getUserInfo)

  return {
    loading,
    data,
    error,
  }
}