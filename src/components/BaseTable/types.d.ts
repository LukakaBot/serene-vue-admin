import type { TableColumn, InternalRowData } from 'naive-ui/lib/data-table/src/interface';

export type SearchParams = {
  page?: number;
  pageSize?: number;
  total?: number;
} & Record<string, string | number | null | undefined>;

export type BaseTableColumn<T = InternalRowData> = TableColumn & {
  key: string;
};