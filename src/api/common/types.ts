// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestContent<T = any> = {
  /** 页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总数 */
  total: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseContent<T = any> = {
  /** 页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总数 */
  total: number;
  /** 数据列表 */
  data: T;
};