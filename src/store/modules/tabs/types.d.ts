import { RouteLocationNormalizedLoaded } from 'vue-router';

export type TabsState = {
  /** 标签页列表 */
  tabsList: RouteLocationNormalizedLoaded[];
}