import alova from '@/utils/request'

import type { ISsoBusinessDataRaw } from '../type/ssoBusinessData'


export interface Payload extends Pick<ISsoBusinessDataRaw,
'id'
|'reviewCaseId'
| 'reviewExpireTime'
| 'reviewNote'
| 'reviewPriority'
| 'reviewRelateUserId'
| 'reviewStatus'> {
  operator: string
}

export const UPDATE_SSO_REVIEW_RESULT_URL = '/inspector/sso/report/edit'

export const updateSsoReviewResult = (payload: Payload) => alova.Post(UPDATE_SSO_REVIEW_RESULT_URL, payload)