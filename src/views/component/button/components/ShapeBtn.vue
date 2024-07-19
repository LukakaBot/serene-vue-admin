<template>
  <div>
    <FormTitle title="形状" />
    <n-space>
      <n-button circle :render-icon="renderIcon"></n-button>
      <n-button round>圆角</n-button>
      <n-button>方</n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon/index.vue';

const renderIcon = () => h(BaseIcon, { icon: 'carbon:money' });
</script>

<style scoped></style>