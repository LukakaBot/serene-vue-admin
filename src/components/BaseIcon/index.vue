<template>
  <div>
    <template v-if="isLocalIcon">
      <svg :width="size" :height="size" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color" />
      </svg>
    </template>
    <template v-else>
      <Icon :icon="icon" :width="size" :height="size" />
    </template>
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
  color: '#000',
  size: 16,
});

const iconName = computed(() => `#svg-${props.icon}`);

/** 是否渲染本地图标 */
const isLocalIcon = computed(() => props.icon.startsWith('icon-'));
</script>

<style scoped></style>