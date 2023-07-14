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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url('~/assets/loginBg.svg');
  background-repeat: no-repeat;
  background-size: cover;

  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 150px;

    &__icon {
      width: 100px;
      height: 100px;
      margin-bottom: 10%;
      background-image: url('~/assets/loginIcon.svg');
      background-size: cover;
    }

    &__title {
      margin-bottom: 40px;
      font-size: 24px;
      font-weight: bold;
      color: #eee;
      text-align: center;
    }

    &__link {
      width: 340px;
      padding: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #1e2329;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      background-color: #fcd535;
      border-color: #fcd535;
      border-radius: 3px;
    }
  }
}
</style>