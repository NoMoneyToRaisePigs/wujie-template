
const userRoutes = [
  {
    path: '/users/sso-report-review',
    name: 'SsoReportReview',
    component: () => import('@/views/users/SsoReportReview/index.vue'),
    meta: {
      title: 'SsoReportReview',
      icon: 'asset',
      roles: [],
    },
  },
]

export default userRoutes