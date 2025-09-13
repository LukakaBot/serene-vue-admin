<script setup lang="ts">
import router from '@/router'

const pathList = computed(() => router.currentRoute.value.matched.map(route => route.name))
</script>

<template>
  <n-breadcrumb class="mx-10px border-b-1px border-#b8b8b8 border-solid py-10px">
    <n-breadcrumb-item v-for="(item, index) in pathList" :key="index">
      {{ item }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped></style>
