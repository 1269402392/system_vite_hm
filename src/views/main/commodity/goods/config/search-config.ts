import { ISearchType } from '@/components/page-search/type'

export const searchConfig: ISearchType = {
  title: '《《说走就走》》 -- 周杰伦',
  form: {
    formItems: [
      {
        label: 'id',
        filed: 'goods_id',
        type: 'text',
        placeholder: '请输入id'
      },
      {
        label: '商品名称',
        filed: 'goods_name',
        type: 'text',
        placeholder: '请输入商品名称'
      },
      {
        label: '精选歌词',
        filed: 'role_name',
        type: 'select',
        options: [
          { label: '边走边说', value: '边走边说' },
          { label: '边牵着你手', value: '边牵着你手' },
          { label: '边谈边笑', value: '边谈边笑' },
          { label: '边笑着看我', value: '边微笑着看我' }
        ],
        placeholder: '请选择角色'
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
