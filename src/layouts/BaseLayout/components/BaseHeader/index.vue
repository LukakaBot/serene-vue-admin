<template>
  <n-layout-header class="px-20px py-10px text-right">
    <n-page-header>
      <template #subtitle>
        <n-breadcrumb>
          <n-breadcrumb-item v-for="match in route.matched" :key="match.path"> {{ match.name }} </n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #extra>
        <n-flex>
          <!-- <div class="flex items-center"> -->
          <template v-for="(operation, index) in operations" :key="index">
            <n-dropdown trigger="click" :options="operation.options" v-if="operation.type === 'dropdown'">
              <n-button text :render-icon="operation.icon" @click="operation?.props?.onClick">
                <component :is="operation.render" v-if="operation.render" />
                <div v-else>{{ operation.label }}</div>
              </n-button>
            </n-dropdown>
          </template>
          <!-- </div> -->
        </n-flex>
      </template>
    </n-page-header>
    <ConfigDrawer ref="configDrawerRef" />
  </n-layout-header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { NAvatar } from 'naive-ui';
import { useUserStore } from '@/store';
import { renderIcon } from '@/utils/tools';
import ConfigDrawer from './components/ConfigDrawer.vue';

/** 用户商店 */
const userStore = useUserStore();

const configDrawerRef = ref<InstanceType<typeof ConfigDrawer>>();

const route = useRoute();

const operations = [
  {
    type: 'dropdown',
    icon: renderConfigIcon,
    props: { onClick: showConfigDrawer }
  },
  {
    type: 'dropdown', label: 'M', options: [
      { key: '1', label: '退出登录', props: { onClick: handleLogout } },
    ],
    render: () => h(NAvatar, { class: 'color-yellow bg-red' }, () => 'M'),
  },
];

function showConfigDrawer() {
  configDrawerRef.value?.openDrawer();
}

/** 退出登录事件 */
function handleLogout() {
  userStore.logout();
}

function renderConfigIcon() {
  return renderIcon({ name: 'ep:setting', size: 18 });
}
</script>

<style scoped></style>