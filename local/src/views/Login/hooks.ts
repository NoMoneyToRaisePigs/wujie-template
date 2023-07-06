import { computed } from 'vue'
import { useBrowserLocation } from '@vueuse/core'
import { useRoute } from 'vue-router'

export function useOktaUrl() {
  const location = useBrowserLocation()
  const { query } = useRoute()

  const oktaUrl = computed(() => {
    const newRedirectWithHash = query.redirect ? encodeURIComponent(`${decodeURIComponent(query.redirect as string)}`) : ''

    // return newRedirectWithHash ? `${location.value.origin}/admin-api/?redirectPage=${newRedirectWithHash}` : `${location.value.origin}/admin-api/?redirectPage=/`
    return newRedirectWithHash ? `/admin-api/?redirectPage=${newRedirectWithHash}` : `${location.value.origin}/admin-api/?redirectPage=/`
  })

  return {
    oktaUrl,
  }
}