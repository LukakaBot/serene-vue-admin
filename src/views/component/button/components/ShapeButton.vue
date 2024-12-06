<template>
  <n-card>
    <template #header>
      <BaseTitle title="形状" />
    </template>
    <n-space>
      <n-button circle :render-icon="renderButtonIcon"></n-button>
      <n-button round>圆角</n-button>
      <n-button>方</n-button>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { renderIcon } from '@/utils/tools';

function renderButtonIcon() {
  return renderIcon({ name: 'ion:cash-outline' });
} 
</script>

<style scoped></style>