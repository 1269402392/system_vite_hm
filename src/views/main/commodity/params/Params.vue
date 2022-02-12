<template>
  <div class="params">
    <params-search ref="searchRef" @handle-other="handleOther" />
    <params-content ref="contentRef" @handle-tab-value="handleTabValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ParamsSearch from './children/ParamsSearch.vue'
import ParamsContent from './children/ParamsContent.vue'

import { modelConfig } from './config/model-config'

export default defineComponent({
  name: 'Params',
  components: { ParamsContent, ParamsSearch },
  setup() {
    const searchRef = ref<InstanceType<typeof ParamsSearch>>()
    const contentRef = ref<InstanceType<typeof ParamsContent>>()
    const handleTabValue = (value: string) => {
      searchRef.value?.getDataList(searchRef.value?.value, value)
    }
    const handleOther = () => {
      contentRef.value!.contentConfigRef.other!.isBatchDisabled = false
      contentRef.value!.contentConfigRef.other!.isInsertDisabled = false
    }
    return {
      searchRef,
      contentRef,
      modelConfig,
      handleOther,
      handleTabValue
    }
  }
})
</script>

<style scoped></style>
