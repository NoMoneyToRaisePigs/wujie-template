<template>
  <div class="layout-container">
    <side-bar />
    <div class="main-container">
      <header-bar />
      <div class="scrollable-content">
        <tagsView />
        <div class="breadcrumb">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item>root</el-breadcrumb-item>
            <el-breadcrumb-item>{{ activeMenu?.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <section class="app-main">
          <RouterView />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sideBar from './components/sideBar.vue'
import headerBar from './components/headerBar.vue'
import tagsView from './components/tagView.vue'
import { ArrowRight } from '@element-plus/icons-vue'

import useNavStore from '~/stores/navigation'

const { activeMenu } = useNavStore()

</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  .main-container {
    flex: 1;
    height: 100%;
    width: calc(100% - 200px);
    background-color: #f5f5f5;
  }

  .scrollable-content {
    flex: 1 1 auto;
    overflow-y: auto;
  }

  .tags-view-container {
    width: 100%;
    background: #F5F5F5;
    border-bottom: none;
    border-left: 1px solid #EAECEF;
    border-left-width: 1px;
    height: 48px;
  }

  .breadcrumb {
    // height: 46px;
    background-color: white;
    border-left: 1px solid #EAECEF;
    border-left-width: var(--sidebar-border-width);

    :deep {
      .el-breadcrumb {
        padding: 16px;
        display: inline-block;
        font-size: 14px;
      }
    }
  }

  .app-main {
    min-height: calc(100vh - 124px);
    padding: 18px 18px 100px;
    width: 100%;
    position: relative;
    background: white;
    border-left: 1px solid #EAECEF;
    border-left-width: var(--sidebar-border-width);
    overflow: hidden scroll;
  }
}
</style>