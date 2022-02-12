import { IFormItem } from '@/components/ly-form/type'

export function useCallBack(modelConfig: any) {
  // 修改回调
  const updateCbFn = () => {
    modelConfig.title = '修改用户'
    const passwordItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'password'
    )
    passwordItem!.isShow = true
    const usernameItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'username'
    )
    usernameItem!.isDisabled = true
  }
  // 添加回调
  const insertCbFn = () => {
    modelConfig.title = '添加用户'
    const passwordItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'password'
    )
    passwordItem!.isShow = false
    const usernameItem = modelConfig.form?.formItems.find(
      (item: IFormItem) => item.filed === 'username'
    )
    usernameItem!.isDisabled = false
  }
  return {
    insertCbFn,
    updateCbFn
  }
}
