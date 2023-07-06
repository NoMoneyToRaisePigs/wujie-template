import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/Layout/index.vue'
import Landing from '~/views/Landing/index.vue'
import Page404 from '@/views/error-page/404.vue'
import usersRoutes from './modules/users'
import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/user'
import type { IMenu } from '~/types/menu'

const routes : RouteRecordRaw[]= [
  {
    path: '/',
    component: Layout,
    meta: {
      title: 'layout',
      hidden: true,
    },
    children: [
      {
        path: '',
        component: () => import('~/views/Landing/index.vue'),
        meta: {
          title: 'landing',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/views/Login/index.vue'),
    meta: {
      title: 'login',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
    },
  },
  usersRoutes,
]

//TODO: change the below to hash, so that it will be the same as Admin-UI
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

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

function getMenus() : {menus: IMenu[], menuMap: Record<string, IMenu>} {
  const menus: IMenu[] = []

  routes.forEach((r) => {

    if(r.children) {
      r.children.forEach((c) => {
        if(c.meta?.hidden) return

        const childMenu: IMenu = {
          name: c.name ?? c.meta?.title ?? c.path,
          path: c.path ? `${r.path}/${c.path}` : r.path,
          hidden: false,
        }
        menus.push(childMenu)
      })
    }
  })

  return {
    menus,
    menuMap: menus.reduce((acc, cur)=> ({ ...acc, [cur.path]: cur }), {}),
  }
}

export const { menus, menuMap } = getMenus()
export default router
