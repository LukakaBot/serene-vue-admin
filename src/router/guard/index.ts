import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useRouteStore } from '@/store';
import globalConfig from '@/config/app/index';

async function checkPermissions(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const routeStore = useRouteStore();
  const { routeWhitelist } = globalConfig;
  const token = window.$bucket?.get('token');

  // 如果目标路由在白名单内，则直接访问；但如果已登录还试图访问登录页，则重定向到之前的页面
  if (routeWhitelist.includes(to.path)) {
    if (token && to.fullPath === '/login') return next({ path: from.fullPath });
    return next();
  }

  // 如果没有 token 且目标路由不在白名单内，则重定向到登录页
  if (!token) {
    return next({ path: '/login', replace: true });
  }

  // 如果还没有初始化路由，则先进行初始化，然后重定向到目标路由
  if (!routeStore.hasAuthRoute) {
    await routeStore.initAuthRoute();
    return next({ path: to.fullPath, replace: true });
  }

  // 如果尝试访问登录页，但已登录，则重定向到之前页面
  if (to.fullPath === '/login') {
    return next({ path: from.fullPath });
  }

  // 如果没有匹配到任何路由，则跳转到403页面
  if (to.matched.length <= 0) {
    return next({ path: '/403' });
  }

  // 如果检查都通过，则继续导航到目标路由
  next();
}

/** 创建路由守卫 */
export function createRouteGuard(router: Router, title: string) {
  const routeStore = useRouteStore();

  // 路由前置守卫
  router.beforeEach(async (to, from, next) => {
    // 打开加载条
    window.$loadingBar?.start();
    // 权限校验
    await checkPermissions(to, from, next);
  });

  // 路由后置守卫
  router.afterEach(to => {
    // 设置页面标题
    useTitle(`${to.name as string} - ${title}`);
    // 记录当前路由
    routeStore.setCurrentRoute();
    // 关闭加载条
    window.$loadingBar?.finish();
  });
}
