<template>
  <n-flex>
    <n-button v-for="(btn, index) in list" :key="index" :type="btn.type" :render-icon="renderIconName(btn.icon!)" strong
      @click="handleClick(btn.text)">
      {{ btn.text }}
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import type { BaseButtonGroup } from './types';
import { renderIcon } from '@/utils/tools/index';

type Props = {
  list: BaseButtonGroup[];
};

type Emits = {
  (event: 'click', text: string): void;
};

withDefaults(defineProps<Props>(), {
  list: () => []
});

const emits = defineEmits<Emits>();

function handleClick(text: string) {
  emits('click', text);
}

function renderIconName(name: string) {
  if (!name) return undefined;
  return () => renderIcon({ name });
}
</script>

<style scoped></style>