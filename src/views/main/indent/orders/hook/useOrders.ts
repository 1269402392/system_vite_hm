import { h, ref, VNode } from 'vue'
import { NButton } from 'naive-ui'
import PageModel from '@/components/page-model'
import OrdersInfo from '@/views/main/indent/orders/children/OrdersInfo.vue'

export function useOrders() {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const orderInfoRef = ref<InstanceType<typeof OrdersInfo>>()
  const defaultValue: any = ref({})

  const ordersHandleVNode = (row: any): VNode[] => {
    return ['修改', '查看'].map((item) =>
      h(
        NButton,
        {
          size: 'small',
          type: item === '修改' ? 'default' : 'error',
          style: {
            marginRight: '12px'
          },
          'on-click': async () => {
            if (item === '修改') {
              modelRef.value!.showModal = true
              defaultValue.value = row
            } else {
              orderInfoRef.value!.showModal = true
              defaultValue.value = row
            }
          }
        },
        { default: () => item }
      )
    )
  }
  return { modelRef, orderInfoRef, defaultValue, ordersHandleVNode }
}
