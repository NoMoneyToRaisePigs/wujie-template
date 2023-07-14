import {
  SSO_REVIEW_STATUS_NEW,
  SSO_REVIEW_STATUS_PENDING,
  SSO_REVIEW_STATUS_RELEASE,
  SSO_REVIEW_STATUS_SAR_FILED,
  SSO_REVIEW_STATUS_IGNORE,
  SSO_REVIEW_STATUS_OTHER,

  SSO_BUSINESS_STATUE_PENDING_REVIEW,
  SSO_BUSINESS_STATUS_PENDING_ARCHIVE,

  USER_REPORT_TYPE_SSO,
  USER_REPORT_TYPE_SAR,

  SSO_CREATE_TYPE_BATCH,
  SSO_CREATE_TYPE_SINGLE,
} from '../constant'

import type {  IS3AttachmentRaw, IS3Attachment } from './attachment'

type NullableStr = string | null

export type SSOCreateType =
  typeof SSO_CREATE_TYPE_BATCH |
  typeof SSO_CREATE_TYPE_SINGLE

export type SSOReviewBusinessType =
  typeof SSO_BUSINESS_STATUE_PENDING_REVIEW |
  typeof SSO_BUSINESS_STATUS_PENDING_ARCHIVE

export type SSOReviewStatus =
  typeof SSO_REVIEW_STATUS_NEW |
  typeof SSO_REVIEW_STATUS_PENDING |
  typeof SSO_REVIEW_STATUS_RELEASE |
  typeof SSO_REVIEW_STATUS_SAR_FILED |
  typeof SSO_REVIEW_STATUS_IGNORE |
  typeof SSO_REVIEW_STATUS_OTHER

export interface ITest extends ISsoBusinessDataRaw {}

export interface ISsoBusinessDataRaw {
  archiveTime: NullableStr
  attachments: IS3AttachmentRaw[] | null
  blacklistAddress: NullableStr
  businessKey: string
  businessStatus: SSOReviewBusinessType
  caseId: string
  category: typeof USER_REPORT_TYPE_SSO | typeof USER_REPORT_TYPE_SAR
  createBy: string
  createType: SSOCreateType
  dbCreateTime: number
  dbModifyTime: number
  id: number
  relateUserId: NullableStr
  reviewAmount: number
  reviewCaseId: NullableStr
  reviewExpireTime: number
  reviewNote: NullableStr
  reviewPriority: string
  reviewRelateUserId: NullableStr
  reviewStatus: SSOReviewStatus
  submitAgent: string
  submitTime: number
  summary: string
  taskPoolActivity: any
  type: string
  updateBy: string
  userId: number
}

export interface ISsoBusinessData {
  reviewResult: ReviewResult
  submissionDetail: SubmissionDetail
}


export interface SubmissionDetail {
  agent: string
  attachments?: IS3Attachment[] | null
  blacklistAddress?: NullableStr
  id?: number
  isBatchCreate?: boolean
  reportType: string
  status?: SSOReviewBusinessType
  submissionTime: number
  summary: string
  suspectUid?: NullableStr
  uid?: string
  victimCid: string
  victimUid: string
}

export interface ReviewResult {
  businessStatus?: SSOReviewBusinessType
  cid: NullableStr
  expireDate: number
  id: number
  note: string | null
  priority: string
  status: SSOReviewStatus
  suspectUid: NullableStr
  usdValue: number
}

export interface ISubmissionDetailView {
  agent: string
  attachments?: IS3Attachment[] | null
  blacklistAddress?: NullableStr
  id?: number
  isBatchCreate?: boolean
  reportType: string
  status?: SSOReviewBusinessType
  submissionTime: string
  summary: string
  suspectUid?: NullableStr
  uid?: string
  victimCid: string
  victimUid: string
}

export interface IReviewResultView {
  _raw: ReviewResult
  businessStatus?: SSOReviewBusinessType
  cid: NullableStr
  expireDate: string
  id: number
  note: string | null
  priority: string
  status: SSOReviewStatus
  suspectUid: NullableStr
  usdValue: string
}