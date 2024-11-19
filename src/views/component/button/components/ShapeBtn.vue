<template>
  <n-card>
    <BaseTitle title="形状" />
    <n-flex>
      <n-button circle :render-icon="renderIcon"></n-button>
      <n-button round>圆角</n-button>
      <n-button>方</n-button>
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