<template>
  <div>
    <FormTitle title="图标" />
    <n-space>
      <n-button secondary strong :render-icon="renderIcon">
        +100 元
      </n-button>
      <n-button icon-placement="right" secondary strong :render-icon="renderIcon">
        +100 元
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon/index.vue';

const renderIcon = () => h(BaseIcon, { icon: 'carbon:money' });
</script>

<style scoped></style>