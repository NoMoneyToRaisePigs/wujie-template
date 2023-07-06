<template>
  <div class="sso-submission-detail">
    <h2>Security Agent Upload</h2>
    <el-form label-position="top">
      <el-row :span="15">
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.agent')">
            {{ submissionDetail.agent }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.submissionTime')">
            {{ submissionDetail.submissionTime }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.reportType')">
            {{ submissionDetail.reportType }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="submissionDetail.isBatchCreate" :span="15">
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.uid')">
            {{ submissionDetail.uid }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.blacklistAddress')">
            {{ submissionDetail.blacklistAddress }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!submissionDetail.isBatchCreate" :span="15">
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.victimUid')">
            {{ submissionDetail.victimUid }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.victimCid')">
            {{ submissionDetail.victimCid }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.suspectUid')">
            {{ submissionDetail.suspectUid }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item prop="" :label="$t('userReport.summary')">
          <div style="white-space: pre-line;">
            {{ submissionDetail.summary }}
          </div>
        </el-form-item>
      </el-row>
      <el-row v-if="!submissionDetail.isBatchCreate">
        <el-form-item prop="" :label="$t('userReport.attachments')">
          <div v-for="(item, index) in submissionDetail.attachments" :key="index" class="sso-submission-attachments">
            <span style="margin-right: 10px;">{{ item.s3FileName }}</span>
            <el-button type="text" style="padding: 0;" @click="handleDownload(item)">
              {{ $t('commons.download') }}
            </el-button>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent, ref } from '@vue/composition-api'
// import { useRouter, useAuth } from '@/hooks'

import { useRequest } from 'alova'

import { downloadFile } from '@/utils/download'

import { getSsoAttachmentUrl } from '../api/getSsoAttachmentUrl'

import type { IS3Attachment } from '../type/attachment'
// import type { SubmissionDetail } from '../type/ssoBusinessData'

// import { Message } from 'element-ui'

// import {
//   getSsoAttachmentUrl,
//   downloadSsoAttachment,
// } from '../api'
export interface SubmissionDetail {
  id?: number
  agent: string
  reportType: string
  submissionTime: string
  victimUid: string
  victimCid: string
  suspectUid?: string | null
  summary: string
  status?: string
  attachments?: IS3Attachment[] | null
  uid?: string
  blacklistAddress?: string | null
  isBatchCreate?: boolean
}

export interface Props {
  submissionDetail: SubmissionDetail
}

const props = defineProps<Props>()


const handleDownload = async(item: IS3Attachment) => {
  const { send } = useRequest(getSsoAttachmentUrl(item), { immediate: false })
  const res = await send()

  if (res?.s3Url) {
    downloadFile(res.s3Url, item.s3FileName)
    // await downloadSsoAttachment(item.s3FileName, res.data.s3Url)
  }
}


</script>

