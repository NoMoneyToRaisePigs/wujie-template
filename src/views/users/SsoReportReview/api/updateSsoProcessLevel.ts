import alova from '@/utils/request'

import {
  SSO_REVIEW_ACTION_START_REVIEW,
  SSO_REVIEW_ACTION_ARCHIVE,
} from '../constant'


export interface Payload {
  action: typeof SSO_REVIEW_ACTION_START_REVIEW | typeof SSO_REVIEW_ACTION_ARCHIVE
  id?: number
  operator: string
}

export const UPDATE_SSO_PROCESS_LEVEL_URL = '/inspector/sso/report/action'

export const updateSsoProcessLevel = (payload: Payload) => alova.Post(UPDATE_SSO_PROCESS_LEVEL_URL, payload)