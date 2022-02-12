import { IModelType } from '@/components/page-model/type'

export const modelConfig: IModelType = {
  title: '添加角色',
  isTree: false,
  form: {
    gridCols: 1,
    formItems: [
      {
        label: 'id',
        filed: 'id',
        type: 'text',
        isShow: true
      },
      {
        label: '角色名',
        filed: 'roleName',
        type: 'text',
        placeholder: '请输入角色名'
      },
      {
        label: '角色描述',
        filed: 'roleDesc',
        type: 'text',
        placeholder: '请输入角色描述'
      }
    ]
  }
}
