<template>
  <n-layout class="h-100vh layout-demo" has-sider>
    <BaseSider />
    <n-layout>
      <main class="flex flex-col h-full overflow-hidden">
        <BaseHeader />
        <n-layout-content :class="{ 'layout-default-background': getDarkTheme === false }">
          <div class="flex flex-col h-full overflow-hidden">
            <BaseTab />
            <BaseContent />
          </div>
        </n-layout-content>
      </main>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';
import BaseHeader from './components/BaseHeader.vue';
import BaseSider from './components/BaseSider.vue';
import BaseTab from './components/BaseTab.vue';
import BaseContent from './components/BaseContent.vue';

const themeStore = useThemeStore();

const getDarkTheme = computed(() => themeStore.darkTheme);
</script>

<style lang="scss" scoped>
.layout-default-background {
  background: #eceef0;
}
</style>
