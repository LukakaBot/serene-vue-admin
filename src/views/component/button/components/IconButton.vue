<script setup lang="ts">
import { renderIcon } from '@/utils/tools'

function renderButtonIcon() {
  return renderIcon({ name: 'ion:cash-outline' })
}
</script>

<template>
  <n-card>
    <template #header>
      <BaseTitle title="图标" />
    </template>
    <n-space>
      <n-button secondary strong :render-icon="renderButtonIcon">
        +100 元
      </n-button>
      <n-button icon-placement="right" secondary strong :render-icon="renderButtonIcon">
        +100 元
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped></style>
