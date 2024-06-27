import { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import appConfig from '@/config';
import { initRouteGuard } from './guard/index';

const { routeConfig, title } = appConfig;

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
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
console.log(router)
export async function mountRoute(app: App) {
  app.use(router);
  await initRouteGuard(router, title);
  await router.isReady();
}

export default router;

