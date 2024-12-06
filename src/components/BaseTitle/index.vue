<template>
  <n-el :class="tagClassName" :style="titleStyle">{{ title }}</n-el>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

type Props = {
  /** 标题 */
  title: string;
  /** 标题样式 */
  titleStyle?: CSSProperties;
  /** 是否显示 tag */
  showTag?: boolean;
  /** tag 方向 */
  tagDirection?: 'left' | 'bottom';
};

const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  titleStyle: () => ({}),
  showTag: true,
  tagDirection: 'bottom',
});

const tagClassName = computed(() => {
  if (props.tagDirection === 'left') {
    return 'left-tag-title'
  }
  else {
    return 'bottom-tag-title'
  }
});
</script>

<style scoped></style>