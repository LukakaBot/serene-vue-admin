<template>
  <div class="base-container">
    <BasicCarousel />
    <ArrowCarousel />
    <EffectCarousel />
  </div>
</template>

<script setup lang="ts">
import ArrowCarousel from './components/ArrowCarousel.vue';
import BasicCarousel from './components/BasicCarousel.vue';
import EffectCarousel from './components/EffectCarousel.vue';
</script>

<style scoped></style>