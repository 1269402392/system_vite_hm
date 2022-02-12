<template>
  <div class="users">
    <page-search
      :search-config="searchConfigRef"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    />
    <page-content
      ref="contentRef"
      page-name="users"
      :content-config="contentConfigRef"
      @handle-insert="handleInsert"
    />
    <page-model
      ref="modelRef"
      :model-config="modelConfigRef"
      :default-value="defaultValue"
      @tree-leave="treeLeave"
      @handle-model-insert="useInsertData"
      @handle-model-update="useUpdateData"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, onActivated, ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model/src/PageModel.vue'

import { searchConfig } from '@/views/main/user/users/config/search-config'
import { contentConfig } from '@/views/main/user/users/config/content-config'
import { modelConfig } from '@/views/main/user/users/config/model-config'
import { NButton, NSwitch } from 'naive-ui'

import { useStore } from '@/store'
import { showMessage } from '@/hook/useShowMessage'
import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModel } from '@/hook/usePageModel'
import { useSelectRoles } from '@/views/main/user/users/hook/useSelectRoles'
import { useShowFormItem } from '@/views/main/user/users/hook/useShowFormItem'
import { useReqContent } from '@/hook/useReqContent'
import { useCallBack } from '@/views/main/user/users/hook/useCallBack'

export default defineComponent({
  name: 'Users',
  components: {
    PageModel,
    PageContent,
    PageSearch
  },
  setup() {
    const firstOnload = ref(true)
    const store = useStore()
    store.getRoleList()

    const { insertCbFn, updateCbFn } = useCallBack(modelConfig)
    // 搜索hook
    const { contentRef, handleQuery, handleReset } = usePageSearch()

    // 表格(table)hook
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

    mainStore.pageName = 'users'

    onActivated(() => {
      if (!firstOnload.value) {
        useReqContent('users', contentRef.value, mainStore) // 重新请求第一页的数据
      } else {
        firstOnload.value = false
      }
    })
    // some返回true则中断循环, 给角色选择下拉框赋值
    const searchConfigRef = computed(() => {
      useSelectRoles(searchConfig, 'role_name')
      return searchConfig
    })
    // 弹出框处理
    const modelConfigRef = computed(() => modelConfig)

    const contentConfigRef = computed(() => {
      // 修改状态
      contentConfig.table.columns.some((item: any) => {
        if (item.key === 'mg_state') {
          item.render = (row: any) =>
            h(
              NSwitch,
              {
                style: {},
                value: row.mg_state as boolean,
                'on-update:value': async (value: boolean) => {
                  row.mg_state = value
                  const meta = await mainStore.handleUserState(row.id, value)
                  showMessage(meta)
                }
              },
              { default: () => '' }
            )
          return true
        }
      })
      // 给表格添加 修改按钮以及删除按钮 -> render渲染
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
                  modelConfigRef.value.title = '分配角色'
                  useShowFormItem(modelConfig, true) // 对表单进行筛洗, 显示的显示, 隐藏的隐藏
                  defaultValue.value = row // 数据回显
                  useSelectRoles(modelConfigRef.value, 'rid') // 对下拉选择角色赋值
                }
              },
              { default: () => '给个角色' }
            )
          ]
        }
      })
      return contentConfig
    })

    return {
      searchConfigRef,
      contentConfigRef,
      contentRef,
      modelRef,
      modelConfigRef,
      defaultValue,
      searchConfig,
      modelConfig,
      handleQuery,
      handleReset,
      handleInsert,
      treeLeave,
      useInsertData,
      useUpdateData
    }
  }
})
</script>

<style scoped lang="less"></style>
