import type { TableColumn, InternalRowData } from 'naive-ui/lib/data-table/src/interface';

export type SearchParams = {
  page?: number;
  size?: number;
  count?: number;
} & Record<string, string | number | null | undefined>;

export type BaseTableColumn<T = InternalRowData> = TableColumn & {
  key: string;
};