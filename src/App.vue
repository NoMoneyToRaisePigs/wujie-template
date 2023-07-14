<template>
  <RouterView :key="fullPath" />
</template>

<script setup lang="ts">
import { RouterView ,useRoute } from 'vue-router'

const route = useRoute()
const fullPath = ref(route.fullPath)

watch(() => route.fullPath, (val) => {
  fullPath.value = val
})

</script>

