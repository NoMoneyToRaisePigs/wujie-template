import type { IUserInfo, IUserInfoRaw } from '@/type/user'
import alova from '@/utils/request'

export function normalize(userInfoRaw: IUserInfoRaw) : IUserInfo {
  return {
    adminId: userInfoRaw.adminId,
    appCode: userInfoRaw.appCode,
    email: userInfoRaw.email,
    id: userInfoRaw.id,
    permissionCodes: userInfoRaw.authorities,
    tagMap: userInfoRaw.tags,
    csrfHeader: userInfoRaw.csrfHeader,
  }
}

export const USERINFO_URI = '/user/info'

// NOTE: you usually don't need a method to return this here, but this is a bit different, this is being referenced in src/stores/user.ts before alova is actually initilized.
// export const getUserInfo = alova.Get<IUserInfo, IUserInfoRaw>(USERINFO_URI, { transformData: normalize })
export const getUserInfo = () => alova.Get<IUserInfo, IUserInfoRaw>(USERINFO_URI, { transformData: normalize })