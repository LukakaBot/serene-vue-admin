import type { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
import { VNodeChild } from 'vue';

export type BaseDescription = {
  /** 描述文本 */
  text: string;
  /** 描述字段 */
  field: string;
  render?: (data: DescriptionData) => VNodeChild
};

export type DescriptionData<T = InternalRowData> = T;
