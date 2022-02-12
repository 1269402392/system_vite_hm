<template>
  <div class="search">
    <div class="header">
      <h2>说实话我本不想写这个功能的</h2>
      <n-cascader
        v-model:value="value"
        placeholder="就是一个多个选择的选择"
        expand-trigger="hover"
        label-field="cat_name"
        value-field="cat_id"
        check-strategy="child"
        :options="option"
        @update:value="handleUpdate"
      />
      <div class="info">
        <span class="red">温馨提示:</span> 请先选择然后才能查询到数据哦~
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, ref } from 'vue'
import { useStore } from '@/store'
import { handleGetRequest } from '@/service/request'
import { useMain } from '@/store/main'

export default defineComponent({
  name: 'ParamsSearch',
  emits: ['handleOther'],
  setup(props, { emit }) {
    onActivated(() => {
      value.value = null
    })
    const value = ref()
    const store = useStore()
    const mainStore = useMain()
    const option = store.categoryList

    const handleUpdate = async (value: any) => {
      mainStore.cat_id = value
      emit('handleOther')
      await getDataList(value)
    }
    const getDataList = async (value: number, sel = 'only') => {
      const { data } = await handleGetRequest(`categories/${value}/attributes`, {
        sel: sel
      })
      mainStore.dataList = data
    }
    return {
      value,
      option,
      handleUpdate,
      getDataList
    }
  }
})
</script>

<style scoped lang="less">
.search {
  background: white;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 10px;
  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
  .info {
    font-size: 13px;
    margin-top: 10px;
  }
  :deep(.n-cascader) {
    margin: auto;
    width: 25%;
  }
}
.red {
  color: red;
}
</style>
