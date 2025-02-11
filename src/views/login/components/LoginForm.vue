<script setup lang="tsx">
import type { UserTokenAccountParams } from "@/api/users/types";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useUserStore } from "@/store/index";
import { useLoading } from "@/hooks/useLoading";
import router from "@/router";
import AuthCaptcha from "./AuthCaptcha.vue";

type AccountFormData = UserTokenAccountParams & {
  /** 验证码 */
  code: string;
};

const isDev = import.meta.env.DEV;

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
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  code: [{ required: true, validator: !isDev ? checkCaptcha : undefined }],
};

function checkCaptcha(_rule: FormItemRule, value: string) {
  if (!value) return new Error("请输入验证码");
  if (!authCaptchaRef.value?.checkCaptcha(value))
    return new Error("验证码错误");
  return true;
}

/** 表单提交事件 */
async function handleSubmit() {
  try {
    await formRef.value?.validate();
    setLoading(true);
    await userStore.getUserTokenByAccount(accountFormData.value);
    window.$message?.success("登录成功");
    router.replace({ path: "/dashboard/console" });
  } finally {
    setLoading(false);
  }
}

/** 重置表单 */
function resetFormData() {
  accountFormData.value = isDev
    ? {
        username: "admin",
        password: "123456",
        code: "9527",
      }
    : {
        username: "",
        password: "",
        code: "",
      };
}

/** 初始化 */
function init() {
  resetFormData();
}

onMounted(() => init());

defineRender(() => (
  <n-card>
    <div class="mb-20px text-26px font-bold text-center">账号密码登录</div>
    <n-form
      ref={formRef}
      model={accountFormData.value}
      rules={rules}
      label-width={70}
      label-placement="left"
      require-mark-placement="left"
      size="large"
    >
      <n-form-item label="用户名" path="username">
        <n-input
          v-model:value={accountFormData.value.username}
          placeholder="请输入用户名"
        />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value={accountFormData.value.password}
          placeholder="请输入密码"
          type="password"
        />
      </n-form-item>
      <n-form-item label="验证码" path="code">
        <n-space>
          <n-input
            v-model:value={accountFormData.value.code}
            placeholder="请输入验证码"
          />
          <AuthCaptcha ref={authCaptchaRef} width={100} height={40} />
        </n-space>
      </n-form-item>
    </n-form>
    <div class="mt-10px text-center">
      <n-button strong secondary loading={loading.value} onClick={handleSubmit}>
        登录
      </n-button>
    </div>
  </n-card>
));
</script>

<style scoped></style>
