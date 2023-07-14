<template>
  <div class="side-bar">
    <div class="logo-wrapper">
      <img src="~~/assets/logo-icon.svg">
      <img :src="LogoTitle">
    </div>
    <div v-for="item in menus" :key="item.path" class="menu-item-wrapper">
      <div class="menu-item" :class="{active: item.path === router.currentRoute.value.path}" @click="handleNav(item)">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import useNavStore from '~/stores/navigation'
import type { IMenu } from '~/types'
import LogoTitle from '~/assets/logo-title.svg'

const router = useRouter()
const { menus, addMenuInView } = useNavStore()

function handleNav(item: IMenu) {
  addMenuInView(item)
  router.push(item.path)
}

</script>

<style lang="scss" scoped>
.side-bar {
  width: 200px;
  height: 100%;
  background-color: #fff;

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 64px;
    padding: 0 20px;

    img {
      margin-right: 8px;
    }
  }

  .menu-item-wrapper {
    .menu-item {
      height: 50px;
      padding: 0 8px;
      line-height: 50px;

      &:hover, &.active {
        background-color: #fafafa;
      }

      &.active {
        border-left: 3px #f0b90b solid;
      }
    }
  }
}
</style>