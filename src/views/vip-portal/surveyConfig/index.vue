<template>
  <div v-loading="loading" class="survey-config-container">
    <el-form label-position="left">
      <el-form-item :label="$t('surveyConfig.productType')" prop="productType">
        <el-select v-model="selectedProductType">
          <el-option v-for="item in productTypeList" :key="item.key" :label="item.desc" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-form-item :label="$t('surveyConfig.currentSurvey')" prop="surveyLink">
          <el-input v-model="selectedConfig.surveyLink" disabled class="survey-form-input" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('surveyConfig.currentSurveyIntro')" prop="currentSurveyIntro">
          <el-input v-model="selectedConfig.surveyDescription" type="textarea" disabled class="survey-form-input" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('surveyConfig.newSurvey')" prop="newSurveyLink">
          <el-input v-model="config.surveyLink" clearable class="survey-form-input" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('surveyConfig.surveyIntro')" prop="surveyDescription">
          <el-input v-model="config.surveyDescription" type="textarea" clearable class="survey-form-input" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-button type="primary" @click="replaceSurvey">{{ $t('surveyConfig.replace') }}</el-button>
        <el-button @click="resetForm">{{ $t('surveyConfig.reset') }}</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { GetLatestSurveyConfigs, addSurveyConfig, getSurveyProductTypes } from './api'

import type { ISurveyProductType, ISurveyConfig } from './type'

const defaultConfig = {
  productType: '',
  surveyLink: '',
  surveyDescription: '',
}

const loading = ref(false)

const productTypeList = ref<ISurveyProductType[]>([])
const productConfigMap = ref<Record<string, ISurveyConfig>>({})

const selectedProductType = ref()
const config = ref<ISurveyConfig>(defaultConfig)

const selectedConfig = computed<ISurveyConfig>(() => {
  return productConfigMap.value[selectedProductType.value] ?? defaultConfig
})

onMounted(async() => {
  const typeRes = await getSurveyProductTypes().send()
  const surveyConfigs = await GetLatestSurveyConfigs().send()

  productTypeList.value = typeRes
  productConfigMap.value = surveyConfigs.reduce((acc, cur) => ({ ...acc, [cur.productType]: cur }), {})
})

function resetForm() {

}

function replaceSurvey() {

}

</script>

<style lang="scss" scoped>
.survey-form-input {
  width: 420px;
}
</style>