<script setup lang="ts">
import LoginForm from './LoginForm.vue'
// import SvgImage from './SvgImage.vue';
import WaveSvg from './WaveSvg.vue'
</script>

<template>
  <div>
    <WaveSvg />
    <div absolute left-50% top-50% rounded-3 -translate-50%>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped></style>
