<template>
  <div class="page-404">
    <img src="@/assets/404.svg" alt="404">
    <p>Sorry! The page you're looking for cannot be found.</p>
    <router-link to="/">
      <el-button type="primary">
        Go to homepage<i class="el-icon--right" />
      </el-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  font-weight: bold;

  >img {
    width: 400px;
    height: 300px;
  }
}
</style>
