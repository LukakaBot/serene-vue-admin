<template>
  <n-flex>
    <n-button :type="btn.type" v-for="(btn, index) in list" :key="index" :render-icon="renderIconName"
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

const emit = defineEmits<Emits>();

function handleClick(text: string) {
  emit('click', text);
}

function renderIconName(name: string) {
  if (!name) return undefined;
  return renderIcon({ name });
}
</script>

<style scoped></style>