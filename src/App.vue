<script setup lang="tsx">
import { RouterView } from "vue-router";
import { darkTheme, zhCN, dateZhCN, NConfigProvider } from "naive-ui";
import { useConfigStore, useThemeStore } from "./store";

const configStore = useConfigStore();

const themeStore = useThemeStore();

const theme = computed(() => (configStore.isDarkMode ? darkTheme : undefined));

defineRender(() => (
  <NConfigProvider
    theme={theme.value}
    theme-overrides={themeStore.appTheme}
    locale={zhCN}
    date-locale={dateZhCN}
  >
    <RouterView />
  </NConfigProvider>
));
</script>

<style scoped></style>
