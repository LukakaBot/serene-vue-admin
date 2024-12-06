<template>
  <div class="base-container">
    <BaseButton />
    <SecondaryButton />
    <TertiaryButton />
    <TextButton />
    <IconButton />
    <ShapeButton />
    <LoadingButton />
  </div>
</template>

<script setup lang="ts">
import BaseButton from './components/BaseButton.vue';
import SecondaryButton from './components/SecondaryButton.vue';
import TertiaryButton from './components/TertiaryButton.vue';
import TextButton from './components/TextButton.vue';
import IconButton from './components/IconButton.vue';
import ShapeButton from './components/ShapeButton.vue';
import LoadingButton from './components/LoadingButton.vue';
</script>

<style scoped></style>