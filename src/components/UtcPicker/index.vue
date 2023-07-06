<template>
  <el-date-picker
    v-model="innerValue"
    :disabled="disabled"
    :disabled-date="disableDate"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import moment from 'moment'

const props = withDefaults(defineProps<Props>(), {
  disableBefore: false,
  disabled: false,
})

const emit = defineEmits<{
  (event:UPDATE_MODEL_VALUE_TYPE, value: number | [number, number]): void
}>()

const now = new Date()

// TODO: move this to global
type UPDATE_MODEL_VALUE_TYPE = 'update:modelValue' | 'update:model-value'
// TODO: move this to global
const UPDATE_MODEL_VALUE = 'update:modelValue'

export interface Props {
  modelValue: number | string | Date | [number | string | Date, number | string | Date]
  disableBefore: boolean
  disabled: boolean
}

const innerValue = ref(props.modelValue)

const toUTCFormat = (value: number | string | Date) => moment.utc(value).format('YYYY-MM-DD HH:mm:ss')
const toUTC = (value: number | string | Date) => moment.utc(value)?.valueOf()

function handleChange(value : number) {
  if (Array.isArray(value)) {
    emit(UPDATE_MODEL_VALUE, [toUTC(value[0]), toUTC(value[1])])
  } else {
    emit(UPDATE_MODEL_VALUE, toUTC(value))
  }
}

function disableDate(date: Date) {
  if(props.disableBefore) {
    const utcTodayTimestamp = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
    )

    const utcOffset = now.getTimezoneOffset() * 60 * 1000

    return date.getTime() - utcOffset < utcTodayTimestamp
  } else{
    return false
  }
}

watch(() => props.modelValue, (val) => {
  if (Array.isArray(val)) {
    innerValue.value = [toUTCFormat(val[0]), toUTCFormat(val[1])]
  } else {
    innerValue.value = toUTCFormat(val)
  }
}, { immediate: true })
</script>