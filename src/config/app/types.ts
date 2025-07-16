/** 全局配置项 */
export interface GlobalConfig {
  /** 
   * 标题
   */
  title: string;
  /** 
   * 路由配置
   */
  routeConfig: {
    /** 
     * 路由模式
     */
    mode: 'hash' | 'history';
  };
  /** 
   * 路由白名单
   */
  routeWhitelist: string[];
  /** 
   * 默认路径
   */
  defaultRoutePath: string;
};