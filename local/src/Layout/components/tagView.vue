<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content tags-view-containe">
      <p
        v-for="item in menuInView"
        :key="item.path"
        class="scrollbar-demo-item"
        :class="{active: item.path === router.currentRoute.value.path}"
        @click="handleNav(item)"
      >
        <span>{{ item.name }}</span>
        <span class="close" @click.stop="handleRemove(item, item.path === router.currentRoute.value.path)">✕</span>
      </p>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import useNavStore from '~/stores/navigation'
import type { IMenu } from '~/types'

const router = useRouter()

const { removeMenuInView, menuInView } = useNavStore()

console.log(menuInView)

function handleRemove(item: IMenu, isActive: boolean) {
  removeMenuInView(item, isActive)
}

function handleNav(item: IMenu) {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: none;
  font-weight: 400;
  color: #707A8A;
  background: #FAFAFA;
  padding: 10px 8px;
  font-size: 14px;
  margin-left: 4px;
  margin-top: 8px;
  border-radius: 4px 4px 0 0;

  // flex-shrink: 0;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // width: 100px;
  // height: 50px;
  // margin: 10px;
  // text-align: center;
  // border-radius: 4px;
  // background: var(--el-color-danger-light-9);
  // color: var(--el-color-danger);
  &.active {
    font-weight: 500;
    color: #C99400;
    background-color: #FFFFFF;
  }

  .close {
    display: inline-block;
    height: 14px;
    width: 14px;
    margin-left: 8px;
    color: #929AA5;
    font-size: 12px;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;

    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}

.tags-view-container {
  width: 100%;
  background: #F5F5F5;
  border-bottom: none;
  border-left: 1px solid #EAECEF;
  border-left-width: 1px;
  height: 48px;
}
</style>