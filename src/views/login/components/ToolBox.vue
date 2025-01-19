<script setup lang="tsx">
import { useThemeVars } from "naive-ui";
import { useConfigStore } from "@/store";
import { renderIcon } from "@/utils/tools";

const themeVars = useThemeVars();

const configStore = useConfigStore();

function renderDarkThemeIcon() {
  return renderIcon({ name: `${isDarkMode.value ? "mage:sun" : "mage:moon"}` });
}

const isDarkMode = computed(() => configStore.isDarkMode);

defineRender(() => (
  <n-flex class="absolute top-10px right-10px">
    <n-button
      strong
      color={themeVars.value.baseColor}
      text-color={themeVars.value.textColor1}
      render-icon={renderDarkThemeIcon}
      onClick={configStore.toggleDarkMode}
    />
  </n-flex>
));
</script>

<style scoped></style>
