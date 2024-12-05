<template>
  <n-card>
    <BaseTitle title="弹窗表单" />
    <n-space>
      <n-button @click="addModalRef?.openModal">新增表单弹窗</n-button>
    </n-space>
    <AddModal ref="addModalRef" />
  </n-card>
</template>

<script setup lang="ts">
import AddModal from "./AddModal.vue";

const addModalRef = ref<InstanceType<typeof AddModal>>();
</script>

<style scoped></style>
