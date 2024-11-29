<template>
  <n-drawer v-model:show="show">
    <n-drawer-content title="系统配置">
      <n-divider> 主题风格 </n-divider>
      <n-switch :default-value="isDarkMode" @update:value="handleUpdateSwitch">
        <template #checked-icon>
          <component :is="renderIcon({ name: 'mage:moon' })" />
        </template>
        <template #unchecked-icon>
          <component :is="renderIcon({ name: 'mage:sun' })" />
        </template>
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store';
import { renderIcon } from '@/utils/tools';

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