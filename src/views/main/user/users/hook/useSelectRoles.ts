import { useStore } from '@/store'
import { IFormItem } from '@/components/ly-form/type'

/*
 *  角色下拉框赋值
 * */
export const useSelectRoles = (config: any, filed: string) => {
  const store = useStore()
  const rolesItem = config.form?.formItems.find(
    (item: IFormItem) => item.filed === filed
  )
  rolesItem!.options = store.roleList.map((item) => {
    return {
      label: item.roleName,
      value: item.id
    }
  })
}
