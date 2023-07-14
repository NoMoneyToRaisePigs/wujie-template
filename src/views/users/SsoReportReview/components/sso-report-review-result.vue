<template>
  <div class="sso-submission-detail">
    <h2>
      SSO Review Results
      <el-icon>
        <edit
          v-if="canUpdateReview"
          class="el-icon-edit"
          @click="handleShowDialog"
        />
      </el-icon>
    </h2>
    <el-form label-position="top">
      <el-row :span="15">
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.status')">
            {{ reviewResult.status }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div class="el-form-item el-form-item--small">
            <template v-if="canUpdateExpire">
              <div v-if="showExpiryEdit">
                <label for="" class="el-form-item__label">{{ $t('userReport.expireDate') }}</label>
                <el-icon class="el-icon-edit-expire">
                  <edit
                    v-if="canUpdateReview"
                    @click="handleExpiryEdit"
                  />
                </el-icon>
              </div>
              <div v-else class="expiry-date-picker">
                <utc-picker
                  ref="datePickerRef"
                  v-model="expiry"
                  disable-before
                  :clearable="false"
                  size="mini"
                  type="date"
                />
                <div class="icon check">
                  <el-icon>
                    <Check
                      v-if="canUpdateReview"
                      class="el-icon-check"
                      @click="handleExpiryUpdate"
                    />
                  </el-icon>
                </div>
                <div class="icon close">
                  <el-icon>
                    <Close
                      v-if="canUpdateReview"
                      class="el-icon-close"
                      @click="hideDatePicker"
                    />
                  </el-icon>
                </div>
              </div>
              <div class="el-form-item__content">
                {{ reviewResult.expireDate }}
              </div>
            </template>
            <template v-else>
              <el-form-item prop="expireDate" :label="$t('userReport.expireDate')">
                {{ reviewResult.expireDate }}
              </el-form-item>
            </template>
          </div>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.priority')">
            {{ reviewResult.priority }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="10">
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.suspectUid')">
            {{ reviewResult.suspectUid }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.cid')">
            {{ reviewResult.cid }}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="" :label="$t('userReport.usdValue')">
            {{ reviewResult.usdValue }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item prop="" :label="$t('userReport.note')">
          <div style="white-space: pre-line;">
            {{ reviewResult.note }}
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { Edit, Check, Close } from '@element-plus/icons-vue'

import { useUserStore } from '@/stores/user'
import { useAuth } from '@/composables/useAuth'

import { SSO_BUSINESS_STATUS_PENDING_ARCHIVE } from '../constant'

import type { IReviewResultView } from '../type/ssoBusinessData'
import type { UpdateSsoReviewResultPayload } from '../api'

export interface Props {
  reviewResult: IReviewResultView
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'show-dialog'): void
  (e: 'update-expire', data: UpdateSsoReviewResultPayload): void
}>()

const { email } = useUserStore()
const [udpateExpireAuth, updateResultAuth] = useAuth(['updateExpire', 'updateResult'], 'Approval.reviewDetail.SsoReview')

const showExpiryEdit = ref(true)
const expiry = ref()
const datePickerRef = ref(null)


// const canUpdateReview = true
const canUpdateReview = computed(() => updateResultAuth && props.reviewResult.businessStatus === SSO_BUSINESS_STATUS_PENDING_ARCHIVE)
const canUpdateExpire = computed(() => udpateExpireAuth && props.reviewResult.businessStatus === SSO_BUSINESS_STATUS_PENDING_ARCHIVE)

async function handleExpiryEdit() {
  showExpiryEdit.value = false

  await nextTick()

  // TODO: focus input when this is opened
  // datePickerRef.value?.$el.querySelector('input').focus()
}

function hideDatePicker() {
  showExpiryEdit.value = true
}

function handleShowDialog() {
  emit('show-dialog')
}

function handleExpiryUpdate() {
  const result = props.reviewResult

  const payload : UpdateSsoReviewResultPayload = {
    id: result._raw.id,
    operator: email,
    reviewCaseId: result.cid,
    reviewExpireTime: expiry.value,
    reviewNote: result.note,
    reviewPriority: result.priority,
    reviewRelateUserId: result.suspectUid,
    reviewStatus: result.status,
  }

  emit('update-expire', payload)
  showExpiryEdit.value = true
}

</script>
<style scoped lang="scss">
.sso-submission-detail {
  .el-form-item__label {
    display: inline-block;
  }

  .el-icon-edit-expire {
    vertical-align: middle;
  }

  .el-icon-edit {
    color: #303133;
    cursor: pointer;
  }

  .el-icon-edit:hover {
    color: #606266;
  }
}

.expiry-date-picker {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .icon:hover {
    filter: brightness(85%);
  }

  .el-icon-check {
    font-size: 20px;
    font-weight: 800;
    color: #67C23A;
  }

  .el-icon-close {
    font-size: 20px;
    font-weight: 800;
    color: #F56C6C;
  }
}
</style>
