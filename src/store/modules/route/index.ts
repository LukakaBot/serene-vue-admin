import { defineStore } from "pinia";
import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { RouteState } from './types';
import router from '@/router';

export const useRouteStore = defineStore({
  id: 'route-store',
  state: (): RouteState => ({
    hasAuthRoute: false,
    currentRoute: {} as RouteLocationNormalizedLoaded,
    routes: [],
    authRoutes: []
  }),
  actions: {
    /** 初始化路由 */
    async initAuthRoute(): Promise<void> {
      await this.initDynamicRoute();
    },
    /** 初始化动态路由 */
    async initDynamicRoute(): Promise<void> {
      const dynamicRoutes = [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
          redirect: '/dashboard/console',
          meta: { icon: 'ant-design:dashboard-outlined' },
          children: [
            {
              path: '/dashboard/console',
              name: '主控台',
              component: () => import('@/views/dashboard/console/index.vue'),
            },
          ]
        },
        {
          path: '/component',
          name: '组件',
          component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
          redirect: '/component/button',
          meta: { icon: 'bxs:component' },
          children: [
            {
              path: '/component/button',
              name: '按钮',
              component: () => import('@/views/component/button/index.vue'),
            },
            {
              path: '/component/form',
              name: '表单',
              component: () => import('@/views/component/form/index.vue'),
            },
            {
              path: '/component/table',
              name: '表格',
              children: [
                {
                  path: '/component/table/basic',
                  name: '基础表格',
                  component: () => import('@/views/component/table/basic/index.vue'),
                }
              ]
            },
          ]
        },
        {
          path: '/map',
          name: '地图',
          component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
          redirect: '/map/amap',
          meta: { icon: 'ep:map-location' },
          children: [
            {
              path: '/map/amap',
              name: '高德地图',
              component: () => import('@/views/map/amap/index.vue'),
            },
            {
              path: '/map/tmap',
              name: '腾讯地图',
              component: () => import('@/views/map/tmap/index.vue'),
            },
          ]
        },
      ];
      this.setRoutes(dynamicRoutes);
    },
    /** 将路由添加到路由实例中 */
    setRoutes(routes: RouteRecordRaw[]): void {
      const staticRoutes = router.options.routes;
      routes.forEach(route => router.addRoute(route));
      this.authRoutes = routes;
      this.routes = staticRoutes.concat(routes);
      this.hasAuthRoute = true;
    },
    /** 设置当前路由 */
    setCurrentRoute(): void {
      this.currentRoute = router.currentRoute.value;
    },
  }
});