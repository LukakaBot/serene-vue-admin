<script setup lang="ts">
interface Props {
  text: string
  patterns: string[]
}

defineProps<Props>()
</script>

<template>
  <n-card :segmented="{ content: true }" size="small">
    <template #header>
      <TagTitle title="基础" />
    </template>
    <n-highlight
      class="whitespace-pre-wrap"
      :text="text"
      :patterns="patterns"
    />
  </n-card>
</template>

<style scoped></style>
