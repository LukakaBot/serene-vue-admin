<template>
  <n-layout-header class="px-20px py-10px text-right">
    <n-space size="large" justify="end" align="center">
      <n-switch v-model="isDark" @update:value="handleUpdateSwitch">
        <template #icon> 🤔 </template>
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>

      <n-popover position="bottom" trigger="click">
        <template #trigger>
          <n-avatar :style="{ backgroundColor: '#14a9f8' }">Naive</n-avatar>
        </template>
        <n-button text @click="handleLogout">退出登录</n-button>
      </n-popover>
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui';
import router from '@/router';

const isDark = ref(false);

function handleUpdateSwitch(value: boolean) {
  console.log(value);
  console.log(darkTheme);
  // value ? document.body.setAttribute('arco-theme', 'dark') : document.body.removeAttribute('arco-theme');
}

/** 退出登录事件 */
function handleLogout() {
  router.replace('/login');
}
</script>

<style scoped></style>