<template>
  <n-form
    ref="formRef"
    :label-placement="labelPlacement"
    :model="formValue"
    size="medium"
    :rules="rules"
  >
    <n-grid x-gap="25" :cols="gridCols">
      <template v-for="(item, index) in formItems" :key="index">
        <n-gi>
          <n-form-item v-if="!item.isShow" :path="item.filed" :label="item.label">
            <template v-if="item.type === 'text'">
              <n-input
                v-model:value="formValue[`${item.filed}`]"
                :disabled="item.isDisabled"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <n-select
                v-model:value="formValue[`${item.filed}`]"
                :options="item.options"
                :disabled="item.isDisabled"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'date'">
              <n-date-picker
                v-model:value="formValue[`${item.filed}`]"
                type="date"
                :disabled="item.isDisabled"
                clearable
              />
            </template>
            <template v-if="item.type === 'time'">
              <n-time-picker default-formatted-value="00:13:14" />
            </template>
            <template v-if="item.type === 'cascader'">
              <n-cascader
                v-model:value="formValue[`${item.filed}`]"
                placeholder="就是一个多个选择的选择"
                expand-trigger="hover"
                label-field="cat_name"
                value-field="cat_id"
                :disabled="item.isDisabled"
                :check-strategy="item.isAll ? 'all' : 'child'"
                :options="item.cOption"
                @update:value="cascaderUpdate"
              />
            </template>
          </n-form-item>
        </n-gi>
      </template>
    </n-grid>
    <slot name="footer"></slot>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch, watchEffect } from 'vue'
import { IFormItem } from '@/components/ly-form/type'
import { NForm } from 'naive-ui'
import { useMain } from '@/store/main'

export default defineComponent({
  name: 'LyForm',
  props: {
    // label对齐方式
    labelPlacement: {
      type: String,
      default: 'top'
    },
    // 每行显示多少个表单
    gridCols: {
      type: Number,
      default: 4
    },
    formItems: {
      type: Array as PropType<IFormItem[]>, //
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const mainRef = useMain()
    const formRef = ref<InstanceType<typeof NForm>>()
    const formValue: any = ref({})

    watchEffect(() => {
      formValue.value = props.modelValue
    })
    watch(
      formValue,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    const cascaderUpdate = (value: any, option: any) => {
      mainRef.cat_pid = option.cat_pid
    }
    return {
      formRef,
      formValue,
      cascaderUpdate
    }
  }
})
</script>

<style scoped lang="less">
:deep(.n-date-picker),
:deep(.n-time-picker) {
  width: 100%;
}
</style>
