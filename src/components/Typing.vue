<template>
  <div>
    <span>id</span>:<pre>{{ id }}</pre>
    <pre>{{ associated }}</pre>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  associated: Asso[]
  id: number
  msg: string
}

export interface Asso {
  label: string
  uid: number
}

defineProps<Props>()
</script>