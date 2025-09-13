<script setup lang="tsx">
import { useThemeVars } from 'naive-ui'
import { useConfigStore } from '@/store'
import { renderIcon } from '@/utils/tools'

const themeVars = useThemeVars()

const configStore = useConfigStore()

const isDarkMode = computed(() => configStore.isDarkMode)

function renderDarkThemeIcon() {
  return renderIcon({ name: `${isDarkMode.value ? 'mage:sun' : 'mage:moon'}` })
}

defineRender(() => (
  <n-flex class="absolute right-10px top-10px">
    <n-button
      strong
      color={themeVars.value.baseColor}
      text-color={themeVars.value.textColor1}
      render-icon={renderDarkThemeIcon}
      onClick={configStore.toggleDarkMode}
    />
  </n-flex>
))
</script>

<style scoped></style>
