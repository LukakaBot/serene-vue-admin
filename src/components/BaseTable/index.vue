<template>
  <n-data-table class="flex-1" :columns="columns" :data="data" :scroll-x="scrollX" :pagination="pagination"
    :bordered="false" :single-line="false" :loading="loading" flex-height remote @update:page="handleUpdatePage"
    @update:page-size="handleUpdatePageSize" />
</template>

<script setup lang="ts">
import type { PaginationProps } from 'naive-ui';
import type { RowData } from 'naive-ui/lib/data-table/src/interface';
import type { Operation, BaseTableColumn, SearchParams } from './types.d.ts';

type Props = {
  /** 查询参数 */
  searchParams: SearchParams;
  /** 表格列 */
  columns: BaseTableColumn[];
  /** 表格数据 */
  data: RowData[];
  /** 是否显示分页 */
  showPagination?: boolean;
  /** 是否显示 loading 状态 */
  loading?: boolean;
  /** 表格操作按钮 */
  operation?: Operation[];
};

type Emits = {
  (e: 'update:page', page: number): void;
  (e: 'update:page-size', size: number): void;
};

const props = withDefaults(defineProps<Props>(), {
  showPagination: true,
  loading: false,
  operation: () => [],
});

const emit = defineEmits<Emits>();

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  emit('update:page', page);
}

/** 分页大小更新事件 */
function handleUpdatePageSize(size: number) {
  emit('update:page-size', size);
}

/** 分页 */
const paginationOptions = computed((): PaginationProps => {
  const page = props.searchParams.page || 1;
  const pageSize = props.searchParams.pageSize || 10;
  const itemCount = props.searchParams.total || 0;

  return {
    page,
    pageSize,
    itemCount,
    pageSizes: [10, 20, 30, 40, 50],
    showQuickJumper: true,
    showSizePicker: true,
    prefix: ({ itemCount }) => `共 ${itemCount} 条`,
  };
});

/** 渲染分页 */
const pagination = computed(() => props.showPagination ? paginationOptions.value : false);

/** 计算表格宽度 */
function calculateTableWidth(acc: number, cur: BaseTableColumn): number {
  if (cur.children) {
    // return acc + calculateTableWidth(acc, cur.children);
    return cur.children.reduce(calculateTableWidth, 0);
  }
  return acc + (cur.width ? Number(cur.width) : 0);
}

/** 表格操作列宽度 */
const operationColumnWidth = computed(() => {
  const length = props.operation.length;
  const width = length < 3
    ? props.operation.reduce((acc, cur) => {
      const hanziLength = cur.label.length;
      return acc + hanziLength * 50;
    }, 0)
    : 116;

  return width;
});

/** 表格内容的横向宽度 */
const scrollX = computed(() => {
  if (props.columns.length === 0) return 0;
  const columnsWidth = props.columns.reduce(calculateTableWidth, 0);
  const fixedLeftColumnsWidth = props.columns.reduce((acc, cur) => acc + (cur.fixed === 'left' ? (cur.width ? Number(cur.width) : 0) : 0), 0);
  const fixedRightColumnsWidth = operationColumnWidth.value;

  return columnsWidth + fixedLeftColumnsWidth + fixedRightColumnsWidth;
});
</script>

<style scoped></style>