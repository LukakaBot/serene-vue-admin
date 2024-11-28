<template>
  <n-card>
    <BaseTitle title="图标" />
    <n-flex>
      <n-button secondary strong :render-icon="renderButtonIcon"> +100 元 </n-button>
      <n-button icon-placement="right" secondary strong :render-icon="renderButtonIcon"> +100 元 </n-button>
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