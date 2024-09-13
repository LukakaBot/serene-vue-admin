<template>
  <div>
    <FormTitle title="加载中" />
    <n-flex>
      <n-button :loading="loading" :render-icon="renderIcon" @click="handleClick">
        点我
      </n-button>
      <n-button :loading="loading" @click="handleClick">
        点我
      </n-button>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks/loading/index';
import BaseIcon from '@/components/BaseIcon/index.vue';

const [loading, setLoading] = useLoading();

function handleClick() {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);
}

const renderIcon = () => h(BaseIcon, { name: 'carbon:money' });
</script>

<style scoped></style>