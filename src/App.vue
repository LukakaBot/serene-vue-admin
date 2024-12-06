<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
    <n-watermark v-if="showWatermark" v-bind="watermarkProps" />
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { WatermarkProps } from 'naive-ui';
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import { useConfigStore } from './store';

const configStore = useConfigStore();

const theme = computed(() => configStore.isDarkMode ? darkTheme : undefined);

const showWatermark = computed(() => configStore.showWatermark);

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
  };
})
</script>

<style scoped></style>
