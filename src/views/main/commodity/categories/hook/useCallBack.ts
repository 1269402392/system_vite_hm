import { modelConfig } from '@/views/main/commodity/categories/config/model-config'
import { IFormItem } from '@/components/ly-form/type'

export function useCallBack() {
  // 修改回调
  const updateCbFn = (row: any) => {
    // 当选择分类时另外存储当前id, 因为下面会修改成null或者cat_pid
    row.id = row.cat_id
    row.cat_id = row.cat_pid || '' // 为了只显示父级分类
    const catIdItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'cat_id'
    )
    catIdItem!.isDisabled = true
  }
  const insertCbFn = () => {
    const catIdItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'cat_id'
    )
    catIdItem!.isDisabled = false
  }
  return { updateCbFn, insertCbFn }
}
