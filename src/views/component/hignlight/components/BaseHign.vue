<template>
  <n-card :segmented="{ content: true }" size="small">
    <template #header>
      <BaseTitle title="基础" />
    </template>
    <n-highlight class="whitespace-pre-wrap" :text="text" :patterns="patterns" />
  </n-card>
</template>

<script setup lang="ts">
type Props = {
  text: string;
  patterns: string[];
};

defineProps<Props>();
</script>

<style scoped></style>