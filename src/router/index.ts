import { createRouter, createWebHistory } from 'vue-router'

import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/user'

import defaultRoutes from './modules/default'
import usersRouter from './modules/users'
import vipPortal from './modules/vip-portal'

const routes = [
  ...defaultRoutes,
  ...usersRouter,
  ...vipPortal,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// TODO: Terrence - this is not needed, refacor this later
router.beforeEach(async(to, _) => {
  // TODO: Terrence - check whitelist

  // TODO: Terrence - set page title

  // determine whether the user has logged in
  const hasToken = getToken()

  if(hasToken) {
    const userStore = useUserStore()

    if(!userStore.ready) {
      await userStore.getInfo()
    }

    if(to.name === 'login') {
      return to.query?.redirect ?? '/'
    } else {
      return true
    }
  } else {
    if(to.name === 'login') {
      return true
    }
    else {
      return `/login?redirect=${to.fullPath}`
    }
  }

  // TODO: Terrence - check permission
})


// TODO: grouping routes logic is not done yet

export default router
