<template>
  <n-breadcrumb class="mx-10px py-10px border-b-1px border-solid border-#b8b8b8">
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