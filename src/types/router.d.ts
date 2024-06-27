declare namespace Route {
  type RouteItem = {
    path: string;
    /** 路由名称 */
    name: string;
    /** 重定向地址 */
    redirect: string;
    component: () => {};
    /** 路由元信息 */
    meta: Meta;
    /** 子路由 */
    children: RouteItem[];
  }

  type Meta = {
    title: string;
    icon: string;
    hidden: boolean;
  }
}