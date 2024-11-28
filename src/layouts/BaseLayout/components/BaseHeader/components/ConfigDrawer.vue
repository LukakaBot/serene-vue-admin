<template>
  <n-drawer v-model:show="show">
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      <n-divider> 虚线 </n-divider>
      <n-switch :default-value="isDarkMode" @update:value="handleUpdateSwitch">
        <template #icon> 🤔 </template>
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store';

const configStore = useConfigStore();

const show = ref(false);

function handleUpdateSwitch(value: boolean) {
  configStore.updateDarkMode(value);
}

function openDrawer() {
  show.value = true;
}

function closeDrawer() {
  show.value = false;
}

const isDarkMode = computed(() => configStore.isDarkMode);

defineExpose({ openDrawer, closeDrawer });
</script>

<style scoped></style>