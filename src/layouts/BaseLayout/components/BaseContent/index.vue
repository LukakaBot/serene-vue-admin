<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide-fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" v-if="routeStore.isRouteLoaded" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/store';

const routeStore = useRouteStore();
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>