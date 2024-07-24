<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" @update:page="handleUpdatePage"
    @update:page-size="handleUpdatePageSize" />
</template>

<script setup lang="ts">
import type { PaginationProps } from 'naive-ui';
import type { RowData } from 'naive-ui/lib/data-table/src/interface';
import type { BaseTableColumn, SearchParams } from './types.d.ts';

type Props = {
  /** 表格列 */
  columns: BaseTableColumn;
  /** 表格数据 */
  data: RowData[];
  /** 查询参数 */
  searchParams: SearchParams;
  /** 是否显示分页 */
  showPagination: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  columns: () => [] as unknown as BaseTableColumn,
});

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  console.log(page);
}

/** 分页大小更新事件 */
function handleUpdatePageSize(size: number) {
  console.log(size);
}

/** 分页 */
const pagination = computed((): PaginationProps => {
  const page = props.searchParams.page || 1;
  const pageSize = props.searchParams.size || 30;
  const pageCount = props.searchParams.count || 0;

  return {
    page,
    pageSize,
    pageCount,
    pageSizes: [10, 20, 30, 40, 50],
    displayOrder: ['size-picker', 'pages', 'quick-jumper'],
    showQuickJumper: true,
    showSizePicker: true,
    prefix: ({ itemCount }) => `共 ${itemCount} 项数据`
  };
});
</script>

<style scoped></style>