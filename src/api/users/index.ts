import request from "@/utils/services";
import type { UserInfo } from "./types";

export function fetchUserInfo(): Promise<UserInfo> {
  return request({
    url: '/user/info',
    method: 'GET',
  });
}