<template>
  <n-layout-header class="px-20px py-10px text-right">
    <n-flex justify="space-between" align="center">
      <div>
        <n-breadcrumb>
          <n-breadcrumb-item v-for="match in route.matched" :key="match.path"> {{ match.name }} </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <n-flex size="large" justify="end" align="center">
        <!-- <n-switch v-model="isDark" @update:value="handleUpdateSwitch">
          <template #icon> 🤔 </template>
          <template #checked> dark </template>
          <template #unchecked> light </template>
        </n-switch> -->
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="flex items-center">
            <n-avatar :style="{ backgroundColor: '#14a9f8' }">Naive</n-avatar>
          </div>
        </n-dropdown>
        <BaseIcon name="ep:setting" :size="20" />
      </n-flex>
    </n-flex>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
// import router from '@/router';
import { useUserStore } from '@/store';
// import { useThemeStore } from '@/store';

/** 用户商店 */
const userStore = useUserStore();

const route = useRoute();

/** 主题商店 */
// const themeStore = useThemeStore();

// const isDark = ref(false);

const avatarOptions = [
  { key: '1', label: '退出登录', },
];

// function handleUpdateSwitch(value: boolean) {
//   themeStore.setDarkTheme(value);
// }

function avatarSelect(key: string) {
  switch (key) {
    case '1': {
      handleLogout();
      break;
    }
  }
};

/** 退出登录事件 */
function handleLogout() {
  userStore.logout();
}
</script>

<style scoped></style>