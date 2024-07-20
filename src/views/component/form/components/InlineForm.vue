<template>
  <div>
    <FormTitle title="行内表单" />
    <n-radio-group v-model:value="size" name="left-size" style="margin-bottom: 12px">
      <n-radio-button value="small"> 小 </n-radio-button>
      <n-radio-button value="medium"> 中 </n-radio-button>
      <n-radio-button value="large"> 大 </n-radio-button>
    </n-radio-group>
    <n-form ref="formRef" inline :label-width="80" :model="formData" :rules="rules" :size="size">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formData.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input-number v-model:value="formData.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="formData.phone" placeholder="电话号码" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" :loading="loading" @click="handleValidateClick">
          验证
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { NForm } from 'naive-ui';
import { useLoading } from '@/hooks/loading/index';

type FormData = {
  name: string;
  age: number;
  phone: string;
};

const formRef = ref<InstanceType<typeof NForm>>() // 表单实例

const { loading, setLoading } = useLoading();

const size = ref<'small' | 'medium' | 'large'>('medium');

const formData = ref<FormData>({} as FormData);

const rules = {
  name: { required: true, message: '请输入姓名', trigger: 'blur' },
  age: { required: true, message: '请输入年龄', trigger: ['input', 'blur'] },
  phone: { required: true, message: '请输入电话号码', trigger: ['input'] }
}

async function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  try {
    setLoading(true);
    await formRef.value?.validate();
    window.$message?.success('验证成功');
  } finally {
    setLoading(false);
  }
}
</script>

<style scoped></style>