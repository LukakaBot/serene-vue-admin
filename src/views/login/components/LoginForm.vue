<template>
  <div class="absolute top-50% left-50% -translate-50% p-20px bg-#fff rounded-3">
    <div class="mb-20px text-26px font-bold text-center">账号密码登录</div>
    <n-form ref="formRef" :model="formData" :rules="rules" :label-width="70" label-placement="left"
      require-mark-placement="left" size="large">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formData.password" placeholder="请输入密码" type="password" />
      </n-form-item>
    </n-form>
    <div class="mt-10px text-center">
      <n-button strong secondary @click="handleSubmit">登录</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui';
import router from '@/router';

type LoginParams = {
  username: string;
  password: string;
};

/** 表单组件实例 */
const formRef = ref<FormInst>();

/** 表单数据 */
const formData = ref<LoginParams>({} as LoginParams);

/** 表单校验规则 */
const rules = {
  'username': [{ required: true, message: '请输入用户名' }],
  'password': [{ required: true, message: '请输入密码' }],
};

/** 表单提交事件 */
async function handleSubmit() {
  await formRef.value?.validate();

  if (formData.value.username === 'admin' && formData.value.password === '123456') {
    window.$message?.success('登录成功', {
      onAfterLeave: () => {
        router.replace({ path: '/dashboard/console' })
      }
    });
  } else {
    window.$message?.error('用户名或密码错误');
  }
}

/** 重置表单 */
function resetFormData() {
  formData.value = {
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