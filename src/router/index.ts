import { createRouter, createWebHistory } from 'vue-router'
import usersRouter from './modules/users'
import defaultRoutes from './modules/default'
import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/user'

const routes = [
  ...defaultRoutes,
  ...usersRouter,
]

//TODO: change the below to hash, so that it will be the same as Admin-UI
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// TODO: Terrence - this is not needed, refacor this later
router.beforeEach(async(to, from) => {

  console.log('to', to)
  // TODO: Terrence - check whitelist
  // TODO: Terrence - set page title

  // determine whether the user has logged in
  const hasToken = getToken()

  if(hasToken) {
    const userStore = useUserStore()

    if(!userStore.ready){
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

  // if (!hasToken && to.name !== 'login') {
  //   return `/login?redirect=${to.fullPath}`
  // }

  // TODO: Terrence - check permission
})

export default router
