<template>
  <div :class="tagClassName" :style="titleStyle">{{ title }}</div>
</template>

<script setup lang="ts">
type Props = {
  /** 标题 */
  title: string;
  /** 标题样式 */
  titleStyle?: Record<string, string>;
  /** 是否显示 tag */
  showTag?: boolean;
  /** tag 方向 */
  tagDirection?: 'left' | 'bottom';
};

const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  titleStyle: () => ({}),
  // titleStyle: () => ({
  //   'margin': '12px 0',
  //   'fontSize': '20px',
  //   'fontWeight': 'bold',
  // }),
  showTag: true,
  tagDirection: 'bottom',
});

const tagClassName = computed(() => `${props.tagDirection}-tag-title`);
</script>

<style scoped></style>