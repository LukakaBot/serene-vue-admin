<template>
  <n-card :segmented="{ content: true }" size="small">
    <template #header>
      <BaseTitle title="样式" />
    </template>
    <n-highlight class="whitespace-pre-wrap" :text="text" :patterns="patterns" :highlight-style="highlightStyle" />
  </n-card>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useThemeVars } from 'naive-ui/es';

type Props = {
  text: string;
  patterns: string[];
};

defineProps<Props>();

const themeVars = useThemeVars();

const highlightStyle: CSSProperties = {
  margin: '0 6px',
  padding: '0 6px',
  borderRadius: themeVars.value.borderRadius,
  display: 'inline-block',
  color: themeVars.value.baseColor,
  background: themeVars.value.primaryColor,
  transition: `all .3s ${themeVars.value.cubicBezierEaseInOut}`,
};
</script>

<style scoped></style>