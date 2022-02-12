<template>
  <div class="rights">
    <ly-table :data="data || []" v-bind="contentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { contentConfig } from './config/content-config'
import LyTable from '@/components/ly-table'
import { handleGetRequest } from '@/service/request'
import { showMessage } from '@/hook/useShowMessage'
export default defineComponent({
  name: 'Rights',
  components: { LyTable },
  setup() {
    const data = ref()
    onMounted(async () => {
      const { data: result, meta } = await handleGetRequest(`rights/list`)
      data.value = result
      showMessage(meta)
    })
    return {
      data,
      contentConfig
    }
  }
})
</script>

<style scoped></style>
