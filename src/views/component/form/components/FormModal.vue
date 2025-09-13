<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { useLoading, useVisible } from '@/hooks'

interface FormData {
  name: string
  age: number | null
  phone: string
}

const bodyStyle = {
  width: '500px',
}

const [show, openModal, closeModal] = useVisible()

const [loading, setLoading] = useLoading()

const formRef = ref<FormInst>()

const formData = ref<FormData>({} as FormData)

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [
    {
      required: true,
      type: 'number',
      message: '请输入年龄',
      trigger: ['input', 'blur'],
    },
  ],
  phone: [{ required: true, message: '请输入电话号码', trigger: ['input'] }],
}

async function handleSubmit() {
  try {
    await formRef.value?.validate()
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))
    closeModal()
    window.$message?.success('提交成功')
  }
  finally {
    setLoading(false)
  }
}

function init() {
  formData.value = {
    name: '',
    age: null,
    phone: '',
  }
}

watch(
  () => show.value,
  (value) => {
    if (value)
      init()
  },
)

defineExpose({ openModal, closeModal })
</script>

<template>
  <BaseModal
    :show="show"
    title="新增表单"
    :body-style="bodyStyle"
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
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formData.name" placeholder="请输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input-number
          v-model:value="formData.age"
          class="w-full"
          placeholder="请输入年龄"
        />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="formData.phone" placeholder="请输入电话号码" />
      </n-form-item>
    </n-form>
  </BaseModal>
</template>

<style scoped></style>
