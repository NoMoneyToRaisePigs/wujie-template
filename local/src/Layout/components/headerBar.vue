<template>
  <div class="header-bar">
    <div class="greeting">
      {{ greeting }}
    </div>
    <div class="tool-box">
      <el-dropdown trigger="click">
        <el-icon>
          <UserFilled />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div style="display: flex; align-items: center;" @click="handleLogout">
                <el-icon>
                  <svg aria-hidden="true" class="svg-icon">
                    <use xlink:href="#icon-log-out-f" />
                  </svg>
                </el-icon>
                <span style="font-weight: 500;font-size: 12px;">Log Out</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="click">
        <el-icon>
          <svg aria-hidden="true" class="svg-icon">
            <use xlink:href="#icon-language-f" />
          </svg>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="handleLanguageChange('zh')">
                <span style="font-weight: 500;font-size: 12px;">中文</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLanguageChange('en')">
                <span style="font-weight: 500;font-size: 12px;">English</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import alova from '@/utils/request'
import { removeToken } from '@/utils/token'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const { locale, t } = useI18n()
const { email } = useUserStore()

const greeting = computed(() => {
  return `${t('landing.hello')}, ${email}`
})

const handleLogout = async () => {
  console.log('logout')

  await alova.Get('/saml/logout?local=true&redirect=false').send()
  removeToken()
  router.push({ name: 'login' })
}

const handleLanguageChange = (lang: string) => {
  console.log(lang)
  locale.value = lang
}
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  width: 100%;
  height: 64px;
  background-color: #fff;

  .greeting {
    font-size: 14px;
    font-weight: 600;
    color: #474D57;
  }

  .tool-box {
    .el-icon {
      font-size: 22px;
    }

    .el-dropdown {
      margin-right: 12px;
      padding: 8px;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>