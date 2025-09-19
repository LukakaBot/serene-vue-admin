<script setup lang="ts">
import type { WatermarkProps } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useConfigStore, useRouteStore } from '@/store'

const routeStore = useRouteStore()

const configStore = useConfigStore()

const showWatermark = computed(() => configStore.showWatermark)

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: configStore.watermarkContent,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
  }
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide-fade" mode="out-in" appear>
      <component
        :is="Component"
        v-if="routeStore.isRouteLoaded"
        :key="route.fullPath"
      />
    </Transition>
    <n-watermark v-if="showWatermark" v-bind="watermarkProps" />
  </RouterView>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.slide-fade-leave-active {
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
