<template>
  <n-layout-sider collapsible :collapsed="collapsed" :default-collapsed="true" @update:collapsed="handleUpdateCollapsed"
    breakpoint="xl">
    <div class="logo">
      <span v-show="!collapsed">Naive admin</span>
    </div>
    <n-menu :options="menus" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import { useRouteStore } from '@/store';

/** 路由信息商店 */
const routeStore = useRouteStore();

/** 侧边栏折叠状态 */
const collapsed = ref(false);

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

/** 渲染菜单 */
function renderMenu(route: RouteRecordRaw): MenuOption {
  const { path, name, meta, children } = route as Route.RouteItem;
  return {
    key: path,
    label: name,
    icon: meta?.icon ? () => h() : undefined,
    children: children?.map(renderMenu)
  };
}

/** 过滤后的路由列表 */
const filterRoutes = computed(() => routeStore.routes.filter(filterRoute));

/** 当前路由 */
const currentRoute = computed(() => routeStore.currentRoute);

const menus = computed(() => {
  console.log(routeStore.routes)
  // const routes
})
</script>

<style scoped>
.logo {
  @apply flex justify-center items-center gap-x-5px m-8px h-32px bg-#ccc;
}
</style>