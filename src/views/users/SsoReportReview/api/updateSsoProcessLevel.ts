import alova from '@/utils/request'

import {
  SSO_REVIEW_ACTION_START_REVIEW,
  SSO_REVIEW_ACTION_ARCHIVE,
} from '../constant'


export interface Payload {
  id?: number
  action: typeof SSO_REVIEW_ACTION_START_REVIEW | typeof SSO_REVIEW_ACTION_ARCHIVE
  operator: string
}

export const UPDATE_SSO_PROCESS_LEVEL_URL = '/inspector/sso/report/action'

export function updateSsoProcessLevel(payload: Payload) {
  return alova.Post(UPDATE_SSO_PROCESS_LEVEL_URL, payload)
}