<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import BaseProvider from '@/components/BaseProvider/index.vue'
import { useConfigStore, useThemeStore } from './store'

const configStore = useConfigStore()

const themeStore = useThemeStore()

const theme = computed(() => (configStore.isDarkMode ? darkTheme : undefined))
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeStore.appTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <BaseProvider>
      <RouterView />
    </BaseProvider>
  </NConfigProvider>
</template>

<style scoped></style>
