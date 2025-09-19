<script setup lang="ts">
import type { AppDescription } from '@/components/base/AppDescriptions/types'
import { NCard } from 'naive-ui'

const list: AppDescription[] = [
  { text: '早餐', field: 'breakfast' },
  { text: '午餐', field: 'lunch' },
  { text: '晚餐', field: 'dinner' },
]

const data = {
  breakfast: '苹果',
  lunch: '香蕉',
  dinner: '橘子',
}
</script>

<template>
  <NCard>
    <template #header>
      <TagTitle title="基础" />
    </template>
    <AppDescription :list="list" :data="data" />
  </NCard>
</template>

<style scoped></style>
