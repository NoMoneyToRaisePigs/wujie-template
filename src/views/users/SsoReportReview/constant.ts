// SSO Constants
export const SSO_REVIEW_STATUS_NEW = 'NEW'
export const SSO_REVIEW_STATUS_PENDING = 'PENDING'
export const SSO_REVIEW_STATUS_RELEASE = 'RELEASE'
export const SSO_REVIEW_STATUS_SAR_FILED = 'SAR_FILED'
export const SSO_REVIEW_STATUS_IGNORE = 'IGNORE'
export const SSO_REVIEW_STATUS_OTHER = 'OTHER'

export const SSO_REVIEW_STATUS = [
  { name: 'New', value: SSO_REVIEW_STATUS_NEW },
  { name: 'Pending', value: SSO_REVIEW_STATUS_PENDING },
  { name: 'Release', value: SSO_REVIEW_STATUS_RELEASE },
  { name: 'SAR Filed', value: SSO_REVIEW_STATUS_SAR_FILED },
  { name: 'Ignore', value: SSO_REVIEW_STATUS_IGNORE },
  { name: 'Other', value: SSO_REVIEW_STATUS_OTHER },
]

export const SSO_BUSINESS_STATUE_PENDING_REVIEW = 'PENDING_REVIEW'
export const SSO_BUSINESS_STATUS_PENDING_ARCHIVE = 'PENDING_ARCHIVE'

export const USER_REPORT_TYPE_SAR = 'SAR'
export const USER_REPORT_TYPE_SSO = 'SSO'

export const USER_REPORT_TYPE_SAR_NAME = 'Suspicious Activities Report'
export const USER_REPORT_TYPE_SSO_NAME = 'CS Security Special OPS Report'

export const USER_REPORT_TYPE = [
  { name: USER_REPORT_TYPE_SAR, value: USER_REPORT_TYPE_SAR_NAME },
  { name: USER_REPORT_TYPE_SSO, value: USER_REPORT_TYPE_SSO_NAME },
]

export const SSO_REVIEW_ACTION_START_REVIEW = 'START_REVIEW'
export const SSO_REVIEW_ACTION_ARCHIVE = 'ARCHIVE'

export const SSO_CREATE_TYPE_BATCH = 'BATCH'
export const SSO_CREATE_TYPE_SINGLE = 'SINGLE'