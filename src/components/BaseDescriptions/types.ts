import type { VNodeChild } from 'vue';
import type { InternalRowData } from 'naive-ui/es/data-table/src/interface';

export type DescriptionData<T = InternalRowData> = T;

export interface BaseDescription {
  /** 描述文本 */
  text: string;
  /** 描述字段 */
  field: string;
  /** 渲染函数 */
  render?: (data: DescriptionData, field: string) => VNodeChild;
};
