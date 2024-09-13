import request from "@/utils/services";
import type { UserTokenAccountParams, UserInfo, UserDetails } from "./types";

/** 账号密码登录 */
export function fetchUserTokenByAccount(params: UserTokenAccountParams): Promise<UserInfo> {
  return request({
    url: '/user/account/token',
    method: 'GET',
    params
  });
}

/** 获取用户信息 */
export function fetchUserInfo(): Promise<UserDetails> {
  return request({
    url: '/user/info',
    method: 'GET',
  });
}