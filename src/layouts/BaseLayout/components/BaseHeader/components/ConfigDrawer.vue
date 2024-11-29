<template>
  <n-drawer v-model:show="show">
    <n-drawer-content title="系统配置">
      <n-divider> 主题风格 </n-divider>
      <n-switch v-model:value="configStore.isDarkMode">
        <template #checked-icon>
          <component :is="renderIcon({ name: 'mage:moon' })" />
        </template>
        <template #unchecked-icon>
          <component :is="renderIcon({ name: 'mage:sun' })" />
        </template>
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>
      <n-divider> 界面配置 </n-divider>
      <n-flex justify="space-between" align="center">
        <label>是否显示水印</label>
        <n-switch v-model:value="configStore.showWatermark" />
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store';
import { renderIcon } from '@/utils/tools';

const configStore = useConfigStore();

const show = ref(false);

function openDrawer() {
  show.value = true;
}

function closeDrawer() {
  show.value = false;
}

defineExpose({ openDrawer, closeDrawer });
</script>

<style scoped></style>