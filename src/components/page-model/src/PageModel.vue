<template>
  <div class="page-model">
    <n-modal
      ref="nModelRef"
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      :title="modelConfig.title"
      positive-text="确认"
      negative-text="算了"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
      @after-leave="afterLeave"
    >
      <ly-form
        v-if="!modelConfig.isTree && Object.keys(modelConfig.form).length > 0"
        ref="lyFormRef"
        v-bind="modelConfig.form || {}"
        v-model:model-value="formData"
        :rules="rules"
        class="ly-form"
      />
      <n-tree
        v-show="modelConfig.isTree ?? false"
        block-line
        cascade
        checkable
        label-field="authName"
        key-field="id"
        :default-checked-keys="checkedKeys"
        :data="treeData"
        @update:checked-keys="updateCheckedKeys"
      />
    </n-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import LyForm from '@/components/ly-form/src/LyForm.vue'
import { IModelType } from '@/components/page-model/type'
import { showMessage } from '@/hook/useShowMessage'
import { useMain } from '@/store/main'
import { useStore } from '@/store'
import { treeToPermissions } from '@/utils'
import { IRightsType } from '@/store/type'
import { IFormItem } from '@/components/ly-form/type'
import { NModal } from 'naive-ui'

export default defineComponent({
  name: 'PageModel',
  components: { LyForm },
  props: {
    modelConfig: {
      type: Object as PropType<IModelType>,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleModelLeave', 'handleModelInsert', 'handleModelUpdate'],
  setup(props, { emit }) {
    const lyFormRef = ref<InstanceType<typeof LyForm>>()
    const nModelRef = ref<InstanceType<typeof NModal>>()

    const mainStore = useMain()
    const store = useStore()

    const showModal = ref(false)
    const formData: any = ref({})
    const treeData = computed(() => store.rightList)

    const checkedKeys = ref<number[]>([]) // 默认选中节点
    const rids = ref<number[]>([]) // 选中的树节点

    watch(
      () => props.defaultValue,
      (newValue) => {
        if (props.modelConfig.isTree) {
          checkedKeys.value = treeToPermissions(newValue.children as IRightsType[])
        } else {
          if (newValue.order_price) newValue.order_price = newValue.order_price + '' // 解决订单价格是数字的警告
          for (const item of props.modelConfig.form!.formItems) {
            formData.value[`${item.filed}`] = newValue[`${item.filed}`]
          }
        }
      }
    )
    const rules: any = ref({})
    for (const item of props.modelConfig.form!.formItems) {
      formData.value[`${item.filed}`] = null
      if (item.type === 'text') {
        rules.value[`${item.filed}`] = {
          required: true,
          message: item.placeholder ?? '该项不能为空',
          trigger: 'blur'
        }
      }
    }
    rules.value = { ...rules.value, ...props.modelConfig.form?.rules } // 合并验证规则

    const onNegativeClick = () => {
      showModal.value = false
    }
    const onPositiveClick = async () => {
      if (props.modelConfig.isTree) {
        // 角色分配权限处理
        const meta = await mainStore.handleTreeToRids(
          props.defaultValue.id,
          rids.value.join(',')
        )
        showMessage(meta)
        return
      }
      return lyFormRef.value?.formRef?.validate(async (valid) => {
        if (valid !== undefined) return

        // 用户分配角色
        const ridItem = props.modelConfig.form?.formItems.find(
          (item: IFormItem) => item.filed === 'rid'
        )
        if (ridItem && !ridItem?.isShow) {
          const { id, rid } = formData.value
          const meta = await mainStore.handleUserToRole(id, rid)
          showMessage(meta)
          return
        }

        if (Object.values(props.defaultValue).length > 0) {
          emit('handleModelUpdate', { ...formData.value })
        } else {
          emit('handleModelInsert', { ...formData.value })
        }
        showModal.value = false
      })
    }
    // tree
    const updateCheckedKeys = (value: number[], options: any[]) => {
      const ridStr: any[] = [] // 存储过滤后的树节点
      options.forEach((item) => {
        let pids: any[] // 存储每个节点的父id(pid)
        if (!ridStr.includes(item.id)) {
          ridStr.push(item.id)
        }
        if (typeof item.pid === 'string') {
          pids = item.pid.split(',')
        } else {
          pids = [item.pid]
        }
        for (const pid of pids) {
          const intPid = parseInt(pid)
          if (!ridStr.includes(intPid) && intPid !== 0) {
            ridStr.push(intPid)
          }
        }
      })
      rids.value = ridStr
    }
    // 弹出框关闭
    const afterLeave = () => {
      // 关闭弹出框, 将数据初始化
      for (const item of props.modelConfig.form!.formItems) {
        formData.value[`${item.filed}`] = ''
      }
      emit('handleModelLeave')
    }
    return {
      showModal,
      formData,
      treeData,
      checkedKeys,
      rules,
      lyFormRef,
      nModelRef,
      onNegativeClick,
      onPositiveClick,
      updateCheckedKeys,
      afterLeave
    }
  }
})
</script>

<style scoped lang="less">
.ly-form {
  margin-top: 25px;
}
</style>
