<template>
  <n-form ref="formRef" :model="form" :rules="rules">
    <n-form-item-row label="手机号" path="cellphone">
      <n-input v-model:value="form.cellphone" placeholder="请输入手机号">
        <template #prefix>
          <n-icon color="black" :size="16">
            <tablet-portrait />
          </n-icon>
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row label="验证码" path="code">
      <n-input
        v-model:value="form.code"
        placeholder="请输入验证码"
        type="text"
        show-password-on="click"
      >
        <template #prefix>
          <n-icon color="black" :size="16">
            <receipt-sharp />
          </n-icon>
        </template>
      </n-input>
      <n-button v-if="!isDisabled" type="primary" @click="handleGetCode">
        获取验证码
      </n-button>
      <n-button v-if="isDisabled" type="info" disabled>{{ backTime }}</n-button>
    </n-form-item-row>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TabletPortrait, ReceiptSharp } from '@vicons/ionicons5'
import { NForm } from 'naive-ui'
import { handleMockGetRequest } from '@/service/mock'
import { useLogin } from '@/store/login'

export default defineComponent({
  name: 'LoginPhone',
  components: { TabletPortrait, ReceiptSharp },
  emits: ['handleCode'],
  setup(props, { emit }) {
    const loginStore = useLogin()
    const form = ref({
      cellphone: '' || '18373010572',
      code: ''
    })
    const regPhone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/

    const rules = {
      cellphone: [
        {
          required: true,
          validator(rule: any, value: any) {
            if (value === '') {
              return new Error('手机号不能为空')
            } else if (!regPhone.exec(value)) {
              return new Error('请输入正确的手机号')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      code: {
        required: true,
        trigger: ['blur', 'input'],
        message: '林俊杰: 干嘛不写验证码?'
      }
    }
    const formRef = ref<InstanceType<typeof NForm>>()
    const codeNumber = ref('') // 存储验证码
    const backTime = ref(5) // 倒计时数字
    const isDisabled = ref(false) // 倒计时按钮
    const beforeTime = ref() // 重新获取验证码重新计时
    const submit = async () => {
      if (codeNumber.value !== '' && codeNumber.value === form.value.code) {
        loginStore.loginAction({
          username: 'admin',
          password: '123456'
        })
      } else {
        ;(window as any).$message.error('验证码无效！')
      }
    }
    const handleGetCode = async () => {
      const codeLoading = (window as any).$message.loading('玩命获取中...')
      const { code } = await handleMockGetRequest('/phoneCode')
      backTime.value = 5
      isDisabled.value = !isDisabled.value
      codeLoading?.destroy()
      codeNumber.value = code + '' // 存储验证码
      const interval = setInterval(() => {
        if (backTime.value === 1) {
          clearInterval(interval)
          isDisabled.value = !isDisabled.value
        }
        backTime.value--
      }, 1000)
      ;(window as any).$message.success(`验证码为: ${code}`, {
        duration: 5000,
        closable: true
      })
      if (beforeTime.value) clearInterval(beforeTime.value)
      beforeTime.value = setTimeout(() => (codeNumber.value = ''), 10000)
    }
    return {
      form,
      rules,
      formRef,
      backTime,
      isDisabled,
      submit,
      handleGetCode
    }
  }
})
</script>

<style scoped lang="less">
:deep(.n-button) {
  margin-left: 10px;
  width: 100px;
}
</style>
