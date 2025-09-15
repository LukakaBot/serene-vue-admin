import type { RequestContent } from '../common/types'

export type TableDataPageParams = RequestContent

export interface TableDataPageContent {
  id: number
  beginTime: string
  endTime: string
  address: string
  name: string
  avatar: string
  date: string
  time: string
  no: number
  status: boolean
}
