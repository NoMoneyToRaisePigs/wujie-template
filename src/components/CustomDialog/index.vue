<template>
  <el-dialog
    :model-value="modelValue"
    width="30%"
    @closed="handleClosed"
  >
    <span>test message</span>
  </el-dialog>
</template>

<script setup lang="ts">

export interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()


function handleClosed() {
  emit('update:modelValue', false)
}

</script>