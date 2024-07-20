<template>
  <BaseModal :show="show" title="查看表单" :show-submit="false" @close="closeModal">
    <n-descriptions label-placement="left" bordered>
      <n-descriptions-item label="早餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="晚餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
    </n-descriptions>
  </BaseModal>
</template>

<script setup lang="ts">
import { useShow } from "@/hooks/show";

const { show, openModal, closeModal } = useShow();

defineExpose({ openModal, closeModal });
</script>

<style scoped></style>
