import type { GlobalConfig } from './types';

/** 全局配置 */
const globalConfig: GlobalConfig = {
  title: 'naive-admin',
  routeConfig: {
    mode: "hash",
  },
  routeWhitelist: ['/login'],
  defaultRoutePath: '/dashboard/console',
};

export default globalConfig;