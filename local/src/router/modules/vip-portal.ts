import Layout from '~/Layout/index.vue'
import vipPortalChildRoutes from '@/router/modules/vip-portal'

export default {
  path: '/vip-portal',
  component: Layout,
  meta: {
    title: 'vipPortal',
    icon: 'vipPortal',
    roles: [],
    hidden: true,
  },
  children: vipPortalChildRoutes.map(x => ({
    ...x,
    path: x.path.replace('/vip-portal/', ''),
  })),
}