<template>
  <n-card>
    <BaseTitle title="形状" />
    <n-flex>
      <n-button circle :render-icon="renderButtonIcon"></n-button>
      <n-button round>圆角</n-button>
      <n-button>方</n-button>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { renderIcon } from '@/utils/tools';

function renderButtonIcon() {
  return renderIcon({ name: 'carbon:money' });
} 
</script>

<style scoped></style>