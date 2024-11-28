<template>
  <n-card>
    <BaseTitle title="弹窗表单" />
    <n-flex>
      <n-button @click="addFormModalRef?.openModal">新增表单弹窗</n-button>
      <n-button @click="viewFormModalRef?.openModal">查看表单弹窗</n-button>
    </n-flex>
    <AddFormModal ref="addFormModalRef" />
    <ViewFormModal ref="viewFormModalRef" />
  </n-card>
</template>

<script setup lang="ts">
import AddFormModal from "./AddFormModal.vue";
import ViewFormModal from "./ViewFormModal.vue";

const addFormModalRef = ref<InstanceType<typeof AddFormModal>>();
const viewFormModalRef = ref<InstanceType<typeof ViewFormModal>>();
</script>

<style scoped></style>
