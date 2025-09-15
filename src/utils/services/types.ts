/* eslint-disable-next-line  ts/no-explicit-any */
export interface ResponseContent<T = any> {
  /**
   * 响应状态码
   */
  code: number
  /**
   * 响应状态信息
   */
  message: string
  /**
   * 响应内容
   */
  result: T
  /**
   * 响应类型
   */
  type: string
}
