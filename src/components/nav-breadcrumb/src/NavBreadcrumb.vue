<template>
  <n-breadcrumb separator=">">
    <n-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
      {{ item.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumbType } from '@/components/nav-breadcrumb/type'

export default defineComponent({
  name: 'NavBreadcrumb',
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumbType[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
