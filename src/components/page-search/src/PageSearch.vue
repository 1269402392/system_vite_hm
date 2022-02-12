<template>
  <div class="page-search">
    <h2>{{ searchConfig.title }}</h2>
    <ly-form v-model="formData" v-bind="searchConfig.form">
      <template #footer>
        <div class="btns">
          <n-button @click="reset">
            <template #icon>
              <n-icon><refresh /></n-icon>
            </template>
            <span>重置</span>
          </n-button>
          <n-button type="success" @click="submit">
            <template #icon>
              <n-icon><search-outline /></n-icon>
            </template>
            <span>查询</span>
          </n-button>
        </div>
      </template>
    </ly-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import LyForm from '@/components/ly-form'
import { ISearchType } from '@/components/page-search/type'
import { SearchOutline, Refresh } from '@vicons/ionicons5'
export default defineComponent({
  name: 'PageSearch',
  components: { LyForm, SearchOutline, Refresh },
  props: {
    searchConfig: {
      type: Object as PropType<ISearchType>,
      required: true
    }
  },
  emits: ['handleQuery', 'handleReset'],
  setup(props, { emit }) {
    // 收集搜索框对应的字段
    const formData: any = ref({})
    const initFormData = () => {
      for (const item of props.searchConfig.form?.formItems ?? []) {
        formData.value[`${item.filed}`] = ''
        if (item.filed === 'create_time') {
          formData.value[`${item.filed}`] = 0
        }
        if (item.type === 'select') {
          formData.value[`${item.filed}`] = undefined
        }
      }
    }
    initFormData()
    const reset = () => {
      initFormData()
      emit('handleReset')
    }
    const submit = () => {
      emit('handleQuery', formData.value)
    }
    return {
      formData,
      reset,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  background: white;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
  .btns {
    text-align: center;
    .n-button {
      margin-right: 10px;
    }
  }
}
</style>
