export interface RequestContent {
  /**
   * 当前页
   */
  page?: number
  /**
   * 分页大小
   */
  pageSize?: number
  /**
   * 总条数
   */
  total?: number
}

/* eslint-disable-next-line  ts/no-explicit-any */
export interface ResponseContent<T = any> {
  /**
   * 当前页
   */
  page: number
  /**
   * 分页大小
   */
  pageSize: number
  /**
   * 总数
   */
  total: number
  /**
   * 数据
   */
  data: T
}
