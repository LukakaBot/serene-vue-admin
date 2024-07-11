import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useRouteStore } from '@/store';
import appConfig from '@/config';

async function checkRouteAuth(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  const { hasAuthRoute, initAuthRoute } = useRouteStore();
  const { routeConfig } = appConfig;
  const isLogin = true;

  // 检测是否存在权限路由
  if (!hasAuthRoute) {
    // 没有权限路由，则进行登录检测
    if (!isLogin) {
      next({ path: '/login' });
      return false;
    }
    // 若当前已登录，则初始化权限路由
    await initAuthRoute();

    // 处理动态路由没有加载导致的问题，等待路由加载好了再回到之前的路由
    if (!hasAuthRoute) {
      next({ path: to.fullPath, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  } else {
    // 路由权限已经加载完成（已登录状态），根据是否是为动态模式判断是否跳转404/403
    if (to.matched.length <= 0) {
      next({ path: routeConfig.dynamic ? '/403' : '/404' });
      return false;
    }
  }

  return true;
}

export function initRouteGuard(router: Router, title: string) {
  const { setCurrentRoute } = useRouteStore();

  /** 路由前置守卫 */
  router.beforeEach(async (to, from, next) => {
    // 打开加载条
    window.$loadingBar?.start();
    // 路由前置守卫权限处理
    // 检测是否在白名单中
    const { routeWhitelist } = appConfig;
    if (routeWhitelist.includes(to.path)) next();

    // 路由权限的动态添加
    const permission = await checkRouteAuth(to, from, next);
    if (!permission) return;

    next();
  });

  /** 路由后置守卫 */
  router.afterEach(to => {
    // 设置页面标题
    useTitle(`${to.name as string} - ${title}`);
    // 记录当前路由
    setCurrentRoute();
    // 关闭加载条
    window.$loadingBar?.finish();
  });
}
