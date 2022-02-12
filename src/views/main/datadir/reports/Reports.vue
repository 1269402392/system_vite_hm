<template>
  <div class="reports">
    <reports-counter />
    <n-grid x-gap="12">
      <n-gi :span="7">
        <n-card title="商品分类销量(饼图)">
          <pie-echarts :pie-data="pieData || []" />
        </n-card>
      </n-gi>
      <n-gi :span="10">
        <n-card title="全国地区销量">
          <map-echarts />
        </n-card>
      </n-gi>
      <n-gi :span="7">
        <n-card title="商品销量(玫瑰图)">
          <rose-echarts :rose-data="roseData || []" />
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card title="城市销量趋势">
          <line-echarts
            :y-axis-data="yAxisData || []"
            :x-axis-data="xAxisData || []"
          />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="地区销量图">
          <bar-echarts :y-axis-data="pillarYData" :x-axis-data="pillarXData" />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useDataDir } from '@/store/datadir'
import MapEcharts from '@/views/main/datadir/reports/children/MapEcharts.vue'
import PieEcharts from '@/views/main/datadir/reports/children/PieEcharts.vue'
import RoseEcharts from '@/views/main/datadir/reports/children/RoseEcharts.vue'
import LineEcharts from '@/views/main/datadir/reports/children/LineEcharts.vue'
import BarEcharts from '@/views/main/datadir/reports/children/BarEcharts.vue'
import ReportsCounter from '@/views/main/datadir/reports/children/ReportsCounter.vue'

export default defineComponent({
  name: 'Reports',
  components: {
    ReportsCounter,
    BarEcharts,
    LineEcharts,
    RoseEcharts,
    PieEcharts,
    MapEcharts
  },
  setup() {
    const useEchars = useDataDir()
    useEchars.getTrendData()
    // 饼图
    const pieData = computed(() => {
      return useEchars.productData[0]?.children.map((item) => ({
        name: item.name,
        value: item.value
      }))
    })

    // 玫瑰图
    const roseData = computed(() => {
      return useEchars.productData[1]?.children.map((item) => ({
        name: item.name,
        value: item.value
      }))
    })
    // 折线图
    const xAxisData = computed(() => {
      return useEchars.trendData?.common?.month
    })
    const yAxisData = computed(() => {
      return useEchars.trendData?.map?.data
    })
    // 柱状图
    const pillarXData = computed(() => {
      return useEchars!.rankData?.splice(0, 10).map((item) => {
        return item.name
      })
    })
    const pillarYData = computed(() => {
      return useEchars!.rankData?.splice(0, 10).map((item) => {
        return item.value
      })
    })
    return {
      pieData,
      roseData,
      xAxisData,
      yAxisData,
      pillarXData,
      pillarYData
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.n-grid) {
  margin-top: 10px;
}
:deep(.n-card > .n-card-header) {
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
  padding: 12px 24px;
}
</style>
