<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AppBatteryProps } from './types'
import { isNumber } from '@/utils/is'

const props = withDefaults(defineProps<AppBatteryProps>(), {
  showText: true,
  size: '30px',
  normalColor: '#4CAF50',
  lowColor: '#FF5722',
  lowThreshold: 20,
})

/** 修正电量（确保0-100） */
const clampedPercentage = computed(() =>
  Math.max(0, Math.min(props.quantity, 100)),
)

/** 电池尺寸（处理数字/字符串） */
const batterySize = computed(() =>
  isNumber(props.size) ? `${props.size}px` : props.size,
)

/** 电量条宽度（百分比） */
const barWidth = computed(() => `${clampedPercentage.value}%`)

/** 低电量状态：是否低于阈值 */
const isLowBattery = computed(
  () => clampedPercentage.value < props.lowThreshold,
)

/** 电量填充颜色：根据状态切换（正常/低电量） */
const fillColor = computed(() =>
  isLowBattery.value ? props.lowColor : props.normalColor,
)

/** 电池高度（比例为宽度的1/2，保持协调） */
const batteryHeight = computed(() => {
  const width = Number.parseInt(batterySize.value, 10)
  return `${width / 2}px`
})

const batteryStyle = computed<CSSProperties>(() => {
  const width = Number.parseInt(batterySize.value, 10)
  const height = Number.parseInt(batteryHeight.value, 10)
  const bumpWidth = width / 15 // 凸起宽度（占电池宽度的1/15）
  const bumpHeight = height / 2 // 凸起高度（占电池高度的1/2）

  return {
    '--battery-width': batterySize.value,
    '--battery-height': batteryHeight.value,
    '--battery-bump-width': `${bumpWidth}px`,
    '--battery-bump-height': `${bumpHeight}px`,
    '--battery-bump-right': `-${bumpWidth + 2}px`, // 凸起向右偏移
    '--battery-text-font-size': `${height / 2}px`, // 文本大小（占电池高度的1/2）
  }
})

/** 电量条样式 */
const batteryBarStyle = computed<CSSProperties>(() => ({
  width: barWidth.value,
  backgroundColor: fillColor.value,
}))
</script>

<template>
  <div class="battery" :style="batteryStyle">
    <div class="battery-bar" :style="batteryBarStyle" />
    <div v-show="showText" class="battery-text">
      {{ quantity }}%
    </div>
  </div>
</template>

<style scoped>
.battery {
  position: relative;
  margin: 0 auto;
  padding: 1px;
  width: var(--battery-width);
  height: var(--battery-height);
  border: 2px solid currentColor;
  border-radius: 3px;
  background-color: #fff;
}

/* 电池凸起（正极） */
.battery::after {
  content: '';
  position: absolute;
  top: 50%;
  right: var(--battery-bump-right);
  width: var(--battery-bump-width);
  height: var(--battery-bump-height);
  transform: translateY(-50%);
  background-color: currentColor;
  border-top-right-radius: calc(var(--battery-bump-width) / 2);
  border-bottom-right-radius: calc(var(--battery-bump-width) / 2);
}

/* 电量条 */
.battery-bar {
  height: 100%;
  border-radius: 1px;
  transition: width 0.3s ease;
  /* 平滑动画 */
}

.battery-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--battery-text-font-size);
  font-weight: bold;
  text-wrap: nowrap;
  color: #333;
}
</style>
