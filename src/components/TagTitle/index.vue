<script setup lang="tsx">
import type { TagTitleProps } from './types'

const props = withDefaults(defineProps<TagTitleProps>(), {
  title: '我是标题',
  titleStyle: () => ({}),
  showTag: true,
  tagDirection: 'bottom',
})

const tagClassName = computed(() =>
  props.showTag && props.tagDirection === 'left'
    ? 'left-tag-title'
    : 'bottom-tag-title',
)
</script>

<template>
  <div :class="tagClassName" :style="titleStyle">
    {{ title }}
  </div>
</template>

<style scoped></style>
