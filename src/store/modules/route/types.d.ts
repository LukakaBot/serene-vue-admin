import { RouteRecordRaw } from 'vue-router';

export type RouteState = {
  /** 是否有权限路由 */
  hasAuthRoute: boolean;
  /** 当前路由 */
  currentRoute: RouteLocationNormalizedLoaded;
  /** 路由列表 */
  routes: RouteRecordRaw[];
  /** 用户权限路由列表 */
  authRoutes: RouteRecordRaw[];
  /** 缓存路由列表 */
  cacheRoutes: RouteLocationNormalizedLoaded[];
  /** 路由是否加载完成 */
  isRouteLoaded: boolean;
};

export type RouteModule = Record<string, { default: typeof import('*.vue') }>;