import alova from '@/utils/request'

import type { IS3Attachment, IS3AttachmentRaw } from '../type/attachment'


interface Payload {
  s3FileName: string
  s3Path: string
}

export function normalize(userInfoRaw: IS3AttachmentRaw) : IS3Attachment {
  return {
    s3FileName: userInfoRaw.s3FileName,
    s3Path: userInfoRaw.s3Path,
    s3Url: userInfoRaw.s3Url,
  }
}

export const GET_ATTACHMENT_URL = '/inspector/sso/report/get-attachment-url'

export const getSsoAttachmentUrl = (payload: Payload) => alova.Post<IS3Attachment, IS3AttachmentRaw>(GET_ATTACHMENT_URL, payload, { transformData: normalize })