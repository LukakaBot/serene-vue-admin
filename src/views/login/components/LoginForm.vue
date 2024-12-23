<template>
  <div>
    <div class="mb-20px text-26px font-bold text-center">账号密码登录</div>
    <n-form ref="formRef" :model="accountFormData" :rules="rules" :label-width="70" label-placement="left"
      require-mark-placement="left" size="large">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="accountFormData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="accountFormData.password" placeholder="请输入密码" type="password" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-input v-model:value="accountFormData.code" placeholder="请输入验证码" />
          <AuthCaptcha ref="authCaptchaRef" :height="40" />
        </n-space>
      </n-form-item>
    </n-form>
    <div class="mt-10px text-center">
      <n-button strong secondary :loading="loading" @click="handleSubmit">登录</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserTokenAccountParams } from '@/api/users/types';
import type { FormItemRule, FormRules } from 'naive-ui';
import { FormInst } from 'naive-ui';
import { useUserStore } from '@/store/index';
import { useLoading } from '@/hooks/useLoading';
import router from '@/router';
import AuthCaptcha from './AuthCaptcha.vue';

type AccountFormData = UserTokenAccountParams & {
  /** 验证码 */
  code: string;
};

/** 用户信息商店 */
const userStore = useUserStore();

const [loading, setLoading] = useLoading();

const authCaptchaRef = ref<InstanceType<typeof AuthCaptcha>>();

/** 表单组件实例 */
const formRef = ref<FormInst>();

/** 表单数据 */
const accountFormData = ref<AccountFormData>({} as AccountFormData);

/** 表单校验规则 */
const rules: FormRules = {
  'username': [{ required: true, message: '请输入用户名' }],
  'password': [{ required: true, message: '请输入密码' }],
  'code': [{ required: true, validator: checkCaptcha }],
};

function checkCaptcha(_rule: FormItemRule, value: string) {
  if (!value) return new Error('请输入验证码');
  return true;
}

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
    password: '123456',
    code: '',
  };
}

/** 初始化 */
function init() {
  resetFormData();
}

onMounted(() => init());
</script>

<style scoped></style>