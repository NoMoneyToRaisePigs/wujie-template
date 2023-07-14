import alova from '@/utils/request'

import type { ISurveyConfig, ISurveyConfigRaw } from '../type'


function normalize(userInfoRaw: ISurveyConfigRaw[]) : ISurveyConfig[] {
  return userInfoRaw.map(raw => ({
    id: raw.id,
    surveyLink: raw.surveyLink,
    surveyDescription: raw.surveyDescription,
    productType: raw.productType,
    insertTime: raw.insertTime,
  }))
}

const GET_LATEST_SURVEY_CONFIGS_URL = '/account/vip-portal/suvery/get-product-type'

export const GetLatestSurveyConfigs = () => alova.Get<ISurveyConfig[], ISurveyConfigRaw[]>(GET_LATEST_SURVEY_CONFIGS_URL, { transformData: normalize })