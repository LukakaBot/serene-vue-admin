<template>
  <n-card>
    <template #header>
      <BaseTitle title="文本按钮" />
    </template>
    <n-button text :render-icon="renderButtonIcon"> 那车头依然吐着烟 </n-button>
  </n-card>
</template>

<script setup lang="ts">
import { renderIcon } from '@/utils/tools';

function renderButtonIcon() {
  return renderIcon({ name: 'ion:train-outline' });
}
</script>

<style scoped></style>