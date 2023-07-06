import Default from '@/views/default/index.vue'
import Page404 from '@/views/error-page/404.vue'

const defaultRoutes = [
  {
    path: '/',
    name: 'default',
    component: Default,
    meta: {
      title: 'default',
      icon: '',
      roles: [],
    },
  },
  {
    path: '/404',
    name: '404',
    component: Page404,
    meta: {
      title: '404',
    },
  },
]

export default defaultRoutes