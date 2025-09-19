<script setup lang="ts">
import {
  NDialogProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
} from 'naive-ui'
</script>

<template>
  <NModalProvider>
    <NDialogProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <slot />
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NModalProvider>
</template>

<style scoped></style>
