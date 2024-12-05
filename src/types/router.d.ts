declare namespace AppRoute {
  type Lazy<T> = () => Promise<T>;

  type RouteComponent = import('vue-router').RouteComponent;

  type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

  type Auth = {
    id: number;
    /** 权限名称 */
    name: string;
  };

  type Auths = Auth[];

  type RouteItem = {
    path: string;
    /** 路由名称 */
    name: string;
    /** 重定向地址 */
    redirect: string;
    /** 路由组件 */
    component: RawRouteComponent;
    /** 路由元信息 */
    meta: Meta;
    /** 子路由 */
    children: RouteItem[];
  };

  type Meta = {
    title: string;
    icon: string;
    hidden: boolean;
    auths: Auths;
  };
}