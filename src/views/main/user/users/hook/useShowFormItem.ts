import { IFormItem } from '@/components/ly-form/type'
import { IModelType } from '@/components/page-model/type'
import { modelConfig } from '@/views/main/user/users/config/model-config'
/*
 * page-model专用hook
 * isShow: true -> 隐藏
 * */
export function useShowFormItem(config: IModelType, isShow: boolean) {
  // 隐藏的表单
  const hideItem = modelConfig.form?.formItems.filter((item: IFormItem) => {
    return (
      item.filed === 'password' || item.filed === 'email' || item.filed === 'mobile'
    )
  })
  hideItem?.forEach((item: IFormItem) => (item.isShow = isShow))
  // 显示
  const concealItem = modelConfig.form?.formItems.filter((item: IFormItem) => {
    return item.filed === 'role_name' || item.filed === 'rid'
  })
  concealItem!.forEach((item: IFormItem) => (item.isShow = !isShow))

  // 禁用的表单
  const disabledRole = modelConfig.form?.formItems.filter(
    (item: IFormItem) => item.filed === 'role_name' || item.filed === 'username'
  )
  disabledRole?.forEach((item: IFormItem) => (item.isDisabled = isShow))
}
