<template>
  <div class="login">
    <n-grid :cols="2">
      <n-gi class="left">
        <img src="src/assets/images/login-bg.svg" alt="naive" />
      </n-gi>
      <n-gi class="right">
        <n-card class="content">
          <div class="title">
            <img src="src/assets/images/vite-logo.svg" alt="vite-logo" />
            <h1>故河十九年春</h1>
          </div>
          <n-gradient-text :size="14" type="info">
            微风需要竹林，溪流需要蜻蜓
          </n-gradient-text>
          <n-tabs
            :default-value="tabsValue"
            size="large"
            :on-update:value="changeTabs"
          >
            <n-tab-pane name="account" tab="账号">
              <login-account ref="accountRef" />
            </n-tab-pane>
            <n-tab-pane name="phone" tab="手机">
              <login-phone ref="phoneRef" />
            </n-tab-pane>
          </n-tabs>
          <div class="utils">
            <n-checkbox v-model:checked="isChecked">记住密码</n-checkbox>
            <n-gradient-text type="info" style="cursor: pointer">
              忘记密码
            </n-gradient-text>
          </div>
          <n-button type="info" :disabled="isLoading" block @click="submitClick">
            <n-spin v-if="isLoading" stroke="white" size="small" />
            <span>{{ isLoading ? '正在登录' : '登陆' }}</span>
          </n-button>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from '@/views/login/children/LoginAccount.vue'
import LoginPhone from '@/views/login/children/LoginPhone.vue'

export default defineComponent({
  name: 'Login',
  components: { LoginPhone, LoginAccount },
  setup() {
    const isChecked = ref(true)
    const tabsValue = ref('account')
    const isLoading = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const submitClick = async () => {
      if (tabsValue.value === 'account') {
        isLoading.value = true
        accountRef.value?.accountSubmit(isChecked.value)
      } else if (tabsValue.value === 'phone') {
        phoneRef.value?.formRef?.validate((valid) => {
          if (valid && valid?.length > 0) return
          isLoading.value = true
          phoneRef.value?.submit()
        })
      }
      setTimeout(() => (isLoading.value = false), 3000)
    }
    // tab切换
    const changeTabs = (value: string) => {
      tabsValue.value = value
    }

    return {
      isChecked,
      accountRef,
      phoneRef,
      tabsValue,
      isLoading,
      submitClick,
      changeTabs
    }
  }
})
</script>

<style scoped lang="less">
.right {
  background-image: url('/src/assets/images/login-right-bg.svg');
  background-size: 80% 30%;
}
.content {
  width: 400px;
  text-align: center;
  margin: 120px auto;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 40px;
    margin-right: 10px;
  }
}
.utils {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.left {
  background-color: rgb(45, 140, 240);
  height: 721px;
  img {
    width: 100%;
    height: 100%;
  }
}
:deep(.n-tabs-nav-scroll-wrapper) {
  padding-left: 121px;
}
:deep(.n-input__input-el) {
  padding: 22px 0;
}
:deep(.n-button) {
  padding: 22px 0;
}
:deep(.n-spin) {
  width: 16px;
  margin-right: 8px;
}
</style>
