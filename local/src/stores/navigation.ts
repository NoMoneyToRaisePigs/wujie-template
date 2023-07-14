import { defineStore } from 'pinia'

import { menus as staticMenus, menuMap as staticMenuMap } from '~/router/index'
import type { IMenu } from '~/types'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

const navigationStore = defineStore('navigation', () => {

  const router = useRouter()

  const lastAddedMenu = ref<IMenu>(staticMenuMap['/'])
  const menus = ref(staticMenus)
  const menuMap = ref<Record<string, IMenu>>(staticMenuMap)
  const activeMenu = ref<IMenu | null >(null)
  const menuInView = ref<Set<IMenu>>(new Set())

  function addMenuInView(menu: IMenu) {
    menuInView.value.add(menu)
    lastAddedMenu.value = menu
  }

  function removeMenuInView(menu: IMenu, isActive = false) {
    menuInView.value.delete(menu)

    if(isActive) {
      if(lastAddedMenu.value === menu) {
        router.push('/')
      } else {
        router.push(lastAddedMenu.value?.path ?? '/')
      }
    }
  }

  // const activeMenu = computed(() => menuMap.value[currentRoute.value.path])

  watch(router.currentRoute, (currentRoute: RouteLocationNormalizedLoaded) => {
    if(!currentRoute) return
    const currentMenu = menuMap.value[currentRoute.path]

    currentMenu.fullPath = currentRoute.fullPath

    activeMenu.value = currentMenu
    menuInView.value.add(currentMenu)
    // lastVisitedMenu = currentMenu
  }, { immediate: true })

  return {
    menus,
    activeMenu,
    menuInView,
    lastAddedMenu,
    addMenuInView,
    removeMenuInView,
  }
})

export default navigationStore