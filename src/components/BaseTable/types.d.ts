import type { TableColumn, InternalRowData } from 'naive-ui/lib/data-table/src/interface';
import { VNode } from 'vue';

export type SearchParams = {
  page?: number;
  pageSize?: number;
  total?: number;
} & Record<string, string | number | null | undefined>;

export type Operation = {
  label: string;
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  icon?: string | (() => VNode);
};

export type BaseTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string;
  children?: BaseTableColumn<T>[];
};