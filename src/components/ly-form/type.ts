type InputType = 'text' | 'password' | 'select' | 'date' | 'time' | 'cascader'

export interface IFormType {
  labelPlacement?: string // label的对齐方式
  formItems: IFormItem[]
  gridCols?: number // 每行显示多少表单
  rules?: any
}
export interface IFormItem {
  label: string
  filed: string
  type: InputType
  options?: IOption[] // 普通下拉
  cOption?: any[] // 级联选择
  placeholder?: string
  isShow?: boolean // true -> 不显示
  isDisabled?: boolean // true -> 不显示
  isAll?: boolean // cOption的选项配置
}

export interface IOption {
  label?: string
  value?: string | number
}
