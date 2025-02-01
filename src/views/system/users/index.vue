<template>
  <div class="base-container">
    <BaseSearch
      ref="baseSearchRef"
      :list="searchList"
      @update:search="handleSearch"
    />
    <BaseButtonGroup :list="btnList" @click="handleClickButtonGroup" />
    <BaseTable
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
    <AddEditModal ref="addEditModalRef" :select-row="selectRow" />
  </div>
</template>

<script setup lang="ts">
import type { TagProps, DataTableRowKey } from "naive-ui";
import { NAvatar, NTag } from "naive-ui";
import type { SearchParams } from "@/components/BaseSearch/types";
import type { UserPageContent } from "@/api/users/types";
import type { BaseButton } from "@/components/BaseButtonGroup/types";
import type {
  BaseTableColumn,
  Operations,
} from "@/components/BaseTable/types.d.ts";
import { fetchUserPage } from "@/api/users/index";
import { useLoading } from "@/hooks/useLoading";
import AddEditModal from "./components/AddEditModal.vue";

const [loading, setLoading] = useLoading();

const addEditModalRef = ref<InstanceType<typeof AddEditModal>>();

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const searchList = ref([
  { type: "text", label: "姓名", key: "name", value: "" },
  { type: "text", label: "手机号码", key: "phone", value: "" },
]);

function handleSearch(params: SearchParams) {
  Object.assign(searchParams.value, params);
  getTableData();
}

const btnList: BaseButton[] = [
  { type: "primary", text: "新增", icon: "ep:plus", auth: true },
  { type: "error", text: "批量删除", icon: "ep:delete", auth: true },
];

function handleClickButtonGroup(text: string) {
  switch (text) {
    case "新增": {
      addEditModalRef.value?.openModal();
      break;
    }
    case "批量删除": {
      handleDelete(checkedRowKeys.value);
      break;
    }
    default: {
      throw new Error("unknown operation");
    }
  }
}

function handleDelete(ids: Array<string | number>) {
  if (ids.length <= 0) {
    window.$message?.warning("请选择要删除的数据");
    return;
  }
  console.log(ids);
  checkedRowKeys.value = [];
  window.$message?.success("操作成功");
  getTableData();
}

const selectRow = ref<UserPageContent | null>(null);

const checkedRowKeys = ref<DataTableRowKey[]>([]);

const tableData = ref<UserPageContent[]>([]);

const columns: BaseTableColumn<UserPageContent>[] = [
  { type: "selection", key: "selection", fixed: "left" },
  {
    title: "id",
    align: "center",
    key: "id",
    width: 60,
    fixed: "left",
  },
  {
    title: "序号",
    align: "center",
    key: "index",
    width: 60,
    fixed: "left",
    render: (_, index) => `${index + 1}`,
  },
  {
    title: "用户名",
    key: "name",
    width: 100,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "真实姓名",
    key: "name",
    width: 100,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "手机号码",
    key: "phone",
    width: 120,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "地址",
    key: "address",
    width: 200,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "头像",
    key: "avatar",
    width: 80,
    align: "center",
    ellipsis: { tooltip: true },
    render: (row) => h(NAvatar, { size: 48, src: row.avatar + "" }),
  },
  {
    title: "角色",
    key: "roleName",
    width: 120,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "状态",
    key: "status",
    width: 80,
    align: "center",
    ellipsis: { tooltip: true },
    render: renderStatusTag,
  },
  {
    title: "创建时间",
    key: "createTime",
    width: 180,
    align: "center",
    ellipsis: { tooltip: true },
  },
  {
    title: "更新时间",
    key: "updateTime",
    width: 180,
    align: "center",
    ellipsis: { tooltip: true },
  },
];

function renderStatusTag(row: UserPageContent) {
  const tagProps: TagProps = { type: row.status ? "success" : "error" };
  const tagText = row.status ? "启用" : "禁用";
  return h(NTag, tagProps, () => tagText);
}

const operations: Operations = [
  { type: "info", text: "详情", icon: "ep:document", auth: true },
  { type: "primary", text: "编辑", icon: "ep:edit", auth: true },
  { type: "error", text: "删除", icon: "ep:delete", auth: true },
];

function handleOperate(text: string, row: UserPageContent) {
  switch (text) {
    case "详情": {
      console.log("详情");
      console.log(row);
      break;
    }
    case "编辑": {
      console.log("编辑");
      console.log(row);
      break;
    }
    case "删除": {
      console.log("删除");
      console.log(row);
      break;
    }
    default: {
      throw new Error("unknown operation");
    }
  }
}

async function getTableData() {
  try {
    setLoading(true);
    const { page, pageSize, total, data } = await fetchUserPage(
      searchParams.value
    );
    searchParams.value.page = page;
    searchParams.value.pageSize = pageSize;
    searchParams.value.total = total;
    tableData.value = data;
    console.log(data);
  } finally {
    setLoading(false);
  }
}

function handleUpdateCheckedRowKeys(rowKeys: DataTableRowKey[]) {
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
