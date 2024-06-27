<template>
  <n-layout-sider collapsible :collapsed="collapsed" :default-collapsed="true" @update:collapsed="handleUpdateCollapsed"
    breakpoint="xl">
    <div class="logo">
      <span v-show="!collapsed">Naive admin</span>
    </div>

  </n-layout-sider>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import { useRouteStore } from '@/store';

/** 路由信息商店 */
const routeStore = useRouteStore();

/** 侧边栏折叠状态 */
const collapsed = ref(false);

/** 菜单点击事件 */
function handleClickMenuItem(path: string) {
  router.push(path);
}

/** 切换侧边栏 */
function handleUpdateCollapsed(value: boolean) {
  collapsed.value = value;
}

/** 过滤路由 */
function filterRoute(route: RouteRecordRaw) {
  if (route.path === '/') return false;
  if (route.meta?.hidden) return false;
  if (route.children) route.children = route.children.filter(filterRoute);
  if (route.children && route.children.length <= 0) delete route.children;
  return true;
}

/** 过滤后的路由列表 */
const filterRouteList = computed(() => routeStore.routes.filter(filterRoute));

/** 当前路由 */
const currentRoute = computed(() => routeStore.currentRoute);
</script>

<style scoped>
.logo {
  @apply flex justify-center items-center gap-x-5px m-8px h-32px bg-#ccc;
}
</style>