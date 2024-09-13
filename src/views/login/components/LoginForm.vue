<template>
  <div class="absolute top-50% left-50% -translate-50% p-20px bg-#fff rounded-3">
    <div class="mb-20px text-26px font-bold text-center">账号密码登录</div>
    <n-form ref="formRef" :model="accountFormData" :rules="rules" :label-width="70" label-placement="left"
      require-mark-placement="left" size="large">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="accountFormData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="accountFormData.password" placeholder="请输入密码" type="password" />
      </n-form-item>
    </n-form>
    <div class="mt-10px text-center">
      <n-button strong secondary :loading="loading" @click="handleSubmit">登录</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserTokenAccountParams } from '@/api/users/types';
import { FormInst } from 'naive-ui';
import { useUserStore } from '@/store/index';
import { useLoading } from '@/hooks/loading';
import router from '@/router';

/** 用户信息商店 */
const userStore = useUserStore();

const [loading, setLoading] = useLoading();

/** 表单组件实例 */
const formRef = ref<FormInst>();

/** 表单数据 */
const accountFormData = ref<UserTokenAccountParams>({} as UserTokenAccountParams);

/** 表单校验规则 */
const rules = {
  'username': [{ required: true, message: '请输入用户名' }],
  'password': [{ required: true, message: '请输入密码' }],
};

/** 表单提交事件 */
async function handleSubmit() {
  try {
    await formRef.value?.validate();
    setLoading(true);
    await userStore.getUserTokenByAccount(accountFormData.value);

    window.$message?.success('登录成功');
    router.replace({ path: '/dashboard/console' });
  } finally {
    setLoading(false);
  }
}

/** 重置表单 */
function resetFormData() {
  accountFormData.value = {
    username: 'admin',
    password: '123456'
  };
}

/** 初始化 */
function init() {
  resetFormData();
}

onMounted(() => init());
</script>

<style scoped></style>