<script setup lang="ts">
import type { BaseDescription } from '@/components/BaseDescriptions/types'
import { NCard } from 'naive-ui'
import BaseDescriptions from '@/components/BaseDescriptions/index.vue'
import TagTitle from '@/components/TagTitle/index.vue'

const list: BaseDescription[] = [
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
    <BaseDescriptions :list="list" :data="data" />
  </NCard>
</template>

<style scoped></style>
