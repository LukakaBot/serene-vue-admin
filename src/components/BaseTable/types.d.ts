import type { VNode } from 'vue';
import type { Type } from 'naive-ui/es/button/src/interface';
import type { TableColumn, InternalRowData, RowData } from 'naive-ui/lib/data-table/src/interface';

export type SearchParams = {
  page?: number;
  pageSize?: number;
  total?: number;
} & Record<string, string | number | null | undefined>;

export type Operation = {
  label: string;
  type?: Type;
  disabled?: (row: RowData) => boolean;
  icon?: string | (() => VNode);
  auth?: boolean;
};

export type BaseTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string;
  children?: BaseTableColumn<T>[];
};