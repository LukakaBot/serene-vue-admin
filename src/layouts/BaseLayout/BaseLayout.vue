<template>
  <n-layout class="h-full layout-demo" has-sider>
    <BaseSider />
    <n-layout>
      <BaseHeader />
      <n-layout>
        <BaseBreadcrumb />
        <BaseContent />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import BaseHeader from './components/BaseHeader.vue';
import BaseSider from './components/BaseSider.vue';
import BaseBreadcrumb from './components/BaseBreadcrumb.vue';
import BaseContent from './components/BaseContent.vue';
</script>

<style lang="scss" scoped>
</style>
