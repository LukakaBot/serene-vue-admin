<script setup lang="ts"></script>

<template>
  <n-card>
    <template #header>
      <TagTitle title="基础" />
    </template>
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary">
        Tertiary
      </n-button>
      <n-button type="primary">
        Primary
      </n-button>
      <n-button type="info">
        Info
      </n-button>
      <n-button type="success">
        Success
      </n-button>
      <n-button type="warning">
        Warning
      </n-button>
      <n-button type="error">
        Error
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped></style>
