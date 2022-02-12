import { h, VNode } from 'vue'
import { NButton } from 'naive-ui'

export const useGoodsVNode = (row: any): VNode[] => {
  return ['修改', '删除'].map((item) =>
    h(
      NButton,
      {
        size: 'small',
        type: item === '修改' ? 'default' : 'error',
        style: {
          marginRight: '12px'
        },
        'on-click': () => {
          if (item === '修改') {
            console.log('update')
          } else {
            console.log('delete')
          }
        }
      },
      { default: () => item }
    )
  )
}
