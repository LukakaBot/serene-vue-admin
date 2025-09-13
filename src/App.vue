<script setup lang="tsx">
import { darkTheme, dateZhCN, NConfigProvider, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import BaseProvider from '@/components/BaseProvider/index.vue'
import { useConfigStore, useThemeStore } from './store'

const configStore = useConfigStore()

const themeStore = useThemeStore()

const theme = computed(() => (configStore.isDarkMode ? darkTheme : undefined))

defineRender(() => (
  <NConfigProvider
    theme={theme.value}
    themeOverrides={themeStore.appTheme}
    locale={zhCN}
    dateLocale={dateZhCN}
  >
    <BaseProvider>
      <RouterView />
    </BaseProvider>
  </NConfigProvider>
))
</script>

<style scoped></style>
