import { defineStore } from "pinia";
import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { RouteState } from './types';
import router from '@/router';

const useRouteStore = defineStore('route-store', {
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
          // meta: { icon: 'tabler:dashboard' },
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
              path: '/component/table',
              name: '表格',
              component: () => import('@/views/component/table/index.vue'),
            },
          ]
        },
        {
          path: '/form',
          name: '表单',
          component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
          redirect: '/form/modalForm',
          meta: { icon: 'ep:list' },
          children: [
            {
              path: '/form/modalForm',
              name: '弹窗表单',
              component: () => import('@/views/form/modalForm/index.vue'),
            },
          ]
        }
      ];
      this.handleAddDynamicRoute(dynamicRoutes);
    },
    /** 将路由数组添加到路由实例中 */
    handleAddDynamicRoute(routes: RouteRecordRaw[]): void {
      routes.forEach(route => router.addRoute(route));
      console.log(routes);

      this.authRoutes = routes;
      this.hasAuthRoute = true;
      this.routes = [...router.options.routes, ...routes];
    },
    /** 设置当前路由 */
    setCurrentRoute(): void {
      this.currentRoute = router.currentRoute.value;
    },
  }
})

export default useRouteStore;