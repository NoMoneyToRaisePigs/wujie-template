export interface IUserInfoRaw {
  accountNonExpired: boolean
  accountNonLocked: boolean
  adminId: string
  appCode: string
  authRequestIp: string
  authorities: Authority[]
  csrfHeader: string
  email: string
  id: number
  tags: Record<string, string[]>
}

interface Authority {
  resourceCode: string
}

export interface IUserInfo {
  adminId: string
  appCode: string
  csrfHeader: string
  email: string
  id: number
  permissionCodes: Authority[]
  tagMap: Record<string, string[]>
}