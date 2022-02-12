import { IModelType } from '@/components/page-model/type'

export const modelConfig: IModelType = {
  title: '添加用户',
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
        label: '用户名',
        filed: 'username',
        type: 'text',
        placeholder: '请输入用户名'
      },
      {
        label: '当前角色',
        filed: 'role_name',
        type: 'text',
        isShow: true
      },
      {
        label: '重新分配',
        filed: 'rid',
        type: 'select',
        options: [],
        isShow: true
      },
      {
        label: '密码',
        filed: 'password',
        type: 'text',
        placeholder: '请输入密码'
      },
      {
        label: '邮箱',
        filed: 'email',
        type: 'text',
        placeholder: '请输入邮箱'
      },
      {
        label: '电话号码',
        filed: 'mobile',
        type: 'text',
        placeholder: '请输入电话号码'
      }
    ]
  }
}
