<template>
  <div :style="bindStyle">
    <span v-if="isRenderPrefix">{{ prefix }}</span>
    <n-number-animation v-bind="attrs" :showSeparator="showSeparator" />
    <span v-if="isRenderSuffix">{{ suffix }}</span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  prefix?: string;
  suffix?: string;
  size?: string;
  showSeparator?: boolean;
};

const props = withDefaults(
  defineProps<Props>(),
  {
    size: '14px',
    showSeparator: true,
  }
);

const attrs = useAttrs();

const bindStyle = computed(() => ({
  fontSize: props.size,
}));

const isRenderPrefix = computed(() => !!props.prefix);

const isRenderSuffix = computed(() => !!props.suffix);
</script>

<style scoped></style>