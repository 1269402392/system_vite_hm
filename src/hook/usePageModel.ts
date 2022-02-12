import { h, ref, VNode } from 'vue'
import { NButton, useDialog } from 'naive-ui'
import { showMessage } from '@/hook/useShowMessage'
import PageModel from '@/components/page-model/src/PageModel.vue'
import { useMain } from '@/store/main'
import { modelConfig } from '@/views/main/permission/roles/config/model-config'
import { useShowFormItem } from '@/views/main/user/users/hook/useShowFormItem'
import router from '@/router'
import { useStore } from '@/store'

type cbFn = (row?: any) => void

/**
 * 弹出框 添加/修改/删除
 * @param updateCbFn
 * @param insertCbFn
 * @param deleteCbFn
 */
export function usePageModel(
  updateCbFn?: cbFn,
  insertCbFn?: cbFn,
  deleteCbFn?: cbFn
) {
  const store = useStore()
  const mainStore = useMain()
  const dialog = useDialog()
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const defaultValue: any = ref({}) // 修改弹出默认值
  // 删除 and 修改
  const handleVNode = (row: any): VNode[] => {
    return ['修改', '删除'].map((item) =>
      h(
        NButton,
        {
          size: 'small',
          type: item === '修改' ? 'default' : 'error',
          style: {
            marginRight: '12px'
          },
          'on-click': async () => {
            if (item === '修改') {
              if (row.goods_id) {
                // 商品跳转
                await router.push({
                  path: '/handleGoods',
                  query: {
                    goods_id: row.goods_id
                  }
                })
              } else {
                modelRef.value!.showModal = true
                const copyRow = { ...row } // 浅拷贝该对象
                updateCbFn && updateCbFn(copyRow)
                defaultValue.value = copyRow
              }
            } else {
              // 删除
              dialog.warning({
                title: '你确定?',
                content: '它只想静静而已~',
                positiveText: '非常肯定',
                negativeText: '还是算了',
                onPositiveClick: async () => {
                  if (deleteCbFn) {
                    deleteCbFn && deleteCbFn(row)
                    return
                  }
                  const meta = await mainStore.handleDeleteData(
                    row.id ?? row.goods_id ?? row.cat_id
                  )
                  showMessage(meta)
                },
                onNegativeClick: () => {
                  showMessage({ status: 200, msg: '感谢不杀之恩!' })
                }
              })
            }
          }
        },
        { default: () => item }
      )
    )
  }

  const handleInsert = async () => {
    if (mainStore.pageName === 'goods') {
      // 商品添加
      await router.push('/handleGoods')
      return
    }
    modelRef.value!.showModal = true
    defaultValue.value = {}
    insertCbFn && insertCbFn()
  }

  // 弹出框关闭回调 useShowFormItem(modelConfig, true)
  const treeLeave = () => {
    modelConfig.isTree = false // role -> 树隐藏
    useShowFormItem(modelConfig, false) // user -> 禁用以及隐藏解除
  }
  // 处理数据的添加修改
  const useInsertData = async (data: any) => {
    const meta = await mainStore.handleAddData(data)
    showMessage(meta)
  }
  const useUpdateData = async (data: any) => {
    const meta = await mainStore.handleEditData(data)
    showMessage(meta)
    if (mainStore.pageName === 'categories') {
      store.getCategoriesTwo() // 获取商品全部二级分类
    }
  }

  return {
    mainStore,
    modelRef,
    defaultValue,
    handleVNode,
    handleInsert,
    treeLeave,
    useInsertData,
    useUpdateData
  }
}
