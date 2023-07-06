<template>
  <div v-loading="loading" class="sso-report-review">
    <div class="sso-report-review-header">
      <h2>SSO Report</h2>
      <el-button v-if="canArchive" type="primary" @click="handleBeforeArchive">
        {{ $t('userReport.archive') }}
      </el-button>
      <el-button v-if="canStartReview" type="primary" @click="handleStartReview">
        {{ $t('userReport.startReview') }}
      </el-button>
    </div>
    <h3>
      {{ $t('uuu') }}
    </h3>
    <el-button type="primary" @click="openMessage">
      Message
    </el-button>
    <el-divider />
    <sso-report-submission-detail
      v-if="!ssoBusinessDataLoading"
      :submission-detail="submissionDetail"
    />
    <el-divider />
    <sso-report-review-result
      v-if="!ssoBusinessDataLoading"
      :review-result="reviewResult"
      @show-dialog="toggleReviewDialog(true)"
      @update-expire="handleUpdateReview"
    />
    <SsoReportReviewDialog
      v-if="showReivewDialog"
      :open="showReivewDialog"
      :review-result="reviewResult"
      @close="toggleReviewDialog(false)"
      @update="handleUpdateReview"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores/user'
import { useYesNoDialog } from '@/components/YesNoDialog'

import ssoReportSubmissionDetail from './components/sso-report-submission-detail.vue'
import ssoReportReviewResult from './components/sso-report-review-result.vue'
import SsoReportReviewDialog from './components/sso-report-review-dialog.vue'
import { useSsoReportReviewData } from './hook/useSsoReportReviewData'
import { updateSsoReviewResult, updateSsoProcessLevel }  from './api'
import { SSO_REVIEW_ACTION_START_REVIEW,SSO_REVIEW_ACTION_ARCHIVE } from './constant'

import type { ReviewResult } from './type/ssoBusinessData'
import type { UpdateSsoReviewResultPayload } from './api'


const { email } = useUserStore()
const { t } = useI18n()
const { canArchive, canStartReview, enableArchiveAction, ssoBusinessDataLoading, reviewResult, submissionDetail, loadBusinessData  } = useSsoReportReviewData()


const loading = ref(false)
const showReivewDialog = ref(false)
const showConfirmDialog = ref(false)
// const showLog = ref(true)

async function openMessage() {
  const res =  await useYesNoDialog(null)

  console.log(res)
}

// events
function toggleReviewDialog(toggle: boolean) {
  showReivewDialog.value = toggle
}

async function handleStartReview() {
  await handleUpdateStatus(SSO_REVIEW_ACTION_START_REVIEW)
  // await reRenderLog()
}

function handleBeforeArchive() {
  if (enableArchiveAction) {
    ElMessage.error(t('userReport.archiveTip'))

    return
  }

  showConfirmDialog.value = true
}

async function handleArchive() {
  showConfirmDialog.value = false
  await handleUpdateStatus(SSO_REVIEW_ACTION_ARCHIVE)
  // await reRenderLog()
}

// async function reRenderLog() {
//   showLog.value = false
//   await nextTick()
//   showLog.value = true
// }

async function handleUpdateStatus(action: typeof SSO_REVIEW_ACTION_START_REVIEW | typeof SSO_REVIEW_ACTION_ARCHIVE) {
  loading.value = true

  await updateSsoProcessLevel({
    id: submissionDetail.value.id,
    action,
    operator: email,
  }).send()

  await loadBusinessData()

  loading.value = false
}

async function handleUpdateReview(review: UpdateSsoReviewResultPayload) {
  loading.value = true

  await updateSsoReviewResult(review).send()

  await loadBusinessData()

  showReivewDialog.value = false
  loading.value = false
}

</script>

<style scoped lang="scss">
.sso-report-review {
  width: 100%;

  .sso-report-review-header {
    display: flex;
    justify-content: space-between;
  }

  .warning-text {
    text-align: center;

    svg {
      font-size: 96px;
    }

    .main {
      font-size: 20px;
      line-height: 28px;
    }
  }
}

</style>

