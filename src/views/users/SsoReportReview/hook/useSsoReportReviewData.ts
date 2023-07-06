
import { useRequest } from 'alova'

import {  getTaskOperation } from '@/api/taskpool/taskOperation'
import { formatTimestamp, formatPossibleEmptyString } from '@/utils/formatter'

import { getSsoDataByBusinessKey } from '../api/getSsoDataByBusinessKey'
import {
  SSO_REVIEW_ACTION_START_REVIEW,
  SSO_REVIEW_STATUS_NEW,
  SSO_REVIEW_STATUS_PENDING,
  SSO_BUSINESS_STATUS_PENDING_ARCHIVE,
  SSO_BUSINESS_STATUE_PENDING_REVIEW,
  SSO_REVIEW_ACTION_ARCHIVE,
} from '../constant'

import type { IReviewResultView, ISubmissionDetailView } from '../type/ssoBusinessData'



export function useSsoReportReviewData() {
  const { query } = useRoute()

  const { data: ssoBusinessData, loading: ssoBusinessDataLoading, send: loadBusinessData } = useRequest(getSsoDataByBusinessKey({ id: String(query.businessKey) }))
  const { data: taskOperationData, loading: taskOperationDataLoading, error: taskOperationError } = useRequest(getTaskOperation(String(query.processInstanceId)))

  const hasTask = computed<boolean>(() => {
    return !taskOperationDataLoading.value && !taskOperationError.value && !!taskOperationData.value
  })

  const canArchive = computed<boolean>(() => {
    return hasTask.value && ssoBusinessData.value?.submissionDetail.status === SSO_BUSINESS_STATUS_PENDING_ARCHIVE
  })
  const canStartReview = computed<boolean>(() => {
    return hasTask.value && ssoBusinessData.value?.submissionDetail.status === SSO_BUSINESS_STATUE_PENDING_REVIEW
  })

  const enableArchiveAction = computed<boolean>(() => {
    return reviewResult.value.status !== SSO_REVIEW_STATUS_NEW && reviewResult.value.status !== SSO_REVIEW_STATUS_PENDING
  })

  const reviewResult = computed<IReviewResultView>(() => {
    const reviewResultApi = ssoBusinessData.value.reviewResult

    return {
      id: reviewResultApi.id,
      cid: formatPossibleEmptyString(reviewResultApi.cid),
      expireDate: formatTimestamp(reviewResultApi.expireDate),
      note: formatPossibleEmptyString(reviewResultApi.note),
      priority: reviewResultApi.priority,
      status: reviewResultApi.status,
      businessStatus: reviewResultApi.businessStatus,
      usdValue: formatPossibleEmptyString(reviewResultApi.usdValue),
      suspectUid: formatPossibleEmptyString(reviewResultApi.suspectUid),
      _raw: reviewResultApi,
    }
  })

  const submissionDetail = computed<ISubmissionDetailView>(() => {
    const SubmissionDetailApi = ssoBusinessData.value.submissionDetail

    return {
      id: SubmissionDetailApi.id,
      agent: SubmissionDetailApi.agent,
      reportType: SubmissionDetailApi.reportType,
      submissionTime: formatTimestamp(SubmissionDetailApi.submissionTime),
      summary: SubmissionDetailApi.summary,
      victimCid: SubmissionDetailApi.victimCid,
      victimUid: formatPossibleEmptyString(SubmissionDetailApi.victimUid),
      suspectUid: formatPossibleEmptyString(SubmissionDetailApi.suspectUid),
      status: SubmissionDetailApi.status,
      attachments: SubmissionDetailApi.attachments,
      uid: formatPossibleEmptyString(SubmissionDetailApi.uid),
      blacklistAddress: formatPossibleEmptyString(SubmissionDetailApi.blacklistAddress),
      isBatchCreate: SubmissionDetailApi.isBatchCreate,
    }
  })

  return {
    ssoBusinessDataLoading,
    canArchive,
    canStartReview,
    enableArchiveAction,
    reviewResult,
    submissionDetail,
    loadBusinessData,
  }
}
