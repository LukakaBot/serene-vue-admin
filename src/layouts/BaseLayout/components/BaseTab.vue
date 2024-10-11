<template>
  <div class="tab-view">
    <div ref="navWrap" class="tab-card">
      <div class="tab-card-scroll">
        <VueDraggable ref="el" class="tab-card-scroll" v-model="tabStore.tabList">
          <div class="tab-card-scroll-item"
            :class="[{ 'active-item': activeRoutePath === tab.fullPath }, `text-${getBaseColor}`, `bg-${getCardColor}`]"
            v-for="tab in tabList" :key="tab.fullPath" @click="handleSkipPage(tab)"
            @contextmenu="handleContextMenu($event, tab)">
            <span>{{ tab.name }}</span>
            <BaseIcon name="ep:close" :size="14" @click="closeTab($event, tab)" />
          </div>
        </VueDraggable>
      </div>
    </div>
    <div class="tab-close">
      <n-dropdown trigger="click" @select="handleSelectMenu" placement="bottom-end" :options="menuOptions">
        <div class="p-3px">
          <BaseIcon name="ep:arrow-down" :size="20" />
        </div>
      </n-dropdown>
    </div>
    <n-dropdown :show="showSideMenu" :x="sideMenuPosition.x" :y="sideMenuPosition.y" @clickoutside="handleCloseSideMenu"
      placement="bottom-start" @select="handleSelectMenu" :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { DropdownOption } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { useThemeVars } from 'naive-ui';
import { VueDraggable } from 'vue-draggable-plus';
import { renderIcon } from '@/utils/tools/index';
import { useRouteStore, useTabStore } from '@/store';

const router = useRouter();

const route = useRoute();

const themeVars = useThemeVars();

/** 标签页商店 */
const tabStore = useTabStore();

/** 路由信息商店 */
const routeStore = useRouteStore();

/** 当前激活的路由路径 */
const activeRoutePath = ref('');

/** 是否显示侧边栏菜单 */
const showSideMenu = ref(false);

/** 是否为当前激活的路由 */
const isCurrentRoute = ref(false);

/** 右键选中菜单 */
const rightClickMenu = ref<RouteLocationNormalizedLoaded | null>(null);

const sideMenuPosition = reactive({ x: 0, y: 0 });

/** 跳转页面 */
function handleSkipPage(_route: RouteLocationNormalizedLoaded) {
  if (_route.fullPath === route.fullPath) return;
  router.push(_route);
}

/** 关闭标签页 */
function closeTab(e: Event, route: RouteLocationNormalizedLoaded) {
  e.stopPropagation();
  if (tabList.value.length <= 1) {
    window.$message?.warning('这已经是最后一页，不能再关闭了！');
    return;
  }
  tabStore.closeCurrentTab(route);
  // 如果关闭的是当前页
  if (activeRoutePath.value === route.fullPath) {
    const currentRoute = tabList.value[Math.max(0, tabList.value.length - 1)]!;
    activeRoutePath.value = currentRoute.fullPath;
    router.push(currentRoute);
  }
}

function handleSelectMenu(key: string) {
  switch (key) {
    // 刷新
    case '1': {
      const _route = rightClickMenu.value || route;
      routeStore.reloadPage(_route);
      break;
    }
    // 关闭
    case '2': {
      tabStore.closeCurrentTab(rightClickMenu.value!);
      break;
    }
    // 关闭其他
    case '3': {
      tabStore.closeOtherTab(rightClickMenu.value!);
      break;
    }
    // 关闭所有
    case '4': {
      tabStore.closeAllTab(rightClickMenu.value!);
      break;
    }
  }
  handleCloseSideMenu();
}

function handleCloseSideMenu() {
  rightClickMenu.value = null;
  showSideMenu.value = false;
}

/** 右键事件 */
function handleContextMenu(e: MouseEvent, menu: RouteLocationNormalizedLoaded) {
  e.preventDefault();
  rightClickMenu.value = menu;
  isCurrentRoute.value = route.path === menu.path;
  showSideMenu.value = false;

  nextTick(() => {
    showSideMenu.value = true;
    sideMenuPosition.x = e.clientX;
    sideMenuPosition.y = e.clientY;
  });
}

/** 监视路由变化 */
watch(
  () => route,
  (_) => {
    const currentRoute = routeStore.currentRoute;
    routeStore.addCacheRoute(currentRoute);
    tabStore.addTab(currentRoute);

    activeRoutePath.value = routeStore.currentRoute.fullPath;
  },
  { immediate: true, deep: true }
)

const getCardColor = computed(() => themeVars.value.cardColor);

const getBaseColor = computed(() => themeVars.value.textColor1);

/** 标签页渲染列表 */
const tabList = computed(() => tabStore.tabList);

/** 下拉菜单 */
const menuOptions = computed((): DropdownOption[] => {
  const isDisabled = tabList.value.length <= 1;

  return [
    { key: '1', label: '刷新当前', icon: renderIcon({ name: 'ep-refresh-right', size: 16 }), },
    { key: '2', label: `关闭当前`, disabled: isCurrentRoute.value || isDisabled, icon: renderIcon({ name: 'ep-close' }), },
    { key: '3', label: '关闭其他', disabled: isDisabled, icon: renderIcon({ name: 'hugeicons:arrow-left-right' }), },
    { key: '4', label: '关闭全部', disabled: isDisabled, icon: renderIcon({ name: 'bi:dash' }), },
  ];
});
</script>

<style lang="scss" scoped>
.tab-view {
  @apply flex gap-x-10px p-10px box-border;
}

.tab-card {
  @apply flex-1;
}

.tab-card-scroll {
  @apply flex overflow-y-scroll gap-6px;
}

.tab-card-scroll-item {
  @apply flex-[0_0_auto] inline-flex items-center gap-x-2px relative px-15px py-6px cursor-pointer;

  &:hover {
    @apply text-[#515a6e];

  }

  &.active-item {
    @apply text-[#18a058];
  }
}
</style>
