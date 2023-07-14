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
  position: relative;
  display: inline-block;
  padding: 10px 8px;
  margin-top: 8px;
  margin-left: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #707A8A;
  cursor: pointer;
  background: #FAFAFA;
  border: none;
  border-radius: 4px 4px 0 0;

  &.active {
    font-weight: 500;
    color: #C99400;
    background-color: #FFFFFF;
  }

  .close {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-left: 8px;
    font-size: 12px;
    line-height: 14px;
    color: #929AA5;
    text-align: center;
    border-radius: 50%;

    &:hover {
      color: #fff;
      background-color: #b4bccc;
    }
  }
}

.tags-view-container {
  width: 100%;
  height: 48px;
  background: #F5F5F5;
  border-bottom: none;
  border-left: 1px solid #EAECEF;
  border-left-width: 1px;
}
</style>