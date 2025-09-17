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
    <Transition
      v-if="routeStore.isRouteLoaded"
      name="slide-fade"
      mode="out-in"
      appear
    >
      <component :is="Component" :key="route.fullPath" />
    </Transition>
    <n-watermark v-if="showWatermark" v-bind="watermarkProps" />
  </RouterView>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
