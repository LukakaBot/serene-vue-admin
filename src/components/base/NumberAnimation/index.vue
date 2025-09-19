<script setup lang="tsx">
import { isNumber } from '@/utils/is'

interface Props {
  prefix?: string
  suffix?: string
  size?: string
  showSeparator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: '14px',
  showSeparator: true,
})

const attrs = useAttrs()

const bindStyle = computed(() => ({
  fontSize: isNumber(props.size) ? `${props.size}px` : props.size,
}))

const isRenderPrefix = computed(() => !!props.prefix)

const isRenderSuffix = computed(() => !!props.suffix)
</script>

<template>
  <div :style="bindStyle">
    <span v-if="isRenderPrefix">{{ prefix }}</span>
    <n-number-animation v-bind="attrs" :show-separator="showSeparator" />
    <span v-if="isRenderSuffix">{{ suffix }}</span>
  </div>
</template>

<style scoped></style>
