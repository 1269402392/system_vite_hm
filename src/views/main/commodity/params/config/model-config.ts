import { IModelType } from '@/components/page-model/type'

export const modelConfig: IModelType = {
  title: '添加参数',
  form: {
    gridCols: 1,
    formItems: [
      {
        label: '参数名称',
        filed: 'attr_name',
        type: 'text',
        placeholder: '请输入参数名称'
      }
    ]
  }
}
