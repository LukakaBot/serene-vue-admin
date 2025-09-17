<script setup lang="ts">
import LoginForm from './LoginForm.vue'
// import SvgImage from './SvgImage.vue';
import WaveSvg from './WaveSvg.vue'
</script>

<template>
  <div>
    <WaveSvg />
    <div class="left-50% top-50% -translate-50%" absolute rounded-3>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped></style>
