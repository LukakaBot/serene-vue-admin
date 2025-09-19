<script setup lang="ts">
import type { DataTableRowKey, TagProps } from 'naive-ui'
import type { UserPageContent } from '@/api/users/types'
import type { AppButtonProps } from '@/components/base/AppButtonGroup/types'
import type {
  SearchItem,
  SearchParams,
} from '@/components/base/AppSearch/types'
import type {
  AppTableColumn,
  Operations,
} from '@/components/base/AppTable/types'
import { NAvatar, NTag } from 'naive-ui'
import { fetchUserPage } from '@/api/users/index'
import { useLoading } from '@/hooks'
import AddEditModal from './components/AddEditModal.vue'

const [loading, setLoading] = useLoading()

const addEditModalRef = ref<InstanceType<typeof AddEditModal>>()

const checkedRowKeys = ref<DataTableRowKey[]>([])

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
})

const searchList = ref<SearchItem[]>([
  { type: 'text', label: '用户名', key: 'username', value: '' },
  { type: 'text', label: '真实姓名', key: 'nickname', value: '' },
  { type: 'text', label: '手机号码', key: 'phone', value: '' },
  { type: 'text', label: '地址', key: 'address', value: '' },
  { type: 'date', label: '创建日期', key: 'date', value: null },
])

function handleSearch(params: SearchParams) {
  Object.assign(searchParams.value, params, { page: 1 })
  getTableData()
}

const btnList: AppButtonProps[] = [
  { type: 'primary', text: '新增', icon: 'ep:plus', auth: true },
  { type: 'error', text: '批量删除', icon: 'ep:delete', auth: true },
]

function handleClickButtonGroup(text: string) {
  switch (text) {
    case '新增': {
      addEditModalRef.value?.openModal()
      break
    }
    case '批量删除': {
      handleDelete(checkedRowKeys.value)
      break
    }
    default: {
      throw new Error('unknown operation')
    }
  }
}

function handleDelete(ids: Array<string | number>) {
  if (ids.length <= 0) {
    window.$message?.warning('请选择要删除的数据')
    return
  }
  console.warn(ids)
  checkedRowKeys.value = []
  window.$message?.success('操作成功')
  getTableData()
}

const selectRow = ref<UserPageContent | null>(null)

const tableData = ref<UserPageContent[]>([])

const columns: AppTableColumn<UserPageContent>[] = [
  { type: 'selection', key: 'selection', fixed: 'left' },
  {
    title: '序号',
    align: 'center',
    key: 'index',
    width: 60,
    fixed: 'left',
    render: (_, index) => `${index + 1}`,
  },
  {
    title: '用户名',
    key: 'name',
    width: 100,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '真实姓名',
    key: 'name',
    width: 100,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '手机号码',
    key: 'phone',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '地址',
    key: 'address',
    width: 200,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    align: 'center',
    ellipsis: { tooltip: true },
    render: ({ avatar }) => h(NAvatar, { size: 48, src: `${avatar}` }),
  },
  {
    title: '角色',
    key: 'roleName',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    ellipsis: { tooltip: true },
    render: renderStatusTag,
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: 180,
    align: 'center',
    ellipsis: { tooltip: true },
  },
]

function renderStatusTag({ status }: UserPageContent) {
  const tagProps: TagProps = { type: status ? 'success' : 'error' }
  const tagText = status ? '启用' : '禁用'
  return h(NTag, tagProps, () => tagText)
}

const operations: Operations = [
  { type: 'info', text: '详情', icon: 'ep:document', auth: true },
  { type: 'primary', text: '编辑', icon: 'ep:edit', auth: true },
  { type: 'error', text: '删除', icon: 'ep:delete', auth: true },
]

function handleOperate(text: string, row: UserPageContent) {
  switch (text) {
    case '详情': {
      console.warn('详情')
      console.warn(row)
      break
    }
    case '编辑': {
      console.warn('编辑')
      console.warn(row)
      break
    }
    case '删除': {
      console.warn('删除')
      console.warn(row)
      break
    }
    default: {
      throw new Error('unknown operation')
    }
  }
}

async function getTableData() {
  try {
    setLoading(true)
    const { page, total, data } = await fetchUserPage(searchParams.value)
    searchParams.value.page = page
    searchParams.value.total = total
    tableData.value = data
  }
  finally {
    setLoading(false)
  }
}

function handleUpdateCheckedRowKeys(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys
}

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  searchParams.value.page = page
  getTableData()
}

/** 分页大小更新事件 */
function handleUpdatePageSize(pageSize: number) {
  searchParams.value.page = 1
  searchParams.value.pageSize = pageSize
  getTableData()
}

function init() {
  getTableData()
}

onMounted(() => init())
</script>

<template>
  <div class="base-container">
    <AppSearch :list="searchList" @update:search="handleSearch" />
    <AppButtonGroup :list="btnList" @click="handleClickButtonGroup" />
    <AppTable
      :search-params="searchParams"
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :operations="operations"
      :checked-row-keys="checkedRowKeys"
      @operate="handleOperate"
      @update:checked-row-keys="handleUpdateCheckedRowKeys"
      @update:page="handleUpdatePage"
      @update:page-size="handleUpdatePageSize"
    />
    <AddEditModal
      ref="addEditModalRef"
      :select-row="selectRow"
      @update:table="getTableData"
    />
  </div>
</template>

<style scoped></style>
