import type { VNodeChild } from 'vue';
import type { InternalRowData } from 'naive-ui/lib/data-table/src/interface';

export type BaseDescriptionRender = (data: BaseDescriptionData, field: string) => VNodeChild;

export type BaseDescription = {
  /** 描述文本 */
  text: string;
  /** 描述字段 */
  field: string;
  /** 渲染函数 */
  render?: BaseDescriptionRender;
};

export type BaseDescriptionData<T = InternalRowData> = T;
