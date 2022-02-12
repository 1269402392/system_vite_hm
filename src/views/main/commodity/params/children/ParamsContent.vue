<template>
  <div class="content">
    <n-card title="算了为了项目完整还是写吧" style="margin-bottom: 16px">
      <n-tabs v-model:value="tabValue" type="line" @before-leave="tabBeforeLeave">
        <n-tab-pane name="only" tab="动态参数"> </n-tab-pane>
        <n-tab-pane name="many" tab="静态参数"> </n-tab-pane>
      </n-tabs>
      <base-header
        :add-click="handleInsert"
        :batch-click="batchClick"
        :cancel-batch="cancelBatch"
        :title="contentConfigRef.title"
        v-bind="contentConfigRef.other"
      />
      <ly-table ref="tableRef" :data="data" v-bind="contentConfigRef.table" />
      <page-model
        ref="modelRef"
        :model-config="modelConfig"
        :default-value="defaultValue"
        :is-self-submit="true"
        @handle-model-insert="handleSubmit"
        @handle-model-update="handleSubmit"
      />
      <params-model ref="paramsModelRef" @handle-params="handleParams" />
    </n-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, onActivated, ref, watch } from 'vue'
import LyTable from '@/components/ly-table/src/LyTable.vue'
import { contentConfig } from '../config/content-config'
import { usePageModel } from '@/hook/usePageModel'
import BaseHeader from '@/components/base-header/src/BaseHeader.vue'
import { usePageContent } from '@/hook/usePageContent'
import {
  handleDeleteRequest,
  handlePostRequest,
  handlePutRequest
} from '@/service/request'
import { showMessage } from '@/hook/useShowMessage'
import { modelConfig } from '../config/model-config'
import PageModel from '@/components/page-model'
import { NButton } from 'naive-ui'
import ParamsModel from '@/views/main/commodity/params/children/ParamsModel.vue'
export default defineComponent({
  name: 'ParamsContent',
  components: { ParamsModel, BaseHeader, LyTable, PageModel },
  emits: ['handleTabValue', 'handleInsert'],
  setup(props, { emit }) {
    const tabValue = ref('only')
    const paramsModelRef = ref<InstanceType<typeof ParamsModel>>()
    watch(tabValue, (newValue) => emit('handleTabValue', newValue))
    // 删除回调
    const deleteCbFn = async (row: any) => {
      const { meta } = await handleDeleteRequest(
        `categories/${row.cat_id}/attributes/${row.attr_id}`
      )
      showMessage(meta)
      emit('handleTabValue', tabValue.value)
    }

    const {
      mainStore,
      modelRef,
      defaultValue,
      handleVNode,
      handleInsert,
      useInsertData,
      useUpdateData
    } = usePageModel(undefined, undefined, deleteCbFn)

    onActivated(() => {
      mainStore.dataList = []
    })

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
                  paramsModelRef.value!.showModal = true
                  defaultValue.value = row
                  paramsModelRef.value!.attr_vals = row.attr_vals
                    ? row.attr_vals.split(',')
                    : []
                }
              },
              { default: () => '属性值(Vals)' }
            )
          ]
        }
      })
      return contentConfig
    })

    const data = computed(() => mainStore.dataList)

    const { tableRef, cancelBatch } = usePageContent(mainStore)
    // 批量删除
    const batchClick = async () => {
      if (tableRef.value!.checkKeys.length <= 0) {
        return showMessage({ status: 500, msg: '都没选,删个锤子???' })
      }
      const resultList = tableRef.value?.checkKeys.map(async (id: number) => {
        const { meta } = await handleDeleteRequest(
          `categories/${mainStore.cat_id}/attributes/${id}`
        )
        return meta
      })
      showMessage(await resultList![0])
      emit('handleTabValue', tabValue.value)
    }
    const handleSubmit = async (formData: any) => {
      // 汇总参数
      const copy = { ...defaultValue.value, ...formData }
      if (Object.values(defaultValue.value).length > 0) {
        // 修改
        await pushRequest(
          `categories/${copy.cat_id}/attributes/${copy.attr_id}`,
          {
            attr_name: copy.attr_name,
            attr_sel: copy.attr_sel,
            attr_vals: copy.attr_vals
          },
          'update'
        )
      } else {
        await pushRequest(
          `categories/${mainStore.cat_id}/attributes`,
          {
            attr_name: formData.attr_name,
            attr_sel: tabValue.value
          },
          'insert'
        )
      }
    }
    const pushRequest = async (url: string, data: any, type: string) => {
      let meta: any
      if (type === 'insert') {
        const result = await handlePostRequest(url, data)
        meta = result.meta
      } else {
        const result = await handlePutRequest(url, data)
        meta = result.meta
      }
      showMessage(meta)
      emit('handleTabValue', tabValue.value)
    }
    // Vals参数改变
    const handleParams = (attr_vals: any[]) => {
      if (attr_vals !== defaultValue.value.attr_vals) {
        handleSubmit({ attr_vals })
      }
    }

    const tabBeforeLeave = () => {
      if (mainStore.dataList.length <= 0) {
        showMessage({ status: 404, msg: '请你看看温馨提示，谢谢!' })
        return false
      }
      return true
    }
    return {
      data,
      tabValue,
      tableRef,
      modelRef,
      paramsModelRef,
      contentConfigRef,
      defaultValue,
      modelConfig,
      handleInsert,
      handleSubmit,
      batchClick,
      handleParams,
      cancelBatch,
      tabBeforeLeave,
      useInsertData,
      useUpdateData
    }
  }
})
</script>

<style scoped lang="less">
.content {
  background: white;
  margin-top: 10px;
  text-align: center;
}
</style>
