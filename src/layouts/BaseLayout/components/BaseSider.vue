<template>
  <n-layout-sider collapse-mode="width" :collapsed="collapsed" :collapsed-width="64" :width="240" show-trigger
    :on-after-enter="handleAfterSiderEnter" @update:collapsed="handleUpdateCollapsed">
    <div class="flex justify-center items-center gap-x-5px m-8px h-32px bg-#ccc overflow-hidden">
      <span class="whitespace-nowrap break-all" v-if="isRenderTitle">Naive admin</span>
      <BaseIcon icon="logos:vue" :size="22" v-else />
    </div>
    <n-menu :value="currentRoute" :default-value="currentRoute" :options="menus" :collapsed="collapsed"
      :collapsed-width="64" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { RouteRecordRaw, RouterLink } from 'vue-router';
import { useRouteStore } from '@/store';
import BaseIcon from '@/components/BaseIcon/index.vue';

/** 路由信息商店 */
const routeStore = useRouteStore();

/** 侧边栏折叠状态 */
const collapsed = ref(false);

const isRenderTitle = ref(true);

/** 切换侧边栏 */
function handleUpdateCollapsed(value: boolean) {
  collapsed.value = value;
  isRenderTitle.value = false;
}

function handleAfterSiderEnter() {
  isRenderTitle.value = true;
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

  const link = () => h(RouterLink, { to: path }, () => `${name}`);
  const icon = meta?.icon ? () => h(BaseIcon, { icon: meta.icon, size: 22 }) : undefined;

  return {
    key: path,
    label: route.children && route.children.length ? name : link,
    icon,
    children: children?.map(renderMenu),
  };
}

/** 过滤后的路由列表 */
const filterRoutes = computed(() => routeStore.routes.filter(filterRoute));

/** 当前路由 */
const currentRoute = computed(() => routeStore.currentRoute.fullPath);

/** 菜单 */
const menus = computed(() => {
  const menus = filterRoutes.value.map(renderMenu);
  return menus;
});
</script>

<style scoped></style>