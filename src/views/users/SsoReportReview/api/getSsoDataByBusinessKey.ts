import alova from '@/utils/request'
import { formatTimestamp, formatPossibleEmptyString } from '@/utils/formatter'

import { SSO_CREATE_TYPE_BATCH } from '../constant'

import type { ISsoBusinessDataRaw, ISsoBusinessData } from '../type/ssoBusinessData'

export interface Payload {
  id: string
}

export function normalize(raw: ISsoBusinessDataRaw) : ISsoBusinessData {
  return {
    submissionDetail: {
      id: raw.id,
      agent: raw.submitAgent,
      reportType: raw.type,
      submissionTime: raw.submitTime,
      summary: raw.summary,
      victimCid: raw.caseId,
      victimUid: String(raw.userId),
      suspectUid: raw.relateUserId,
      status: raw.businessStatus,
      attachments: raw.attachments,
      uid: String(raw.userId),
      blacklistAddress: raw.blacklistAddress,
      isBatchCreate: raw.createType === SSO_CREATE_TYPE_BATCH,
    },
    reviewResult: {
      id: raw.id,
      cid: raw.reviewCaseId,
      expireDate: raw.reviewExpireTime,
      note: raw.reviewNote,
      priority: raw.reviewPriority,
      status: raw.reviewStatus,
      businessStatus: raw.businessStatus,
      usdValue: raw.reviewAmount,
      suspectUid: raw.reviewRelateUserId,
    },
  }
  // return {
  //   submissionDetail: {
  //     id: raw.id,
  //     agent: raw.submitAgent,
  //     reportType: raw.type,
  //     submissionTime: formatTimestamp(raw.submitTime),
  //     summary: raw.summary,
  //     victimCid: raw.caseId,
  //     victimUid: formatPossibleEmptyString(raw.userId),
  //     suspectUid: formatPossibleEmptyString(raw.relateUserId),
  //     status: raw.businessStatus,
  //     attachments: raw.attachments,
  //     uid: formatPossibleEmptyString(raw.userId),
  //     blacklistAddress: formatPossibleEmptyString(raw.blacklistAddress),
  //     isBatchCreate: raw.createType === SSO_CREATE_TYPE_BATCH,
  //   },
  //   reviewResult: {
  //     id: raw.id,
  //     cid: formatPossibleEmptyString(raw.reviewCaseId),
  //     expireDate: formatTimestamp(raw.reviewExpireTime),
  //     note: formatPossibleEmptyString(raw.reviewNote),
  //     priority: raw.reviewPriority,
  //     status: raw.reviewStatus,
  //     businessStatus: raw.businessStatus,
  //     usdValue: raw.reviewAmount,
  //     suspectUid: formatPossibleEmptyString(raw.reviewRelateUserId),
  //     _raw: raw,
  //   },
  // }
}

export const GET_SSO_BUSINESS_DATA_URL = '/inspector/sso/report/get-by-business-key'

export function getSsoDataByBusinessKey(payload: Payload) {
  return alova.Post<ISsoBusinessData, ISsoBusinessDataRaw>(GET_SSO_BUSINESS_DATA_URL, payload, { transformData: normalize })
}