<template>
  <div class="title-tag" :style="titleStyle">{{ title }}</div>
</template>

<script setup lang="ts">
type Props = {
  /** 标题 */
  title: string;
  /** 标题样式 */
  titleStyle: Record<string, string>;
};

withDefaults(defineProps<Props>(), {
  title: '我是标题',
  titleStyle: () => ({
    'margin': '12px 0',
    'fontSize': '20px',
    'fontWeight': 'bold',
  }),
});
</script>

<style scoped></style>