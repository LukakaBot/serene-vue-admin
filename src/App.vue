<template>
  <NConfigProvider :theme="getDarkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import { useThemeStore } from './store';

/** 主题商店 */
const themeStore = useThemeStore();

/** 获取深色主题 */
const getDarkTheme = computed(() => themeStore?.darkTheme ? darkTheme : undefined);
</script>

<style scoped></style>
