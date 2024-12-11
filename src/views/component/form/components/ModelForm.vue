<template>
  <n-card>
    <template #header>
      <BaseTitle title="弹窗表单" />
    </template>
    <n-space>
      <n-button @click="formModalRef?.openModal">Open Modal</n-button>
    </n-space>
    <FormModal ref="formModalRef" />
  </n-card>
</template>

<script setup lang="ts">
import FormModal from "./FormModal.vue";

const formModalRef = ref<InstanceType<typeof FormModal>>();
</script>

<style scoped></style>
