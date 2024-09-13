<template>
  <div>
    <svg :style="iconStyle" :width="size" :height="size" aria-hidden="true" v-if="isRenderLocalIcon">
      <use :xlink:href="iconName" :fill="color" />
    </svg>
    <Icon :icon="name" :width="size" :height="size" :color="color" v-else />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { BaseIconProps } from './types';


const props = withDefaults(defineProps<BaseIconProps>(), {
  size: 16,
});

const iconName = computed(() => `#svg-${props.name}`);

const iconStyle = computed(() => {
  return {
    color: props.color,
  };
});

/** 是否渲染本地图标 */
const isRenderLocalIcon = computed(() => props.name.startsWith('icon-'));
</script>

<style scoped></style>