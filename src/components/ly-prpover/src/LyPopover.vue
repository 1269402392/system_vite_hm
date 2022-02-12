<template>
  <n-popover trigger="hover">
    <template #trigger>
      <slot></slot>
    </template>
    <span>
      {{ content }}
    </span>
  </n-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LyPopover',
  props: {
    content: {
      type: String,
      default: '清明上河图'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
