import type { SelectOption } from 'naive-ui';

type SearchParams = Record<string, string | null | number>;

export type SearchItem = {
  /** 搜索类型 */
  type: string;
  /** 搜索的字段名 */
  key: string;
  /** 搜索 label */
  label: string;
  /** 搜索内容 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  /** 配置选项内容 */
  options?: SelectOption;
  /** 选项 label 的字段名 */
  labelField?: string;
  /** 选项 value 的字段名 */
  valueField?: string;
};