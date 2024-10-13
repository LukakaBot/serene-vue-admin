<template>
  <div class="base-container">
    <BaseSearch ref="baseSearchRef" :list="searchList" @update:search="handleSearch" />
    <BaseButtonGroup :list="btnList" @click="handleClickButtonGroup" />
    <BaseTable :search-params="searchParams" :columns="columns" :data="tableData" :loading="loading"
      :checked-row-keys="checkedRowKeys" @update:checked-row-keys="handleUpdateCheckedRowKeys"
      @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" />
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NTag } from 'naive-ui';
import type { SearchParams } from '@/components/BaseSearch/types';
import type { BaseTableColumn } from '@/components/BaseTable/types.d.ts';
import type { UserPageContent } from '@/api/users/types';
import type { BaseButtonGroup } from '@/components/BaseButtonGroup/types';
import { fetchUserPage } from '@/api/users/index';
import { useLoading } from '@/hooks/useLoading';

const [loading, setLoading] = useLoading();

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const searchList = ref([
  { type: 'text', label: '姓名', key: 'name', value: '' },
  { type: 'text', label: '手机号码', key: 'phone', value: '' },
]);

const btnList: BaseButtonGroup[] = [
  { text: '新增', icon: 'ep:plus', type: 'primary' },
  { text: '批量删除', icon: 'ep:delete', type: 'error' },
];

const checkedRowKeys = ref<Array<string | number>>([]);

const tableData = ref<UserPageContent[]>([]);

const columns: BaseTableColumn[] = [
  { type: 'selection', key: 'selection', fixed: 'left' },
  { title: '序号', align: "center", key: "index", width: 60, fixed: "left", render: (_, index) => `${index + 1}` },
  { title: '名称', key: 'name', width: 100, align: 'center', ellipsis: { tooltip: true } },
  { title: '手机号码', key: 'phone', width: 120, align: 'center', ellipsis: { tooltip: true } },
  { title: '地址', key: 'address', width: 200, align: 'center', ellipsis: { tooltip: true } },
  { title: '头像', key: 'avatar', width: 80, align: 'center', ellipsis: { tooltip: true }, render: (row) => h(NAvatar, { size: 48, src: row.avatar + '', }) },
  { title: '角色', key: 'roleName', width: 120, align: 'center', ellipsis: { tooltip: true } },
  { title: '状态', key: 'status', width: 80, align: 'center', ellipsis: { tooltip: true }, render: row => h(NTag, { type: row.status === true ? 'success' : 'error' }, { default: () => row.status === true ? '启用' : '禁用' }) },
  { title: '创建时间', key: 'createTime', width: 180, align: 'center', ellipsis: { tooltip: true } },
];

function handleSearch(params: SearchParams) {
  Object.assign(searchParams.value, params);
  getTableData();
}

function handleClickButtonGroup(text: string) {
  switch (text) {
    case '新增': {
      console.log('新增');
      break;
    }
    case '批量删除': {
      if (checkedRowKeys.value.length <= 0) {
        window.$message?.warning('请选择要删除的数据');
        return;
      }
      handleDelete(checkedRowKeys.value);
      break;
    }
    default: {
      throw new Error('Unsupported operation');
    }
  }
}

function handleDelete(ids: Array<string | number>) {
  console.log(ids);
  checkedRowKeys.value = [];
  window.$message?.success('操作成功');
  getTableData();
}

async function getTableData() {
  try {
    setLoading(true);
    const { page, pageSize, total, data } = await fetchUserPage(searchParams.value);
    searchParams.value.page = page;
    searchParams.value.pageSize = pageSize;
    searchParams.value.total = total;
    tableData.value = data;
  } finally {
    setLoading(false);
  }
}

function handleUpdateCheckedRowKeys(rowKeys: Array<string | number>) {
  checkedRowKeys.value = rowKeys;
}

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  searchParams.value.page = page;
  getTableData();
}

/** 分页大小更新事件 */
function handleUpdatePageSize(pageSize: number) {
  searchParams.value.page = 1;
  searchParams.value.pageSize = pageSize;
  getTableData();
}

function init() {
  getTableData();
}

onMounted(() => init());
</script>

<style scoped></style>