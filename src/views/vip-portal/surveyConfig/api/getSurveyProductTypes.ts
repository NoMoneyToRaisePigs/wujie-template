import alova from '@/utils/request'

import type { ISurveyProductType, ISurveyProductTypeRaw } from '../type'


function normalize(userInfoRaw: ISurveyProductTypeRaw[]) : ISurveyProductType[] {
  return userInfoRaw.map(x => ({
    key: x.key,
    desc: x.desc,
  }))
}

const GET_SURVEY_PRODUCT_TYPES_URL = '/account/vip-portal/suvery/get-product-type'

export const getSurveyProductTypes = () => alova.Get<ISurveyProductType[], ISurveyProductTypeRaw[]>(GET_SURVEY_PRODUCT_TYPES_URL, { transformData: normalize })