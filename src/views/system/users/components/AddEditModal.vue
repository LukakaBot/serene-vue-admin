<template>
  <BaseModal
    :show="show"
    :title="modalTitle"
    draggable
    @close="closeModal"
    @submit="handleSubmit"
  >
  </BaseModal>
</template>

<script setup lang="ts">
import type { UserPageContent } from "@/api/users/types";

type Props = {
  selectRow: UserPageContent | null;
};

const props = defineProps<Props>();

const show = ref(false);

function handleSubmit() {
  console.log("submit");
}

function openModal() {
  show.value = true;
}

function closeModal() {
  show.value = false;
}

const isEdit = computed(() => !!props.selectRow);

const modalTitle = computed(() => `${isEdit.value ? "编辑" : "新增"}用户`);

defineExpose({ openModal, closeModal });
</script>

<style scoped></style>
