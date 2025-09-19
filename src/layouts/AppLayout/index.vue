<script setup lang="ts">
import AppContent from '@/components/layout/AppContent/index.vue'
import AppHeader from '@/components/layout/AppHeader/index.vue'
import AppSider from '@/components/layout/AppSider/index.vue'
import AppTab from '@/components/layout/AppTab/index.vue'
import { useConfigStore } from '@/store'

const configStore = useConfigStore()

const isDarkMode = computed(() => configStore.isDarkMode)
</script>

<template>
  <n-layout has-sider h-screen>
    <AppSider />
    <n-layout>
      <main h-full flex flex-col overflow-hidden>
        <AppHeader />
        <n-layout-content :class="{ 'bg-#eceef0': !isDarkMode }">
          <n-el h-full flex flex-col overflow-hidden>
            <AppTab />
            <AppContent />
          </n-el>
        </n-layout-content>
      </main>
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
