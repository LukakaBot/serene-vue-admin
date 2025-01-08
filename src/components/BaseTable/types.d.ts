import type { VNode } from 'vue';
import type { Type } from 'naive-ui/es/button/src/interface';
import type { TableColumn, InternalRowData, RowData } from 'naive-ui/es/data-table/src/interface';
import type { BaseButton } from '../BaseButtonGroup/types';

export type SearchParams = {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: string | number | null | undefined;
};

export type Operations = Operation[];

export interface Operation extends BaseButton {
  disabled?: (row: RowData, index: number) => boolean;
};

export type BaseTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string;
  children?: BaseTableColumn<T>[];
};