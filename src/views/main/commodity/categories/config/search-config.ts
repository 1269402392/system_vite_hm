import { ISearchType } from '@/components/page-search/type'

export const searchConfig: ISearchType = {
  title: '《《手写的从前》》 -- 周杰伦',
  form: {
    formItems: [
      {
        label: 'id',
        filed: 'id',
        type: 'text',
        placeholder: '请输入id'
      },
      {
        label: '角色',
        filed: 'role_name',
        type: 'select',
        options: [
          { label: '纸上的彩虹', value: '别告诉她' },
          { label: '用素描画的钟', value: '我还想她' },
          { label: '我还在修改回忆中的笑容', value: '笑着难过' },
          { label: '该怎么去形容', value: '自我惩罚' }
        ],
        placeholder: '请选择角色'
      },
      {
        label: '请选择创建时间',
        filed: 'create_time',
        type: 'date',
        placeholder: 'create_time'
      },
      {
        label: '进一步精确',
        filed: 'time',
        type: 'time'
      }
    ]
  }
}
