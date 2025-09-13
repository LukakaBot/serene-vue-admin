declare namespace AppRoute {
  interface Auth {
    id: number;
    /**
     * 权限名称
     */
    name: string;
  }

  interface Meta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    /**
     * 按钮权限列表
     */
    auths?: Auth[];
  }

  type RouteRecordRaw = import("vue-router").RouteRecordRaw & {
    /**
     * 路由名称
     */
    name: string;
    /**
     * 路由元信息
     */
    meta: Meta;
  };
}
