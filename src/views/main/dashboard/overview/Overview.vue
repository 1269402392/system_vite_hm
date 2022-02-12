<template>
  <div class="overview">
    <over-header />
    <over-section />
    <over-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OverHeader from '@/views/main/dashboard/overview/children/OverHeader.vue'
import OverSection from '@/views/main/dashboard/overview/children/OverSection.vue'
import OverFooter from '@/views/main/dashboard/overview/children/OverFooter.vue'

export default defineComponent({
  name: 'Overview',
  components: { OverFooter, OverSection, OverHeader },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
:deep(.n-card) {
  margin-top: 10px;
}
:deep(.n-card-header) {
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 12px;
  padding: 12px 24px;
}
:deep(.n-icon) {
  font-size: 17px;
  position: relative;
  top: 2.8px;
  left: -5px;
}
.overview {
}
</style>
