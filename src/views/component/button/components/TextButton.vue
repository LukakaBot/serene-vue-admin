<script setup lang="ts">
import { renderIcon } from '@/utils/tools'

function renderButtonIcon() {
  return renderIcon({ name: 'ion:train-outline' })
}
</script>

<template>
  <n-card>
    <template #header>
      <BaseTitle title="文本按钮" />
    </template>
    <n-button text :render-icon="renderButtonIcon">
      那车头依然吐着烟
    </n-button>
  </n-card>
</template>

<style scoped></style>
