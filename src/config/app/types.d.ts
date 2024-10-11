/** 全局配置项 */
export type GlobalConfig = {
  /** 页面标题 */
  title: string;
  /** 路由配置 */
  routeConfig: {
    /** 路由模式 */
    mode: 'hash' | 'history';
  };
  /** 路由白名单 */
  routeWhitelist: string[];
  /** 默认路由路径 */
  defaultRoutePath: string;
};