<template>
  <h1>landing</h1>
  <div>
    <el-button @click="openDialog">Open</el-button>
    <pre>
      {{ open }}
    </pre>
  </div>

  <utc-picker v-model="valueDate" />
  <pre>
    {{ formatTimestamp(valueDate) }}
  </pre>
  <pre>
    {{ userStore.email }}
    {{ userStore.tagMap }}
  </pre>
  <custom-dialog v-model="open">
  </custom-dialog>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { useUserStore } from '@/stores/user'
import { formatTimestamp } from '@/utils/formatter'

const userStore = useUserStore()
const { data: userInfo } = useUser()
const open = ref(false)
const valueDate = ref(new Date(2022, 11, 3, 5, 0, 0, 0).getTime())

async function openDialog() {
  const res = await fetch('https://admin-ui-wujie.fe.qa1fdg.net/admin-api/user/info', { credentials: 'include' })

  console.log(res)

  open.value = true
}

</script>