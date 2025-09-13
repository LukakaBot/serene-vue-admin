import type {
  InternalRowData,
  RowData,
  TableColumn,
} from "naive-ui/es/data-table/src/interface";
import type { BaseButton } from "../BaseButtonGroup/types";

export interface SearchParams {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: string | number | null | undefined;
}

export type Operations = Operation[];

export interface Operation extends Omit<BaseButton, "disabled"> {
  disabled?: (row: RowData, index: number) => boolean;
}

export type BaseTableColumns<T = InternalRowData> = BaseTableColumn<T>[];

export type BaseTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string;
  children?: BaseTableColumns<T>;
};
