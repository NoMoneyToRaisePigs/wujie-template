<template>
  <div>
    <span>id</span>:<pre>{{ id }}</pre>
    <pre>{{ associated }}</pre>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  msg: string
  id: number
  associated: Asso[]
}

export interface Asso {
  uid: number
  label: string
}

defineProps<Props>()
</script>