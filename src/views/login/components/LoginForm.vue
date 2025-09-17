<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type AuthCaptcha from './AuthCaptcha.vue'
import type { UserTokenAccountParams } from '@/api/users/types'
import { useLoading } from '@/hooks'
import router from '@/router'
import { useUserStore } from '@/store/index'

type AccountFormData = UserTokenAccountParams & {
  /** 验证码 */
  code: string
}

const isDev = import.meta.env.DEV

/** 用户信息商店 */
const userStore = useUserStore()

const [loading, setLoading] = useLoading()

const authCaptchaRef = ref<InstanceType<typeof AuthCaptcha>>()

/** 表单组件实例 */
const formRef = ref<FormInst>()

/** 表单数据 */
const accountFormData = ref<AccountFormData>({} as AccountFormData)

/** 表单校验规则 */
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, validator: !isDev ? checkCaptcha : undefined }],
}

function checkCaptcha(_rule: FormItemRule, value: string) {
  if (!value)
    return new Error('请输入验证码')
  if (!authCaptchaRef.value?.checkCaptcha(value))
    return new Error('验证码错误')
  return true
}

/** 表单提交事件 */
async function handleSubmit() {
  try {
    await formRef.value?.validate()
    setLoading(true)
    await userStore.getUserTokenByAccount(accountFormData.value)
    window.$message?.success('登录成功')
    router.replace({ path: '/dashboard/console' })
  }
  finally {
    setLoading(false)
  }
}

/** 重置表单 */
function resetFormData() {
  accountFormData.value = isDev
    ? {
        username: 'admin',
        password: '123456',
        code: '9527',
      }
    : {
        username: '',
        password: '',
        code: '',
      }
}

/** 初始化 */
function init() {
  resetFormData()
}

onMounted(() => init())
</script>

<template>
  <n-card>
    <div mb5 text-center text-size-2xl font-bold>
      账号密码登录
    </div>
    <n-form
      ref="formRef"
      :model="accountFormData"
      :rules="rules"
      :label-width="70"
      label-placement="left"
      require-mark-placement="left"
      size="large"
    >
      <n-form-item label="用户名" path="username">
        <n-input
          v-model:value="accountFormData.username"
          placeholder="请输入用户名"
        />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="accountFormData.password"
          placeholder="请输入密码"
          type="password"
        />
      </n-form-item>
      <n-form-item label="验证码" path="code">
        <n-space>
          <n-input
            v-model:value="accountFormData.code"
            placeholder="请输入验证码"
          />
          <AuthCaptcha ref="authCaptchaRef" :width="100" :height="40" />
        </n-space>
      </n-form-item>
    </n-form>
    <div mt3 text-center>
      <n-button strong secondary :loading="loading" @click="handleSubmit">
        登录
      </n-button>
    </div>
  </n-card>
</template>

<style scoped></style>
