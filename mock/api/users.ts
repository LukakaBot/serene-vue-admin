/* eslint-disable  ts/no-explicit-any */

import type { UserTokenAccountParams } from "../../src/api/users/types";
import Mock from "mockjs";
import {
  doCustomTimes,
  resultError,
  resultPageSuccess,
  resultSuccess,
} from "../_util";

const { Random } = Mock;

const menus = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "/layouts/BaseLayout/BaseLayout.vue",
    redirect: "/dashboard/console",
    meta: { icon: "ant-design:dashboard-outlined" },
    children: [
      {
        path: "/dashboard/console",
        name: "主控台",
        component: "/views/dashboard/console/index.vue",
        meta: { icon: "mdi:console" },
      },
    ],
  },
  {
    path: "/component",
    name: "组件",
    component: "/layouts/BaseLayout/BaseLayout.vue",
    redirect: "/component/button",
    meta: { icon: "mdi:widgets-outline" },
    children: [
      {
        path: "/component/button",
        name: "按钮",
        component: "/views/component/button/index.vue",
        meta: { icon: "mdi:button-cursor" },
      },
      {
        path: "/component/form",
        name: "表单",
        component: "/views/component/form/index.vue",
        meta: { icon: "fluent:form-48-regular" },
      },
      {
        path: "/component/table",
        name: "表格",
        component: "/views/component/table/index.vue",
        meta: { icon: "mdi:table" },
      },
      {
        path: "/component/carousel",
        name: "轮播图",
        component: "/views/component/carousel/index.vue",
        meta: { icon: "lucide:images" },
      },
      {
        path: "/component/hignlight",
        name: "高亮文本",
        component: "/views/component/hignlight/index.vue",
        meta: { icon: "mdi:text" },
      },
      {
        path: "/component/descriptions",
        name: "描述列表",
        component: "/views/component/descriptions/index.vue",
        meta: { icon: "mdi:text" },
      },
    ],
  },
  {
    path: "/map",
    name: "地图",
    component: "/layouts/BaseLayout/BaseLayout.vue",
    redirect: "/map/amap",
    meta: { icon: "mdi:compass" },
    children: [
      {
        path: "/map/amap",
        name: "高德地图",
        component: "/views/map/amap/index.vue",
        meta: { icon: "mdi:navigation-variant-outline" },
      },
      {
        path: "/map/tmap",
        name: "腾讯地图",
        component: "/views/map/tmap/index.vue",
        meta: { icon: "mdi:penguin" },
      },
    ],
  },
  {
    path: "/system",
    name: "系统管理",
    component: "/layouts/BaseLayout/BaseLayout.vue",
    redirect: "/system/users",
    meta: { icon: "ant-design:setting-outlined" },
    children: [
      {
        path: "/system/users",
        name: "用户管理",
        component: "/views/system/users/index.vue",
        meta: {
          icon: "ant-design:user-outlined",
          roles: ["admin"],
          auths: [
            { id: "新增", name: "新增" },
            { id: "批量删除", name: "批量删除" },
            { id: "详情", name: "详情" },
            { id: "编辑", name: "编辑" },
            { id: "删除", name: "删除" },
          ],
        },
      },
      {
        path: "/system/roles",
        name: "角色管理",
        component: "/views/system/roles/index.vue",
        meta: { icon: "ant-design:team-outlined", roles: ["admin"] },
      },
    ],
  },
];

function userTableList(pageSize) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: "@integer(10,999999)",
      address: "@county(true)",
      name: "@cname()",
      avatar: Random.image(
        "400x400",
        Random.color(),
        Random.color(),
        Random.first(),
      ),
      phone: /^1[3-9]\d{9}$/,
      "roleName|1": Mock.Random.pick([
        "超级管理员",
        "管理员",
        "普通角色",
        "通用角色",
      ]),
      createTime: "@datetime",
      updateTime: "@datetime",
      "no|100000-10000000": 100000,
      "status|1": [true, false],
    });
  });
  return result;
}

export default [
  {
    url: "/api/user/account/token",
    method: "GET",
    response: ({ query }: { query: UserTokenAccountParams }) => {
      const { username, password } = query;
      if (username !== "admin" || password !== "123456") {
        return resultError("账号或密码错误", {
          code: 400,
        });
      }

      return resultSuccess({
        userId: Random.id(),
        userName: Random.cname(),
        token: Random.string(32),
      });
    },
  },
  {
    url: "/api/user/info",
    method: "GET",
    response: () => {
      return resultSuccess({
        userId: Random.id(),
        userName: Random.cname(),
        avatar: Random.image("100x100", "#50B347", "#FFF", "png", "avatar"),
        roles: ["admin"],
        roleName: "管理员",
        menus,
        token: Random.string(32),
        organizeId: Random.id(),
        organizeName: Random.ctitle(),
      });
    },
  },
  {
    url: "/api/user/page",
    method: "GET",
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = userTableList(100);

      return resultPageSuccess(Number(page), Number(pageSize), list);
    },
  },
];
