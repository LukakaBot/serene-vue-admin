<template>
  <BaseModal
    :show="show"
    :title="modalTitle"
    draggable
    :loading="loading"
    @close="closeModal"
    @submit="handleSubmit"
  >
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="80"
      label-placement="left"
      require-mark-placement="left"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input v-model:value="formData.nickname" placeholder="请输入昵称" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formData.phone" placeholder="请输入手机号" />
      </n-form-item>
      <n-form-item label="角色" path="role">
        <n-select
          v-model:value="formData.role"
          :options="roleOptions"
          placeholder="请选择角色"
        />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select
          v-model:value="formData.status"
          :options="statusOptions"
          placeholder="请选择状态"
        />
      </n-form-item>
    </n-form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { UserPageContent } from "@/api/users/types";
import { useLoading } from "@/hooks/useLoading";
import { FormInst } from "naive-ui";

type AddEditUserDto = {
  username: string;
  nickname: string;
  password: string;
  phone: string;
  role?: string | null;
  status?: string | null;
};

type Props = {
  selectRow: UserPageContent | null;
};

const props = defineProps<Props>();

type Emits = {
  (event: "update:table"): void;
};

const emits = defineEmits<Emits>();

const [loading, setLoading] = useLoading();

const roleOptions = [
  { label: "管理员", value: "admin" },
  { label: "普通用户", value: "user" },
];

const statusOptions = [
  { label: "启用", value: "enabled" },
  { label: "禁用", value: "disabled" },
];

const show = ref(false);

const formRef = ref<FormInst>();

const formData = ref<AddEditUserDto>({
  username: "",
  nickname: "",
  password: "",
  phone: "",
  role: undefined,
  status: undefined,
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  nickname: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
};

async function handleSubmit() {
  try {
    await formRef.value?.validate();
    setLoading(true);
    closeModal();
    emits("update:table");
    window.$message?.success("操作成功");
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function resetFormData() {
  formData.value = {
    username: "",
    nickname: "",
    password: "",
    phone: "",
    role: undefined,
    status: undefined,
  };
}

function init() {
  resetFormData();
  if (isEdit.value) {
    Object.assign(formData.value, props.selectRow);
  }
}

function openModal() {
  show.value = true;
}

function closeModal() {
  show.value = false;
}

const isEdit = computed(() => !!props.selectRow);

const modalTitle = computed(() => `${isEdit.value ? "编辑" : "新增"}用户`);

watch(show, (value) => {
  if (value) {
    init();
  }
});

defineExpose({ openModal, closeModal });
</script>

<style scoped></style>
