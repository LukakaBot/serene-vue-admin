<script setup lang="tsx">
import { resolveDirective, withDirectives } from "vue";
import type {
  PaginationProps,
  ButtonProps,
  DataTableRowKey,
  DataTableCreateRowKey,
} from "naive-ui";
import type { RowData } from "naive-ui/es/data-table/src/interface";
import { NDataTable, NPopover, NSpace } from "naive-ui";
import type {
  BaseTableColumns,
  BaseTableColumn,
  Operations,
  SearchParams,
} from "./types.d.ts";
import { renderIcon, renderButton } from "@/utils/tools";

type Props = {
  /** 查询参数 */
  searchParams: SearchParams;
  /** 表格列 */
  columns: BaseTableColumns<any>;
  /** 表格数据 */
  data: RowData[];
  /** 表格选中项 */
  checkedRowKeys?: DataTableRowKey[];
  /** 是否显示分页 */
  showPagination?: boolean;
  /** loading 状态 */
  loading?: boolean;
  /** 表格操作按钮 */
  operations?: Operations;
  /** 表格行的 key */
  rowKey?: DataTableCreateRowKey<any>;
  /** 表格内容的最大高度，可以是 CSS 属性值 */
  maxHeight?: number;
};

const props = withDefaults(defineProps<Props>(), {
  checkedRowKeys: () => [],
  showPagination: true,
  loading: false,
  operations: () => [],
  rowKey: () => (row: RowData) => row.id,
  maxHeight: undefined,
});

type Emits = {
  (event: "update:page", page: number): void;
  (event: "update:page-size", size: number): void;
  (event: "update:checked-row-keys", keys: DataTableRowKey[]): void;
  (event: "operate", label: string, row: any, index: number): void;
};

const emits = defineEmits<Emits>();

/** update checked-row-keys emit */
function handleUpdateCheckedRowKeys(keys: DataTableRowKey[]) {
  emits("update:checked-row-keys", keys);
}

/** update page emit */
function handleUpdatePage(page: number) {
  emits("update:page", page);
}

/** update page-size emit */
function handleUpdatePageSize(size: number) {
  emits("update:page-size", size);
}

/** 计算表格宽度 */
function calculateTableWidth(acc: number, cur: BaseTableColumn): number {
  const childrenColumnWidth = cur.children?.reduce(calculateTableWidth, 0) ?? 0;
  const columnWidth =
    !cur.children?.length && cur.width ? Number(cur.width) : 0;

  return acc + childrenColumnWidth + columnWidth;
}

/** 渲染操作列按钮 */
function renderOperationColumnButtons(
  operations: Operations,
  row: RowData,
  index: number
) {
  return operations.map((operation) => {
    const props: ButtonProps = {
      size: "small",
      type: operation?.type ?? "default",
      disabled: operation?.disabled?.(row, index) ?? false,
      renderIcon: operation.icon
        ? () => renderIcon({ name: operation.icon as string })
        : undefined,
      onClick: () => emits("operate", operation.text, row, index),
    };
    const render = renderButton(props, () => operation.text);

    if (operation?.auth) {
      const authDirective = resolveDirective("auth");
      return withDirectives(render, [[authDirective, operation.text]]);
    }

    return render;
  });
}

/** 渲染操作列 */
function renderOperationColumn(operations: Operations): BaseTableColumns {
  let newOperationColumn: BaseTableColumn = {
    title: "操作",
    align: "center",
    key: "operations",
    fixed: "right",
    width: operationColumnWidth.value,
  };
  if (!operations || operations.length <= 0) return [];

  newOperationColumn.render = (row, index) => {
    if (operations.length > 2) {
      return h(
        NPopover,
        { trigger: "click", placement: "bottom" },
        {
          trigger: () =>
            renderButton(
              {
                type: "info",
                size: "small",
                iconPlacement: "right",
                renderIcon: () => renderIcon({ name: "ep:arrow-down" }),
              },
              () => "更多"
            ),
          default: () =>
            h(NSpace, { vertical: true, justify: "center" }, () =>
              renderOperationColumnButtons(operations, row, index)
            ),
        }
      );
    }
    return h(NSpace, { justify: "center" }, () =>
      renderOperationColumnButtons(operations, row, index)
    );
  };

  return [newOperationColumn];
}

/** 表格列 */
const tableColumns = computed(() => {
  const operationColumn = renderOperationColumn(props.operations);
  return [...props.columns, ...operationColumn];
});

/** 分页 */
const paginationOptions = computed<PaginationProps>(() => {
  const page = props.searchParams.page ?? 1;
  const pageSize = props.searchParams.pageSize ?? 10;
  const itemCount = props.searchParams.total ?? 0;

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

/** 分页 */
const pagination = computed(
  () => !!props.showPagination && paginationOptions.value
);

/** 表格操作列宽度 */
const operationColumnWidth = computed(() => {
  const length = props.operations.length;
  const width =
    length < 3
      ? props.operations.reduce((acc, cur) => {
          const hanziLength = cur.text.length;
          return acc + hanziLength * 50;
        }, 0)
      : 116;

  return width;
});

/** 表格内容的横向宽度 */
const scrollX = computed(() => {
  if (props.columns.length === 0) return 0;
  const columnsWidth = props.columns.reduce(calculateTableWidth, 0);
  const fixedLeftColumnsWidth = props.columns.reduce(
    (acc, cur) =>
      acc + (cur.fixed === "left" ? (cur.width ? Number(cur.width) : 0) : 0),
    0
  );
  const fixedRightColumnsWidth = operationColumnWidth.value;

  return columnsWidth + fixedLeftColumnsWidth + fixedRightColumnsWidth;
});

console.log(props);

defineRender(() => (
  <NDataTable
    class="flex-1"
    columns={tableColumns.value}
    checked-row-keys={props.checkedRowKeys}
    data={props.data}
    scroll-x={scrollX.value}
    pagination={pagination.value}
    single-line={false}
    loading={props.loading}
    max-height={props.maxHeight}
    flex-height={true}
    remote={true}
    striped={true}
    row-key={props.rowKey}
    onUpdateCheckedRowKeys={handleUpdateCheckedRowKeys}
    onUpdatePage={handleUpdatePage}
    onUpdatePageSize={handleUpdatePageSize}
  />
));
</script>

<style scoped></style>
