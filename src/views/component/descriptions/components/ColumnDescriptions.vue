<script setup lang="ts">
import type { BaseDescription } from '@/components/BaseDescriptions/types'
import { NCard } from 'naive-ui'
import BaseDescriptions from '@/components/BaseDescriptions/index.vue'
import TagTitle from '@/components/TagTitle/index.vue'

const list: BaseDescription[] = [
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
    <BaseDescriptions :list="list" :data="data" :column="2" />
  </NCard>
</template>

<style scoped></style>
