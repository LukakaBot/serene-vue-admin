<template>
  <n-card>
    <BaseTitle title="图标" />
    <n-flex>
      <n-button secondary strong :render-icon="renderIcon"> +100 元 </n-button>
      <n-button icon-placement="right" secondary strong :render-icon="renderIcon"> +100 元 </n-button>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon/index.vue';

function renderIcon() {
  return h(BaseIcon, { name: 'carbon:money' });
}
</script>

<style scoped></style>