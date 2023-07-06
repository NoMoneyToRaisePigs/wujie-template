
import { useUserStore } from '@/stores/user'

export function useAuth(codes: string | string[], prefix: string) {
  const userStore = useUserStore()
  const permissionMap = userStore.permissionMap

  if (Array.isArray(codes) && codes.every((str) => typeof str === 'string')) {
    if (prefix) {
      return codes.map((code) => !!permissionMap[`${prefix}.${code}`])
    } else {
      return codes.map((code) => !!permissionMap[code])
    }
  } else {
    console.warn('useAuth only support a list of string')

    return []
  }
}