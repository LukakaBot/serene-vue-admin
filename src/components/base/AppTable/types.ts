/* eslint-disable ts/no-explicit-any */

import type { DataTableCreateRowKey, DataTableRowKey } from 'naive-ui'
import type {
  InternalRowData,
  RowData,
  TableColumn,
} from 'naive-ui/es/data-table/src/interface'
import type { AppButtonProps } from '../AppButtonGroup/types'

export interface SearchParams {
  page?: number
  pageSize?: number
  total?: number
  [key: string]: string | number | null | undefined
}

export type Operations = Operation[]

export interface Operation extends Omit<AppButtonProps, 'disabled'> {
  disabled?: (row: RowData, index: number) => boolean
}

export type AppTableColumns<T = InternalRowData> = AppTableColumn<T>[]

export type AppTableColumn<T = InternalRowData> = TableColumn<T> & {
  key: string
  children?: AppTableColumns<T>
}

export interface AppTableProps {
  /** 查询参数 */
  'searchParams': SearchParams
  /** 表格列 */
  'columns': AppTableColumns<any>
  /** 表格数据 */
  'data': RowData[]
  /** 表格选中项 */
  'checkedRowKeys'?: DataTableRowKey[]
  /** 是否显示分页 */
  'showPagination'?: boolean
  /** loading 状态 */
  'loading'?: boolean
  /** 表格操作按钮 */
  'operations'?: Operations
  /** 表格行的 key */
  'rowKey'?: DataTableCreateRowKey<any>
  /** 表格内容的最大高度，可以是 CSS 属性值 */
  'maxHeight'?: number
  /** 分页页码变化时触发 */
  'onUpdate:page'?: (page: number) => void
  'onUpdatePage'?: (page: number) => void
  /** 分页每页数量变化时触发 */
  'onUpdate:pageSize'?: (size: number) => void
  'onUpdatePageSize'?: (size: number) => void
  /** 表格选中项变化时触发 */
  'onUpdate:checkedRowKeys'?: (keys: DataTableRowKey[]) => void
  'onUpdateCheckedRowKeys'?: (keys: DataTableRowKey[]) => void
  /** 表格操作按钮点击时触发 */
  'onAction'?: (label: string, row: RowData, index: number) => void
}
