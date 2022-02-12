<template>
  <div class="roles">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    />
    <page-content
      ref="contentRef"
      page-name="roles"
      :content-config="contentConfigRef"
      @handle-insert="handleInsert"
    />
    <page-model
      ref="modelRef"
      :model-config="modelConfigRef"
      :default-value="defaultValue"
      @handle-model-leave="treeLeave"
      @handle-model-insert="useInsertData"
      @handle-model-update="useUpdateData"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, onActivated, ref } from 'vue'

import { NButton } from 'naive-ui'

import PageSearch from '@/components/page-search/src/PageSearch.vue'
import PageContent from '@/components/page-content/src/PageContent.vue'
import PageModel from '@/components/page-model/src/PageModel.vue'

import { searchConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { modelConfig } from './config/model-config'

import { useStore } from '@/store'
import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModel } from '@/hook/usePageModel'
import { useReqContent } from '@/hook/useReqContent'

export default defineComponent({
  name: 'Roles',
  components: { PageModel, PageContent, PageSearch },
  setup() {
    const firstOnload = ref(true)
    const store = useStore()
    store.getRightList() // 树状菜单

    onActivated(() => {
      // 判断是否是首次加载页面
      if (!firstOnload.value) {
        useReqContent('roles', contentRef.value, mainStore) // 重新请求第一页的数据
      } else {
        firstOnload.value = false
      }
    })

    // search-hook
    const { contentRef, handleQuery, handleReset } = usePageSearch()

    // 修改回调
    const updateCbFn = () => {
      modelConfig.title = '修改角色'
    }
    // 添加回调
    const insertCbFn = () => {
      modelConfig.title = '添加角色'
    }
    // 表格(content)hook
    const {
      mainStore,
      modelRef,
      defaultValue,
      handleVNode,
      handleInsert,
      treeLeave,
      useInsertData,
      useUpdateData
    } = usePageModel(updateCbFn, insertCbFn)

    mainStore.pageName = 'roles'

    const modelConfigRef = computed(() => modelConfig)

    const contentConfigRef = computed(() => {
      contentConfig.table.columns.some((item: any) => {
        if (item.key === 'handle') {
          item.render = (row: any) => [
            ...handleVNode(row),
            h(
              NButton,
              {
                size: 'small',
                type: 'warning',
                style: {
                  marginRight: '12px'
                },
                'on-click': () => {
                  modelRef.value!.showModal = true
                  modelConfig.title = '分配权限'
                  modelConfig.isTree = true
                  defaultValue.value = row
                }
              },
              { default: () => '分配权限' }
            )
          ]
        }
      })
      return contentConfig
    })
    return {
      modelRef,
      searchConfig,
      contentConfigRef,
      contentRef,
      modelConfigRef,
      defaultValue,
      handleInsert,
      treeLeave,
      handleQuery,
      handleReset,
      useInsertData,
      useUpdateData
    }
  }
})
</script>

<style scoped></style>
