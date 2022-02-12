<template>
  <n-form>
    <n-form-item-row label="账号">
      <n-input v-model:value="form.username" clearable placeholder="请输入账号">
        <template #prefix>
          <n-icon color="black" :size="20">
            <person />
          </n-icon>
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row label="密码">
      <n-input
        v-model:value="form.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="click"
      >
        <template #prefix>
          <n-icon color="black" :size="20">
            <planet-sharp />
          </n-icon>
        </template>
      </n-input>
    </n-form-item-row>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Person, PlanetSharp } from '@vicons/ionicons5'
import { useLogin } from '@/store/login'
import { cache } from '@/utils/cache'

export default defineComponent({
  name: 'LoginAccount',
  components: { Person, PlanetSharp },
  setup() {
    const loginStore = useLogin()
    const form = ref({
      username: '' || cache.getCache('username'),
      password: '' || cache.getCache('password')
    })
    const accountSubmit = (isChecked?: boolean) => {
      if (isChecked) {
        cache.setCache('username', form.value.username)
        cache.setCache('password', form.value.password)
      } else {
        cache.delCache('username')
        cache.delCache('password')
      }
      loginStore.loginAction(form.value)
    }
    return {
      form,
      accountSubmit
    }
  }
})
</script>

<style scoped lang="less"></style>
