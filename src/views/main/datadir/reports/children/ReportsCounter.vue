<template>
  <n-grid x-gap="12" :cols="4">
    <template v-for="(item, index) in counterConfig" :key="item.title">
      <n-gi>
        <n-card :title="item.title">
          <div class="left">
            <n-icon :size="35" color="black">
              <component :is="cpns[index]"></component>
            </n-icon>
            <span style="font-size: 14px">NumBer Animation -></span>
          </div>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :duration="4000"
            :to="item.value"
          />
        </n-card>
      </n-gi>
    </template>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NumberAnimationInst } from 'naive-ui'
import { counterConfig } from '../config/counterConfig'
import { DiceOutline, Earth, FitnessSharp, Library } from '@vicons/ionicons5'
export default defineComponent({
  name: 'ReportsCounter',
  components: { DiceOutline },
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    return {
      numberAnimationInstRef,
      counterConfig,
      handleClick() {
        numberAnimationInstRef.value?.play()
      },
      cpns: [DiceOutline, Earth, FitnessSharp, Library]
    }
  }
})
</script>

<style scoped lang="less">
:deep(.n-card__content) {
  font-size: 20px;
  color: rgb(238, 102, 102);
}
.left {
  display: flex;
  align-items: center;
  margin-right: 5px;
  color: rgb(84, 112, 198);
}
:deep(.n-icon) {
  position: relative;
  margin-right: 5px;
}
:deep(.n-card__content) {
  display: flex;
  align-items: center;
}
:deep(.n-card > .n-card-header) {
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
  padding: 12px 24px;
}
</style>
