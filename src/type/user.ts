export interface IUserInfoRaw {
  adminId: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  authRequestIp: string
  appCode: string
  email: string
  id: number
  authorities: Authority[]
  tags: Record<string, string[]>
  csrfHeader: string
}

interface Authority {
  resourceCode: string
}

export interface IUserInfo {
  adminId: string
  appCode: string
  email: string
  id: number
  permissionCodes: Authority[]
  tagMap: Record<string, string[]>
  csrfHeader: string
}