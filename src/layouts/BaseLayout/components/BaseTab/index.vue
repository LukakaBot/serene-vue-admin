<script setup lang="tsx">
import type { DropdownOption } from 'naive-ui'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { NButton, NDropdown, NScrollbar, useThemeVars } from 'naive-ui'
import { VueDraggable } from 'vue-draggable-plus'
import { useRoute, useRouter } from 'vue-router'
import BaseIcon from '@/components/BaseIcon/index.vue'
import { useRouteStore, useTabStore } from '@/store'
import { renderIcon } from '@/utils/tools/index'

const router = useRouter()

const route = useRoute()

const themeVars = useThemeVars()

/** 标签页商店 */
const tabStore = useTabStore()

/** 路由信息商店 */
const routeStore = useRouteStore()

/** 标签页渲染列表 */
const tabList = computed(() => tabStore.tabList)

/** 下拉菜单 */
const menuOptions = computed<DropdownOption[]>(() => {
  const isDisabled = tabList.value.length <= 1

  return [
    { key: '1', label: '刷新当前', icon: () => renderIcon({ name: 'mdi:refresh', size: 20 }) },
    { key: '2', label: `关闭当前`, disabled: isDisabled, icon: () => renderIcon({ name: 'mdi:close', size: 20 }) },
    { key: '3', label: '关闭其他', disabled: isDisabled, icon: () => renderIcon({ name: 'material-symbols:swap-horiz-rounded', size: 20 }) },
    { key: '4', label: '关闭全部', disabled: isDisabled, icon: () => renderIcon({ name: 'material-symbols:eco-outline-rounded', size: 20 }) },
  ]
})

/** 当前激活的tab的路径 */
const activeTabPath = ref('')

/** 是否显示侧边栏菜单 */
const showSideMenu = ref(false)

/** 右键点击的tab */
const rightClickTab = ref<RouteLocationNormalizedLoaded | null>(null)

const sideMenuPosition = reactive({ x: 0, y: 0 })

/** 跳转页面 */
function handleSkipPage(tab: RouteLocationNormalizedLoaded) {
  if (checkActiveTab(tab))
    return
  router.push(tab)
}

/** 关闭标签页 */
function closeTab(e: Event, tab: RouteLocationNormalizedLoaded) {
  e.stopPropagation()
  if (tabList.value.length <= 1) {
    window.$message?.warning('这已经是最后一页，不能再关闭了！')
    return
  }
  tabStore.closeCurrentTab(tab)
  // 如果关闭的是当前tab，则跳转到上一个tab
  if (checkActiveTab(tab)) {
    const currentRoute = tabList.value[Math.max(0, tabList.value.length - 1)]!
    activeTabPath.value = currentRoute.fullPath
    router.push(currentRoute)
  }
}

function handleSelectMenu(key: string) {
  const tab = rightClickTab.value || route
  const actions: Record<string, (() => void | Promise<void>)> = {
    1: () => routeStore.reloadPage(tab), // 刷新当前
    2: () => tabStore.closeCurrentTab(tab), // 关闭当前
    3: () => tabStore.closeOtherTab(tab), // 关闭其他
    4: () => tabStore.closeAllTab(tab), // 关闭所有
  }

  const action = actions[key]
  if (!action)
    throw new Error('unknown operation')

  action() // 执行对应的操作
  handleCloseSideMenu()
}

function handleCloseSideMenu() {
  rightClickTab.value = null
  showSideMenu.value = false
}

/** 右键事件 */
function handleContextMenu(e: MouseEvent, menu: RouteLocationNormalizedLoaded) {
  e.preventDefault()
  rightClickTab.value = menu
  showSideMenu.value = false

  nextTick(() => {
    showSideMenu.value = true
    sideMenuPosition.x = e.clientX
    sideMenuPosition.y = e.clientY
  })
}

/** 检查是否为当前标签页 */
function checkActiveTab(tab: RouteLocationNormalizedLoaded) {
  return activeTabPath.value === tab.fullPath
}

/** 监视路由变化 */
watch(
  route,
  (_) => {
    const currentRoute = routeStore.currentRoute
    routeStore.addCacheRoute(currentRoute)
    tabStore.addTab(currentRoute)

    activeTabPath.value = routeStore.currentRoute.fullPath
  },
  { immediate: true, deep: true },
)

defineRender(() => (
  <div class="tab-view">
    <NScrollbar xScrollable={true}>
      <VueDraggable
        class="tab-scroll"
        modelValue={tabStore.tabList}
        {...{ 'onUpdate:modelValue': (value: RouteLocationNormalizedLoaded[]) => tabStore.tabList = value }}
      >
        {
          tabList.value.map(tab => (
            <div
              key={tab.fullPath}
              onContextmenu={event => handleContextMenu(event, tab)}
            >
              <NButton
                iconPlacement="right"
                color={checkActiveTab(tab) ? themeVars.value.primaryColor : themeVars.value.cardColor}
                textColor={checkActiveTab(tab) ? themeVars.value.cardColor : themeVars.value.textColor1}
                onClick={() => handleSkipPage(tab)}
              >
                {{
                  default: () => tab.name,
                  icon: () => h(BaseIcon, { name: 'mdi:close', size: 18, onClick: (event: Event) => closeTab(event, tab) }),
                }}
              </NButton>
            </div>
          ))
        }
      </VueDraggable>
    </NScrollbar>
    <NDropdown
      trigger="click"
      placement="bottom-end"
      options={menuOptions.value}
      onSelect={handleSelectMenu}
    >
      <NButton
        quaternary
        renderIcon={() => renderIcon({ name: 'fluent-emoji-high-contrast:partying-face', size: 20 })}
      />
    </NDropdown>
    <NDropdown
      show={showSideMenu.value}
      x={sideMenuPosition.x}
      y={sideMenuPosition.y}
      placement="bottom-start"
      options={menuOptions.value}
      onSelect={handleSelectMenu}
      onClickoutside={handleCloseSideMenu}
    />
  </div>
))
</script>

<style lang="scss" scoped>
.tab-view {
  display: flex;
  column-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.tab-scroll {
  display: flex;
  gap: 6px;
  white-space: nowrap;
}
</style>
