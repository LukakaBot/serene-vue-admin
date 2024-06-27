// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseContent<T = any> = {
  /** 响应状态码 */
  code: number;
  /** 响应状态信息 */
  msg: string;
  /** 响应内容 */
  value: T;
};