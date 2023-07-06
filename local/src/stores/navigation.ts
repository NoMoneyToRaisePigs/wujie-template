import { defineStore } from 'pinia'
import { menus as staticMenus, menuMap as staticMenuMap } from '~/router/index'
import type { IMenu } from '~/types'


// function getMenus(){
//   // const { path } = useRoute()
//   const { options } = useRouter()
//   const menus: IMenu[] = []

//   options.routes.forEach((r) => {

//     // const menu : IMenu = {
//     //   name: r.name ?? r.meta?.title ?? r.path,
//     //   path: r.path,
//     //   hidden: false,
//     // }

//     // menus.push(menu)

//     if(r.children) {
//       r.children.forEach((c) => {
//         if(c.meta?.hidden) return

//         const childMenu: IMenu = {
//           name: c.name ?? c.meta?.title ?? c.path,
//           path: c.path ? `${r.path}/${c.path}` : r.path,
//           hidden: false,
//         }
//         menus.push(childMenu)
//       })
//     }
//   })

//   return {
//     menus,
//     menuMap: menus.reduce((acc, cur)=> ({ ...acc, [cur.path]: cur }), {}),
//   }
// }

//  const { menus: staticMenus, menuMap: staticMenuMap } = getMenus()

const navigationStore = defineStore('navigation', () => {

  const router = useRouter()

  const lastAddedMenu = ref<IMenu>(staticMenuMap['/'])
  const menus = ref(staticMenus)
  const menuMap = ref<Record<string, IMenu>>(staticMenuMap)
  const activeMenu = ref<IMenu | null >(null)
  const menuInView = ref<Set<IMenu>>(new Set())

  function addMenuInView(menu: IMenu){
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

  watch(() => router.currentRoute.value.path, (path: string) => {
    const currentMenu = menuMap.value[path]

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