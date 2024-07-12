<template>
  <n-breadcrumb class="p-10px">
    <n-breadcrumb-item v-for="(item, index) in pathList" :key="index">
      {{ item }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import router from '@/router';

const pathList = computed(() => router.currentRoute.value.matched.map(route => route.name));
</script>

<style scoped></style>