<script setup lang="ts">
import BaseButton from './components/BaseButton.vue'
import IconButton from './components/IconButton.vue'
import LoadingButton from './components/LoadingButton.vue'
import SecondaryButton from './components/SecondaryButton.vue'
import ShapeButton from './components/ShapeButton.vue'
import TertiaryButton from './components/TertiaryButton.vue'
import TextButton from './components/TextButton.vue'
</script>

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

<style scoped></style>
