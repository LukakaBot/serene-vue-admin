<template>
  <n-breadcrumb class="px-24px py-16px bg-red">
    <n-breadcrumb-item v-for="(item, index) in pathList" :key="index">
      {{ item }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/store';

const routeStore = useRouteStore();

const pathList = computed(() => {
  let path = routeStore.currentRoute.fullPath.slice(1);
  return path.split('/');
});
</script>

<style scoped></style>