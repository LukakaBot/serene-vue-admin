<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import { useConfigStore } from './store';

const configStore = useConfigStore();

const theme = computed(() => configStore.isDarkMode ? darkTheme : undefined);
</script>

<style scoped></style>
