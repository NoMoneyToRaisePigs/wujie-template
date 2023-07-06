<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-box__icon" />
      <div class="login-box__title">
        {{ $t('login.title') }}
      </div>
      <a class="login-box__link" :href="oktaUrl">{{ $t('login.btn.text') }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOktaUrl } from './hooks'

const { oktaUrl } = useOktaUrl()

</script>


<style lang="scss" scoped>
.login-container {
  background-image: url('~/assets/loginBg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;

    &__icon {
      background-image: url('~/assets/loginIcon.svg');
      width: 100px;
      height: 100px;
      background-size: cover;
      margin-bottom: 10%;
    }

    &__title {
      font-size: 24px;
      color: #eee;
      margin-bottom: 40px;
      text-align: center;
      font-weight: bold;
    }

    &__link {
      width: 340px;
      text-decoration: none;
      color: #1e2329;
      background-color: #fcd535;
      border-color: #fcd535;
      font-size: 16px;
      font-weight: 600;
      padding: 12px;
      cursor: pointer;
      border-radius: 3px;
      text-align: center;
    }
  }
}
</style>