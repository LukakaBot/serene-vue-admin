import { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import globalConfig  from '@/config/app/index';
import { createRouteGuard } from './guard/index';

const { routeConfig, title } = globalConfig ;

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
    meta: { hidden: true },
  },
];

const router = createRouter({
  history: routeConfig.mode === 'history' ? createWebHistory() : createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export async function setupRoute(app: App) {
  app.use(router);
  createRouteGuard(router, title);
  await router.isReady();
}

export default router;

