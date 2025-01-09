<template>
  <n-layout class="h-100vh layout-demo" has-sider>
    <BaseSider />
    <n-layout>
      <main class="flex flex-col h-full overflow-hidden">
        <BaseHeader />
        <n-layout-content :class="{ 'bg-#eceef0': !isDarkMode }">
          <n-el class="flex flex-col h-full overflow-hidden">
            <BaseTab />
            <BaseContent />
          </n-el>
        </n-layout-content>
      </main>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store';
import BaseHeader from './components/BaseHeader/index.vue';
import BaseSider from './components/BaseSider/index.vue';
import BaseTab from './components/BaseTab/index.vue';
import BaseContent from './components/BaseContent/index.vue';

const configStore = useConfigStore();

const isDarkMode = computed(() => configStore.isDarkMode);
</script>

<style lang="scss" scoped></style>
