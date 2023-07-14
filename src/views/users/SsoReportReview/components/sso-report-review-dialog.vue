<template>
  <el-dialog v-model="showDialog" width="70%" :title="$t('')" @close="onClose">
    <div v-loading="loading">
      <el-form :model="innerReviewResult" label-position="top">
        <el-row>
          <el-col :span="6">
            <el-form-item prop="status" :label="$t('userReport.status')">
              <el-select v-model="innerReviewResult.status" clearable>
                <el-option
                  v-for="item in SSO_REVIEW_STATUS"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="expireDate" :label="$t('userReport.expireDate')">
              {{ reviewResult.expireDate }}
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="priority" :label="$t('userReport.priority')">
              {{ reviewResult.priority }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="suspectUid" :label="$t('userReport.suspectUid')">
              <el-input v-model="innerReviewResult.suspectUid" type="number" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="cid" :label="$t('userReport.cid')">
              <el-input v-model="innerReviewResult.cid" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item class="sso-report-review-dialog-input-number" prop="usdValue" :label="$t('userReport.usdValue')">
              <el-input-number
                v-model="innerReviewResult.usdValue"
                :controls="false"
                :min="0"
                :max="99999999"
                :step="1"
                step-strictly
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item prop="note" :label="$t('userReport.note')">
            <el-input
              v-model="innerReviewResult.note"
              maxlength="3000"
              class="textarea-summary"
              style="width: 484px;"
              type="textarea"
              clearable
              show-word-limit
            />
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="upateReview">{{ $t('保存') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup lang="ts">
import { useUserStore } from '@/stores/user'

import { SSO_REVIEW_STATUS } from '../constant.js'

import type { ReviewResult, IReviewResultView } from '../type/ssoBusinessData'
import type { UpdateSsoReviewResultPayload } from '../api'

export interface Props {
  open: boolean
  reviewResult: IReviewResultView
}

const props = defineProps<Props>()

// TODO: ESLint doesn't recognize defineEmits the new format
// const emit = defineEmits<{
//   close: []
//   update: [payload: UpdateSsoReviewResultPayload]
// }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', data: UpdateSsoReviewResultPayload): void
}>()

const { email } = useUserStore()
const loading = ref(false)
const showDialog = ref(false)

const innerReviewResult = ref<ReviewResult>(JSON.parse(JSON.stringify(props.reviewResult._raw)))

function onClose() {
  emit('close')
}

function upateReview() {
  loading.value = true

  const result = innerReviewResult.value
  const payload : UpdateSsoReviewResultPayload = {
    id: props.reviewResult.id,
    operator: email,
    reviewCaseId: result.cid,
    reviewExpireTime: props.reviewResult._raw.expireDate,
    reviewNote: result.note,
    reviewPriority: result.priority,
    reviewRelateUserId: result.suspectUid,
    reviewStatus: result.status,
  }

  emit('update', payload)
  loading.value = false
}

watch(() => props.open, (val) => {
  showDialog.value = val
}, { immediate: true })
</script>


<style scoped lang="scss">
.sso-report-review-dialog-input-number {
  :deep {
    .el-input-number {
      .el-input {
        input {
          padding-left: 15px;
          text-align: start;
        }
      }
    }
  }
}

:deep {
  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
}
</style>
