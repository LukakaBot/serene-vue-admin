<script setup lang="tsx">
import { NCard } from 'naive-ui';
import type { BaseDescription } from '@/components/BaseDescriptions/types.d.ts';
import BaseDescriptions from '@/components/BaseDescriptions/index.vue';
import BaseTitle from '@/components/BaseTitle/index.vue';

const list: BaseDescription[] = [
  { text: '早餐', field: 'breakfast' },
  { text: '午餐', field: 'lunch' },
  { text: '晚餐', field: 'dinner' },
];

const data = {
  breakfast: '苹果',
  lunch: '香蕉',
  dinner: '橘子',
};

defineRender(() => (
  <NCard>
    {{
      header: () => <BaseTitle title="基础" />,
      default: () => <BaseDescriptions list={list} data={data} />
    }}
  </NCard>
));
</script>

<style scoped></style>