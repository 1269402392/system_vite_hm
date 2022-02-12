<template>
  <div class="app">
    <!--  Message提示组件  -->
    <n-dialog-provider>
      <n-message-provider>
        <n-message />
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </n-message-provider>
    </n-dialog-provider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NMessageProvider, NDialogProvider } from 'naive-ui'
import NMessage from '@/components/ly-message/LyMessage.vue'
export default defineComponent({
  components: { NMessage, NMessageProvider, NDialogProvider },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.app {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  //background-color: rgb(16, 16, 20);
  //color: rgb(207, 204, 208);
}
</style>
