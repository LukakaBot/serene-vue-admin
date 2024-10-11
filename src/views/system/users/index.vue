<template>
  <div class="base-container">
    <BaseSearch ref="baseSearchRef" :list="searchList" @update:search="handleSearch" />
    <BaseTable :search-params="searchParams" :columns="columns" :data="tableData" :loading="loading"
      @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" />
  </div>
</template>

<script setup lang="ts">
// import { NAvatar, NTag } from 'naive-ui';
import type { SearchParams } from '@/components/BaseSearch/types';
import type { BaseTableColumn } from '@/components/BaseTable/types.d.ts';
import type { UserPageContent } from '@/api/users/types';
import { fetchUserPage } from '@/api/users/index';
import { useLoading } from '@/hooks/useLoading';

const [loading, setLoading] = useLoading();

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const searchList = ref([
  { type: 'text', label: '公司名称', key: 'companyName', value: '' },
  { type: 'text', label: '姓名', key: 'name', value: '' },
]);

const tableData = ref<UserPageContent[]>([]);

const columns: BaseTableColumn[] = [
  // { title: 'id', align: "center", key: "index", width: 60, fixed: "left", render: (_, index) => `${index + 1}` },
  // {
  //   title: '编号', key: 'no', width: 100, align: 'center', ellipsis: { tooltip: true }, children: [
  //     {
  //       width: 80,
  //       title: 'Physics Attack',
  //       key: 'physicsAttack'
  //     },
  //     {
  //       width: 80,
  //       title: 'Magic Attack',
  //       key: 'magicAttack'
  //     }
  //   ]
  // },
  // { title: '名称', key: 'name', width: 100, align: 'center', ellipsis: { tooltip: true } },
  // { title: '头像', key: 'avatar', width: 80, align: 'center', ellipsis: { tooltip: true }, render: (row) => h(NAvatar, { size: 48, src: row.avatar + '', }) },
  // { title: '地址', key: 'address', width: 200, align: 'center', ellipsis: { tooltip: true } },
  // { title: '开始日期', key: 'beginTime', width: 180, align: 'center', ellipsis: { tooltip: true } },
  // { title: '结束日期', key: 'endTime', width: 180, align: 'center', ellipsis: { tooltip: true } },
  // { title: '状态', key: 'status', width: 100, align: 'center', ellipsis: { tooltip: true }, render: row => h(NTag, { type: row.status === true ? 'success' : 'error' }, { default: () => row.status === true ? '正常' : '禁用' }) },
  // { title: '创建时间', key: 'date', width: 120, align: 'center', ellipsis: { tooltip: true } },
  // { title: '停留时间', key: 'time', width: 100, align: 'center', ellipsis: { tooltip: true } },
];

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

function handleSearch(params: SearchParams) {
  console.log(params);
}

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  console.log(page);
  searchParams.value.page = page;
  getTableData();
}

/** 分页大小更新事件 */
function handleUpdatePageSize(pageSize: number) {
  console.log(pageSize);
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