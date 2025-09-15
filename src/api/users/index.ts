import type { ResponseContent } from '../common/types'
import type {
  UserDetails,
  UserInfo,
  UserPageContent,
  UserPageParams,
  UserTokenAccountParams,
} from './types'
import request from '@/utils/services'

/** 账号密码登录 */
export function fetchUserTokenByAccount(
  params: UserTokenAccountParams,
): Promise<UserInfo> {
  return request({
    url: '/user/account/token',
    method: 'GET',
    params,
  })
}

/** 获取用户信息 */
export function fetchUserInfo(): Promise<UserDetails> {
  return request({
    url: '/user/info',
    method: 'GET',
  })
}

/** 获取用户列表 */
export function fetchUserPage(
  params: UserPageParams,
): Promise<ResponseContent<UserPageContent[]>> {
  return request({
    url: '/user/page',
    method: 'GET',
    params,
  })
}
