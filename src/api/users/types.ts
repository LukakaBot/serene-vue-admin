import type { RouteRecordRaw } from "vue-router";
import type { RequestContent } from "../common/types";

/** [账号密码登录] - 请求参数 */
export interface UserTokenAccountParams {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
}

/** 用户信息 */
export interface UserInfo {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 凭证
   */
  token: string;
}

/** 用户详情 */
export interface UserDetails {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 角色
   */
  roles: string[];
  /**
   * 角色名
   */
  roleName: string;
  /**
   * 菜单
   */
  menus: RouteRecordRaw[];
  /**
   * 凭证
   */
  token: string;
  /**
   * 组织ID
   */
  organizeId: string;
  /**
   * 组织名
   */
  organizeName: string;
}

export type UserPageParams = RequestContent;

export interface UserPageContent {
  id: number;
  beginTime: string;
  endTime: string;
  address: string;
  name: string;
  avatar: string;
  date: string;
  time: string;
  no: number;
  status: boolean;
}
