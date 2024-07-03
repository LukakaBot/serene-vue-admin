<template>
  <BaseModal :show="show" title="新增表单" :body-style="bodyStyle" @close="closeModal">
    <n-form ref="formRef" inline :label-width="80" :model="formData" :rules="rules">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formData.username" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input-number v-model:value="formData.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="formData.phone" placeholder="电话号码" />
      </n-form-item>
    </n-form>
  </BaseModal>
</template>

<script setup lang="ts">
import { useShow } from "@/hooks/show";

type FormData = {
  username: string;
  age: number | null;
  phone: string;
}

const { show, openModal, closeModal } = useShow();

const bodyStyle = {
  width: '500px',
};

const formData = ref<FormData>({} as FormData);

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: ['input', 'blur'] }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: ['input'] }
  ]
}

function init() {
  formData.value = {
    username: '',
    age: null,
    phone: '',
  };
}

watch(
  () => show.value,
  (value) => {
    if (value) init();
  }
)

defineExpose({ openModal, closeModal });
</script>

<style scoped></style>
