<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="订单详情"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> 噢！ </template>
      <n-descriptions label-placement="left" bordered :column="2">
        <n-descriptions-item label="是否发货">{{
          orderInfo.is_send
        }}</n-descriptions-item>
        <n-descriptions-item label="发票类型">{{
          orderInfo.order_fapiao_title
        }}</n-descriptions-item>
        <n-descriptions-item label="订单ID">{{
          orderInfo.order_id
        }}</n-descriptions-item>
        <n-descriptions-item label="订单编号">{{
          orderInfo.order_number
        }}</n-descriptions-item>
        <n-descriptions-item label="支付方式">{{
          orderInfo.order_pay === '0'
            ? `未支付`
            : orderInfo.order_pay === '1'
            ? `支付宝`
            : orderInfo.order_pay === '2'
            ? `微信`
            : `银行卡`
        }}</n-descriptions-item>
        <n-descriptions-item label="订单价格">{{
          orderInfo.order_price
        }}</n-descriptions-item>
        <n-descriptions-item label="是否支付">{{
          orderInfo.pay_status === '0' ? '否' : '是'
        }}</n-descriptions-item>
        <n-descriptions-item label="用户ID">{{
          orderInfo.user_id
        }}</n-descriptions-item>
        <n-descriptions-item label="更新时间">{{
          formatTime(orderInfo.update_time)
        }}</n-descriptions-item>
      </n-descriptions>
      <template #footer> 点击其他地方关闭 </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useMain } from '@/store/main'
import { formatDate } from '@/utils/format-date'

export default defineComponent({
  name: 'OrdersInfo',
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  emits: ['hideLeave'],
  setup(props, { emit }) {
    const mainStore = useMain()
    const showModal = ref(false)
    const orderInfo = ref({})
    watch(
      () => props.orderId,
      async (newValue) => {
        orderInfo.value = await mainStore.handleDataByIdNoList('orders', newValue)
      }
    )
    const formatTime = (val: any) => {
      return formatDate(val)
    }
    return {
      showModal,
      orderInfo,
      formatTime
    }
  }
})
</script>

<style scoped lang="less"></style>
