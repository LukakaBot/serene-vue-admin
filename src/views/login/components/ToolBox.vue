<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { useConfigStore } from '@/store'
import { renderIcon } from '@/utils/tools'

const themeVars = useThemeVars()

const configStore = useConfigStore()

const isDarkMode = computed(() => configStore.isDarkMode)

function renderDarkThemeIcon() {
  return renderIcon({ name: `${isDarkMode.value ? 'mage:sun' : 'mage:moon'}` })
}
</script>

<template>
  <n-flex absolute right-3 top-3>
    <n-button
      strong
      :color="themeVars.baseColor"
      :text-color="themeVars.textColor1"
      :render-icon="renderDarkThemeIcon"
      @click="configStore.toggleDarkMode"
    />
  </n-flex>
</template>

<style scoped></style>
