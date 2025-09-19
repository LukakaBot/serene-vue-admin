<script setup lang="ts">
import type { DataTableRowKey } from 'naive-ui'
import type { InternalRowData } from 'naive-ui/es/data-table/src/interface'
import type { AppTableColumn } from '@/components/base/AppTable/types'
import { NAvatar, NTag } from 'naive-ui'
import { fetchTableDataPage } from '@/api/table/index.ts'
import { useLoading } from '@/hooks'

const [loading, setLoading] = useLoading()

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
})

const checkedRowKeys = ref<DataTableRowKey[]>([])

/* eslint-disable-next-line  ts/no-explicit-any */
const tableData = ref<any>([])

const columns: AppTableColumn[] = [
  { type: 'selection', key: 'selection', width: 60, fixed: 'left' },
  {
    title: 'id',
    align: 'center',
    key: 'index',
    width: 60,
    fixed: 'left',
    render: (_, index) => `${index + 1}`,
  },
  {
    title: '编号',
    key: 'no',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '名称',
    key: 'name',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '头像',
    key: 'avatar',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    render: renderAvatar,
  },
  {
    title: '地址',
    key: 'address',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '开始日期',
    key: 'beginTime',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    render: renderStatusTag,
  },
  {
    title: '创建时间',
    key: 'date',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '停留时间',
    key: 'time',
    width: 80,
    align: 'center',
    ellipsis: { tooltip: true },
  },
]

function renderAvatar(row: InternalRowData) {
  return h(NAvatar, { size: 48, src: `${row.avatar}` })
}

function renderStatusTag(row: InternalRowData) {
  const status = row.status
  return h(
    NTag,
    { type: status ? 'success' : 'error' },
    { default: () => (status ? '启用' : '禁用') },
  )
}

function handleUpdatePage(page: number) {
  searchParams.value.page = page
  getTableData()
}

function handleUpdatePageSize(size: number) {
  searchParams.value.pageSize = size
  getTableData()
}

function handleCheckedRowKeys(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys
}

async function getTableData() {
  try {
    setLoading(true)
    const { page, pageSize, total, data } = await fetchTableDataPage(
      searchParams.value,
    )
    searchParams.value.page = page!
    searchParams.value.pageSize = pageSize!
    searchParams.value.total = total!
    tableData.value = data
  }
  finally {
    setLoading(false)
  }
}

function init() {
  getTableData()
}

onMounted(() => init())
</script>

<template>
  <AppTable
    :search-params="searchParams"
    :columns="columns"
    :data="tableData"
    :loading="loading"
    :checked-row-keys="checkedRowKeys"
    @update:page="handleUpdatePage"
    @update:size="handleUpdatePageSize"
    @update:checked-row-keys="handleCheckedRowKeys"
  />
</template>

<style scoped></style>
