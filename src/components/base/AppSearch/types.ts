import type { SelectGroupOption, SelectOption } from 'naive-ui'
import type { IsDateDisabled } from 'naive-ui/es/date-picker/src/interface'

export type SearchParams = Record<string, string | null | number>

export type SearchType = 'select' | 'date' | 'daterange' | 'text'

export interface SearchItem {
  /** 搜索类型 */
  type: SearchType
  /** 搜索的字段名 */
  key: string
  /** 搜索名称 */
  label: string
  /* eslint-disable  ts/no-explicit-any */
  /** 搜索内容 */
  value: any
  /** 配置选项内容 */
  options?: (SelectOption | SelectGroupOption)[]
  /** 选项 label 的字段名 */
  labelField?: string
  /** 选项 value 的字段名 */
  valueField?: string
  /** 是否可以过滤 */
  filterable?: boolean
  /** 是否启用虚拟滚动 */
  virtualScroll?: boolean
  /** 日期格式 */
  valueFormat?: string
  /** 日期禁用的校验函数 */
  dateDisabled?: IsDateDisabled
}

export interface AppSearchProps {
  'list': SearchItem[]
  /** 搜索时触发 */
  'onUpdate:search'?: (params: SearchParams) => void
  'onUpdateSearch'?: (params: SearchParams) => void
}
