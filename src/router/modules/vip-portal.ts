const VIPPortalRouter = [
  {
    path: '/vip-portal/survey',
    name: 'surveyConfig',
    component: () => import('@/views/vip-portal/surveyConfig/index.vue'),
    meta: {
      title: 'surveyConfig',
      icon: 'rule',
      roles: [],
    },
  },
]

export default VIPPortalRouter
