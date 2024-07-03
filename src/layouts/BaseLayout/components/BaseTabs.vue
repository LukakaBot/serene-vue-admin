<template>
  <div class="tabs-view">
    <div ref="navWrap" class="tabs-card">
      <div ref="navScroll" class="tabs-card-scroll">
        <VueDraggable class="flex" v-model="tabsList" :animation="300">
          <div :id="`tag${menu.fullPath.split('/').join('\/')}`" class="tabs-card-scroll-item"
            @contextmenu="handleContextMenu($event, menu)" v-for="(menu, index) in tabsList" :key="`tabs-${index}`">
            {{ menu.name }}
          </div>
        </VueDraggable>
      </div>
    </div>
    <div class="tabs-close">
      <n-dropdown trigger="hover" @select="handleSelectMenu" placement="bottom-end" :options="menuOptions">
        <div class="p-3px">
          <BaseIcon icon="ep:arrow-down" :size="20" />
        </div>
      </n-dropdown>
    </div>
    <n-dropdown :show="showSideMenu" :x="sideMenuPosition.x" :y="sideMenuPosition.y" @clickoutside="handleCloseSideMenu"
      placement="bottom-start" @select="handleSelectMenu" :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRouter } from 'vue-router';
// import { useThemeVars } from 'naive-ui';
import { VueDraggable } from 'vue-draggable-plus'
import { renderIcon } from '@/utils/tools';
import { useTabsStore } from '@/store';

const router = useRouter();

// const themeVars = useThemeVars();

const tabsStore = useTabsStore();

const showSideMenu = ref(false);

const isCurrentRoute = ref(false);

const sideMenuPosition = reactive({
  x: 0,
  y: 0,
});

function handleSelectMenu(key: string) {
  //tab 操作
  switch (key) {
    //刷新
    case '1': {
      break;
    }
    //关闭
    case '2': {
      break;
    }
    //关闭其他
    case '3': {
      break;
    }
    //关闭所有
    case '4': {
      break;
    }
  }
  showSideMenu.value = false;
}

function handleCloseSideMenu() {
  showSideMenu.value = false;
}

/** 右键事件 */
function handleContextMenu(e: any, menu: RouteLocationNormalizedLoaded) {
  e.preventDefault();
  isCurrentRoute.value = router.currentRoute.value.path === menu.path;
  showSideMenu.value = false;
  nextTick().then(() => {
    showSideMenu.value = true;
    sideMenuPosition.x = e.clientX;
    sideMenuPosition.y = e.clientY;
  });
}

// const getCardColor = computed(() => themeVars.value.cardColor);

// const getBaseColor = computed(() => themeVars.value.textColor1);

/** 标签页渲染列表 */
const tabsList = computed(() => tabsStore.tabsList);

/** 下拉菜单 */
const menuOptions = computed(() => {
  const isDisabled = tabsList.value.length <= 1;

  return [
    { key: '1', label: '刷新当前', icon: renderIcon('ep-refresh-right'), },
    { key: '2', label: `关闭当前`, disabled: isCurrentRoute.value || isDisabled, icon: renderIcon('bi:dash'), },
    { key: '3', label: '关闭其他', disabled: isDisabled, icon: renderIcon('hugeicons:arrow-left-right'), },
    { key: '4', label: '关闭全部', disabled: isDisabled, icon: renderIcon('ep-close'), },
  ];
});
</script>

<style lang="scss" scoped>
.tabs-view {
  @apply flex gap-x-10px p-6px box-border;
}

.tabs-card {
  @apply flex-1;
}

.tabs-close{
  background: var(--n-color);
}
</style>
