import request from "@/utils/services";
import type { ResponseContent } from "../common/types";
import type {TableDataPageParams, TableDataPageContent } from './types.d.ts';

export function fetchTableDataPage(params: TableDataPageParams):Promise<ResponseContent<TableDataPageContent>>{
  return request({
    url: '/table/page',
    method:'GET',
    params,
  });
}