<script setup lang="ts">
import type { AppDescription } from '@/components/base/AppDescriptions/types'
import { NCard } from 'naive-ui'

const list: AppDescription[] = [
  { text: '早餐', field: 'breakfast' },
  { text: '午餐', field: 'lunch' },
  { text: '下午茶', field: 'afternoonTea' },
  { text: '晚餐', field: 'dinner' },
  { text: '夜宵', field: 'nightSnack' },
]

const data = {
  breakfast: '苹果',
  lunch: '香蕉',
  afternoonTea: '西瓜',
  dinner: '橘子',
  nightSnack: '葡萄',
}
</script>

<template>
  <NCard>
    <template #header>
      <TagTitle title="列数" />
    </template>
    <AppDescription :list="list" :data="data" :column="2" />
  </NCard>
</template>

<style scoped></style>
