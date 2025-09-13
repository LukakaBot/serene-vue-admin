import type { ResponseContent } from "../common/types";
import type { TableDataPageContent, TableDataPageParams } from "./types.ts";
import request from "@/utils/services";

export function fetchTableDataPage(
  params: TableDataPageParams,
): Promise<ResponseContent<TableDataPageContent>> {
  return request({
    url: "/table/page",
    method: "GET",
    params,
  });
}
