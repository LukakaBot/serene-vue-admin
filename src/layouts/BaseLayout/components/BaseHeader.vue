<template>
  <n-layout-header class="px-20px py-10px text-right">
    <n-space size="large" justify="end" align="center">
      <n-switch v-model="isDark" @update:value="handleUpdateSwitch">
        <template #icon> 🤔 </template>
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>
      <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
        <div class="flex items-center">
          <n-avatar :style="{ backgroundColor: '#14a9f8' }">Naive</n-avatar>
        </div>
      </n-dropdown>
      <BaseIcon icon="ep:setting" :size="20" />
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import router from '@/router';
import { useThemeStore } from '@/store';

/** 主题商店 */
const themeStore = useThemeStore();

const isDark = ref(false);

const avatarOptions = [
  { key: '1', label: '个人设置', },
  { key: '2', label: '退出登录', },
];

function handleUpdateSwitch(value: boolean) {
  themeStore.setDarkTheme(value);
}

function avatarSelect(key: string) {
  switch (key) {
    case '1': {
      router.push({ name: 'Setting' });
      break;
    }
    case '2': {
      handleLogout();
      break;
    }
  }
};

/** 退出登录事件 */
function handleLogout() {
  router.replace('/login');
}
</script>

<style scoped></style>