<template>
  <!-- <n-card class="absolute top-10px right-10px" tag="span"> -->
  <n-flex class="absolute top-10px right-10px">
    <n-button strong type="info" :render-icon="renderDarkThemeIcon" @click="configStore.toggleDarkMode" />
  </n-flex>
  <!-- </n-card> -->
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store';
import { renderIcon } from '@/utils/tools';

const configStore = useConfigStore();

function renderDarkThemeIcon() {
  return renderIcon({ name: `${isDarkMode.value ? 'mage:sun' : 'mage:moon'}` });
}

const isDarkMode = computed(() => configStore.isDarkMode);
</script>

<style scoped></style>