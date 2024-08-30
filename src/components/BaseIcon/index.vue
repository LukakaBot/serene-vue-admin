<template>
  <div>
    <svg :style="iconStyle" :width="size" :height="size" aria-hidden="true" v-if="isRenderLocalIcon">
      <use :xlink:href="iconName" :fill="color" />
    </svg>
    <Icon :icon="icon" :width="size" :height="size" :color="color" v-else />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

type Props = {
  /** 图标名称 */
  icon: string;
  /** 图标颜色 */
  color?: string;
  /** 图标大小 */
  size?: number;
};

const props = withDefaults(defineProps<Props>(), {
  size: 16,
});

const iconName = computed(() => `#svg-${props.icon}`);

const iconStyle = computed(() => {
  return {
    color: props.color,
  };
});

/** 是否渲染本地图标 */
const isRenderLocalIcon = computed(() => props.icon.startsWith('icon-'));
</script>

<style scoped></style>