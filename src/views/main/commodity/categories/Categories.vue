<template>
  <div class="categories">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfigRef"
      @handle-insert="handleInsert"
    />
    <page-model
      ref="modelRef"
      :model-config="modelConfigRef"
      :default-value="defaultValue"
      @handle-model-insert="handleModelInsert"
      @handle-model-update="useUpdateData"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, ref } from 'vue'
import { searchConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { modelConfig } from './config/model-config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModel from '@/components/page-model/src/PageModel.vue'

import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModel } from '@/hook/usePageModel'
import { useReqContent } from '@/hook/useReqContent'
import { useCallBack } from './hook/useCallBack'
import { useStore } from '@/store'

import { IFormItem } from '@/components/ly-form/type'
export default defineComponent({
  name: 'Categories',
  components: { PageModel, pageSearch, pageContent },
  setup() {
    const firstOnload = ref(true)
    const store = useStore()
    store.getCategoriesTwo() // 获取商品全部二级分类

    const { updateCbFn, insertCbFn } = useCallBack()

    const {
      mainStore,
      modelRef,
      defaultValue,
      handleVNode,
      handleInsert,
      useInsertData,
      useUpdateData
    } = usePageModel(updateCbFn, insertCbFn)

    const { contentRef, handleQuery, handleReset } = usePageSearch()

    const modelConfigRef = computed(() => {
      const catPidItem = modelConfig.form?.formItems.find(
        (item: IFormItem) => item.filed === 'cat_id'
      )
      catPidItem!.cOption = store.categories
      return modelConfig
    })
    mainStore.pageName = 'categories'

    onActivated(() => {
      if (!firstOnload.value) {
        useReqContent('categories', contentRef.value, mainStore) // 重新请求第一页的数据
      } else {
        firstOnload.value = false
      }
    })

    const contentConfigRef = computed(() => {
      // 给表格添加 修改按钮以及删除按钮 -> render渲染
      contentConfig.table.columns.some((item: any) => {
        if (item.key === 'handle') {
          item.render = (row: any) => handleVNode(row)
        }
      })
      return contentConfig
    })

    const handleModelInsert = async (formValue: any) => {
      if (formValue.cat_id) {
        // cat_id不为空添加二三级分类
        const data = await mainStore.handleDataByIdNoList(
          mainStore.pageName,
          formValue.cat_id
        )
        formValue = {
          cat_name: formValue.cat_name,
          cat_pid: data.cat_id,
          cat_level: parseInt(data.cat_level) + 1
        }
      } else {
        // 添加一级分类
        formValue = {
          cat_name: formValue.cat_name,
          cat_pid: 0,
          cat_level: 0
        }
      }
      await useInsertData(formValue)
      store.getCategoriesTwo() // 获取商品全部二级分类
    }
    return {
      contentRef,
      modelRef,
      defaultValue,
      searchConfig,
      modelConfigRef,
      contentConfigRef,
      handleInsert,
      handleQuery,
      handleReset,
      handleModelInsert,
      useUpdateData
    }
  }
})
</script>

<style scoped></style>
