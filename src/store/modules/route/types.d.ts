import { RouteRecordRaw } from 'vue-router';

export type RouteState = {
  /** 是否初始化了权限路由 */
  hasAuthRoute: boolean;
  /** 当前路由 */
  currentRoute: RouteLocationNormalizedLoaded;
  /** 路由列表 */
  routes: RouteRecordRaw[];
  /** 用户权限路由列表 */
  authRoutes: RouteRecordRaw[];
};