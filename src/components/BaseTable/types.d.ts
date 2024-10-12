import { VNode } from 'vue';
import type { TableColumn, InternalRowData, RowData } from 'naive-ui/lib/data-table/src/interface';
import type { Type } from 'naive-ui/es/button/src/interface';

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
};

export type BaseTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string;
  children?: BaseTableColumn<T>[];
};