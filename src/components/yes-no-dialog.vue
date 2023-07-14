<template>
  <el-dialog
    v-model="show"
    center
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="dialog-content">
      <el-icon>
        <warning />
      </el-icon>
      <div class="title">
        {{ title }}
      </div>
      <div class="content">
        {{ content }}
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="showCancelButton" type="danger" @click="onCancel">
          {{ cancelText }}
        </el-button>
        <el-button v-if="showConfirmButton" type="primary" @click="onConfirm">
          {{ confirmText }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'

export interface Props {
  cancelText?: string
  confirmText?: string
  content?: string
  showCancelButton?: boolean
  showConfirmButton?: boolean
  title?: string
  width?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  content: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showCancelButton: true,
  showConfirmButton: true,
  width: '360px',
})

const show = ref(true)

let dialogResolve : (value: boolean) => void

defineExpose({
  open,
})

function open() {
  return new Promise((resolve) => {
    dialogResolve = resolve
    show.value = true
  })
}

function onConfirm() {
  dialogResolve(true)
  show.value = false
}

function onCancel() {
  dialogResolve(false)
  show.value = false
}
</script>

<style lang="scss" scoped>
.dialog-content {
  text-align: center;

  .title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    color: #1E2329;
    word-break: break-word;
  }

  .content {
    color: #76808F;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .el-icon {
    font-size: 64px;
  }
}
</style>
