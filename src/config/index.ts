import type { AppConfig } from './types';

/** 全局配置项 */
const appConfig: AppConfig = {
  title: 'naive-admin',
  routeConfig: {
    mode: "hash",
    dynamic: true,
  },
  routeWhitelist: ['/login', '/middleware'],
};

export default appConfig;