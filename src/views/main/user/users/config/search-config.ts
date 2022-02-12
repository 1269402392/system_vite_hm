import { ISearchType } from '@/components/page-search/type'

export const searchConfig: ISearchType = {
  title: '用户列表',
  form: {
    formItems: [
      {
        label: '用户名',
        filed: 'username',
        type: 'text',
        placeholder: '请输入用户名'
      },
      {
        label: '角色',
        filed: 'role_name',
        type: 'select',
        options: [],
        placeholder: '请选择角色',
        isDisabled: true
      },
      {
        label: '手机号',
        filed: 'mobile',
        type: 'text',
        placeholder: '请输入手机号',
        isDisabled: true
      },
      {
        label: '请选择创建时间',
        filed: 'create_time',
        type: 'date',
        placeholder: 'create_time'
      }
    ]
  }
}
