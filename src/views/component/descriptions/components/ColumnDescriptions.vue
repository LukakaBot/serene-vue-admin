<script setup lang="tsx">
import type { BaseDescription } from '@/components/BaseDescriptions/types'
import { NCard } from 'naive-ui'
import BaseDescriptions from '@/components/BaseDescriptions/index.vue'
import BaseTitle from '@/components/BaseTitle/index.vue'

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

defineRender(() => (
  <NCard>
    {{
      header: () => <BaseTitle title="列数" />,
      default: () => <BaseDescriptions list={list} data={data} column={2} />,
    }}
  </NCard>
))
</script>

<style scoped></style>
