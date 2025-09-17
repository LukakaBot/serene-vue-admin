<script setup lang="ts">
import { useConfigStore } from '@/store'
import BaseContent from './components/BaseContent/index.vue'
import BaseHeader from './components/BaseHeader/index.vue'
import BaseSider from './components/BaseSider/index.vue'
import BaseTab from './components/BaseTab/index.vue'

const configStore = useConfigStore()

const isDarkMode = computed(() => configStore.isDarkMode)
</script>

<template>
  <n-layout has-sider h-screen>
    <BaseSider />
    <n-layout>
      <main h-full flex flex-col overflow-hidden>
        <BaseHeader />
        <n-layout-content :class="{ 'bg-#eceef0': !isDarkMode }">
          <n-el h-full flex flex-col overflow-hidden>
            <BaseTab />
            <BaseContent />
          </n-el>
        </n-layout-content>
      </main>
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
