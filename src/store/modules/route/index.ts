import { defineStore } from "pinia";
import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import type { RouteState } from './types';
import  { fetchUserInfo } from '@/api/users';
// import { useUserStore } from "../users";
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
    async initAuthRoute() {
      // const userStore = useUserStore();
      // console.log(1);
      // console.log(userStore.userInfo);
      // console.log(2);
      // await this.initDynamicRoute();
    },
    /** 初始化动态路由 */
    async initDynamicRoute() {
      // const dynamicRoutes = [
      //   {
      //     path: '/dashboard',
      //     name: 'Dashboard',
      //     component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
      //     redirect: '/dashboard/console',
      //     meta: { icon: 'ant-design:dashboard-outlined' },
      //     children: [
      //       {
      //         path: '/dashboard/console',
      //         name: '主控台',
      //         component: () => import('@/views/dashboard/console/index.vue'),
      //         meta: { icon: 'mdi:console' }
      //       },
      //     ]
      //   },
      //   {
      //     path: '/component',
      //     name: '组件',
      //     component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
      //     redirect: '/component/button',
      //     meta: { icon: 'bxs:component' },
      //     children: [
      //       {
      //         path: '/component/button',
      //         name: '按钮',
      //         component: () => import('@/views/component/button/index.vue'),
      //         meta: { icon: 'material-symbols:buttons-alt-outline-rounded' }
      //       },
      //       {
      //         path: '/component/form',
      //         name: '表单',
      //         component: () => import('@/views/component/form/index.vue'),
      //         meta: { icon: 'ant-design:form-outlined' }
      //       },
      //       {
      //         path: '/component/table',
      //         name: '表格',
      //         meta: { icon: 'material-symbols:table' },
      //         children: [
      //           {
      //             path: '/component/table/basic',
      //             name: '基础表格',
      //             component: () => import('@/views/component/table/basic/index.vue'),
      //           }
      //         ]
      //       },
      //     ]
      //   },
      //   {
      //     path: '/map',
      //     name: '地图',
      //     component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
      //     redirect: '/map/amap',
      //     meta: { icon: 'ep:map-location' },
      //     children: [
      //       {
      //         path: '/map/amap',
      //         name: '高德地图',
      //         component: () => import('@/views/map/amap/index.vue'),
      //         meta: { icon: 'ant-design:environment-outlined' }
      //       },
      //       {
      //         path: '/map/tmap',
      //         name: '腾讯地图',
      //         component: () => import('@/views/map/tmap/index.vue'),
      //         meta: { icon: 'ant-design:environment-outlined' }
      //       },
      //     ]
      //   },
      //   {
      //     path: '/system',
      //     name: '系统管理',
      //     component: () => import('@/layouts/BaseLayout/BaseLayout.vue'),
      //     redirect: '/system/users',
      //     meta: { icon: 'ant-design:setting-outlined' },
      //     children: [
      //       {
      //         path: '/system/users',
      //         name: '用户管理',
      //         component: () => import('@/views/system/users/index.vue'),
      //         meta: { icon: 'ant-design:user-outlined', roles: ['admin'] }
      //       },
      //       {
      //         path: '/system/roles',
      //         name: '角色管理',
      //         component: () => import('@/views/system/roles/index.vue'),
      //         meta: { icon: 'ant-design:team-outlined', roles: ['admin'] }
      //       },
      //     ]
      //   }
      // ];


      const res = await fetchUserInfo();
      console.log(res);
      
      // this.setRoutes(dynamicRoutes);
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