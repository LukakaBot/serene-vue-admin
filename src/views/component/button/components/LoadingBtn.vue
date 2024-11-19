<template>
  <n-card>
    <BaseTitle title="加载中" />
    <n-flex>
      <n-button :loading="loading" :render-icon="renderIcon" @click="handleClick"> 点我 </n-button>
      <n-button :loading="loading" @click="handleClick"> 点我 </n-button>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks/useLoading';
import BaseIcon from '@/components/BaseIcon/index.vue';

const [loading, setLoading] = useLoading();

function handleClick() {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);
}

function renderIcon() {
  return h(BaseIcon, { name: 'carbon:money' });
}
</script>

<style scoped></style>