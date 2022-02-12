<template>
  <div class="goods-info">
    <ly-form ref="lyForm" v-model="formData" :rules="rules" v-bind="infoConfigRef" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import LyForm from '@/components/ly-form/src/LyForm.vue'

import { infoConfig } from '@/views/main/commodity/goods/config/info-config'
import { IFormItem } from '@/components/ly-form/type'
import { useStore } from '@/store'

export default defineComponent({
  name: 'GoodsInfo',
  components: { LyForm },
  props: {
    goodsInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const formData: any = ref({})
    const rules: any = ref({})
    const lyForm = ref<InstanceType<typeof LyForm>>()
    for (const item of infoConfig.formItems) {
      formData.value[`${item.filed}`] = ''
      if (item.type === 'text') {
        rules.value[`${item.filed}`] = {
          required: true,
          message: item.placeholder ?? '该项不能为空',
          trigger: 'blur'
        }
      }
    }
    watch(
      () => props.goodsInfo,
      (newValue) => {
        formData.value = newValue
      },
      { deep: true }
    )
    const infoConfigRef = computed(() => {
      const goodsCat = infoConfig.formItems.find(
        (item: IFormItem) => item.filed === 'goods_cat'
      )
      const store = useStore()
      goodsCat!.cOption = store.categoryList
      return infoConfig
    })
    return { infoConfigRef, formData, rules, lyForm }
  }
})
</script>

<style scoped lang="less"></style>
