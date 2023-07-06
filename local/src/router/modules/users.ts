import Layout from '~/Layout/index.vue'
import userChildRoutes from '@/router/modules/users'

export default {
  path: '/users',
  component: Layout,
  meta: {
    title: 'users',
    icon: 'user',
    roles: ['users'],
    hidden: true,
  },
  children: userChildRoutes.map(x => ({
    ...x,
    path: x.path.replace('/users/', ''),
  })),
}