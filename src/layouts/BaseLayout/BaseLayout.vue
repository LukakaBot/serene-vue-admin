<template>
  <n-layout class="h-100vh layout-demo" has-sider>
    <BaseSider />
    <n-layout>
      <main class="flex flex-col h-full overflow-hidden">
        <BaseHeader />
        <n-layout-content :class="{ 'bg-#eceef0': !isDarkMode }">
          <div class="flex flex-col h-full overflow-hidden">
            <BaseTab />
            <BaseContent />
          </div>
        </n-layout-content>
      </main>
    </n-layout>
    <n-watermark v-if="showWatermark" />
  </n-layout>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store';
import BaseHeader from './components/BaseHeader/index.vue';
import BaseSider from './components/BaseSider.vue';
import BaseTab from './components/BaseTab.vue';
import BaseContent from './components/BaseContent.vue';

const configStore = useConfigStore();

const showWatermark = computed(() => configStore.showWatermark);

const isDarkMode = computed(() => configStore.isDarkMode);
</script>

<style lang="scss" scoped></style>
