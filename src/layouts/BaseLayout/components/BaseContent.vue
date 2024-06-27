<template>
  <n-layout-content>
    <Transition name="slide-fade" mode="out-in">
      <router-view />
    </Transition>
  </n-layout-content>
</template>

<script setup lang="ts">

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>