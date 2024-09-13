import type { AppConfig } from './types';

/** 应用全局配置 */
const appConfig: AppConfig = {
  title: 'naive-admin',
  routeConfig: {
    mode: "hash",
  },
  routeWhitelist: ['/login'],
  defaultRoutePath: '/dashboard/console',
};

export default appConfig;