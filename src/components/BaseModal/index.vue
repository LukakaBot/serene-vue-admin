<template>
  <n-modal :show="show" preset="card" :style="bodyStyle" :title="title" :bordered="false" :close-on-esc="false"
    :mask-closable="false" :on-close="handleClose" :on-after-leave="handleAfterLeave">
    <template #header-extra>
      <slot name="header-extra"></slot>
    </template>
    <template #default>
      <slot name="default">我是内容</slot>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="flex justify-center items-center gap-x-20px" v-if="showFooter">
          <n-button @click="handleClose" strong secondary type="tertiary">取消</n-button>
          <n-button @click="handleSubmit" type="primary" v-if="showSubmit" :loading="loading">提交</n-button>
        </div>
      </slot>
    </template>
    <template #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
type Props = {
  /** 是否展示 Modal */
  show: boolean;
  /** 标题 */
  title: string;
  /** 尺寸 */
  size: 'small' | 'medium' | 'large' | 'huge';
  /** 弹窗样式 */
  bodyStyle: Record<string, string>;
  /** 显示底部 */
  showFooter: boolean;
  /** 显示提交按钮 */
  showSubmit: boolean;
  /** 提交按钮加载中 */
  loading: boolean;
};

withDefaults(defineProps<Props>(), {
  title: "我是标题",
  size: 'medium',
  bodyStyle: () => ({
    width: '700px',
  }),
  showFooter: true,
  showSubmit: true,
  loading: false,
});

const emits = defineEmits(['close', 'closed', 'submit']);

function handleClose() {
  emits('close');
}

function handleAfterLeave() {
  emits('closed');
}

function handleSubmit() {
  emits('submit');
}
</script>

<style scoped></style>
