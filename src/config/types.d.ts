/** 全局配置项 */
export type AppConfig = {
  /** 页面标题 */
  title: string;
  /** 路由配置 */
  routeConfig: {
    mode: 'hash' | 'history';
    dynamic: boolean;
  };
  /** 路由白名单 */
  routeWhitelist: string[];
};