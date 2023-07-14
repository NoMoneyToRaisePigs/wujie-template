import alova from '@/utils/request'


export type Payload = {
  id?:number
  productType: string
  surveyDescription: string
  surveyLink: string
}

const ADD_SURVEY_CONFIG_URL = '/inspector/sso/report/action'

export const addSurveyConfig = (payload: Payload) => alova.Post(ADD_SURVEY_CONFIG_URL, payload)