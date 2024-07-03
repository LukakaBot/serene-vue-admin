<template>
  <div class="base-container">
    <FormTitle title="弹窗表单" />
    <n-space>
      <n-button @click="addFormModalRef?.openModal">新增表单弹窗</n-button>
      <n-button @click="viewFormModalRef?.openModal">查看表单弹窗</n-button>
    </n-space>
    <AddFormModal ref="addFormModalRef" />
    <ViewFormModal ref="viewFormModalRef" />
  </div>
</template>

<script setup lang="ts">
import AddFormModal from "./components/AddFormModal.vue";
import ViewFormModal from "./components/ViewFormModal.vue";

const addFormModalRef = ref<InstanceType<typeof AddFormModal>>();
const viewFormModalRef = ref<InstanceType<typeof ViewFormModal>>();
</script>

<style scoped></style>
