<template>
  <n-modal v-bind="attrs" :show="show" preset="card" :style="bodyStyle" :title="title" :bordered="false"
    :close-on-esc="false" :mask-closable="false" :on-close="handleClose" :on-after-leave="handleAfterLeave">
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
import { NModal } from 'naive-ui';

type Props = {
  /** 是否展示 Modal */
  show: boolean;
  /** 标题 */
  title?: string;
  /** 弹窗样式 */
  bodyStyle?: Record<string, string>;
  /** 显示底部 */
  showFooter?: boolean;
  /** 显示提交按钮 */
  showSubmit?: boolean;
  /** 提交按钮加载中 */
  loading?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: "我是标题",
  bodyStyle: () => ({
    width: '600px',
  }),
  showFooter: true,
  showSubmit: true,
  loading: false,
  draggable: false,
});

const emit = defineEmits(['close', 'closed', 'submit']);

const attrs = useAttrs();

const modalRef = ref<HTMLElement | null>(null);

const headerRef = ref<HTMLElement | null>(null);

let transform = { offsetX: 0, offsetY: 0 };

function handleClose() {
  emit('close');
}

function handleAfterLeave() {
  emit('closed');
}

function handleSubmit() {
  emit('submit');
}

function onMousedown(e: MouseEvent) {
  const downX = e.clientX;
  const downY = e.clientY;

  const { offsetX, offsetY } = transform;

  const targetRect = modalRef.value!.getBoundingClientRect();
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  // 计算边界值
  const minLeft = offsetX - targetRect.left;
  const minTop = offsetY - targetRect.top;
  const maxLeft = clientWidth - targetRect.left - targetRect.width + offsetX;
  const maxTop = clientHeight - targetRect.top - targetRect.height + offsetY;

  function onMousemove(e: MouseEvent) {
    // 计算移动位置
    const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft);
    const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop);

    transform = { offsetX: moveX, offsetY: moveY };
    modalRef.value!.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  function onMouseup() {
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('mouseup', onMouseup);
  }

  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('mouseup', onMouseup);
}

function toggleDraggable(show: boolean) {
  if (headerRef.value && modalRef.value) {
    if (show) {
      headerRef.value.addEventListener('mousedown', onMousedown);
      headerRef.value.style.cursor = 'move';
    }
    else {
      headerRef.value.removeEventListener('mousedown', onMousedown);
    }
  }
}

function resetTransformData() {
  transform = { offsetX: 0, offsetY: 0 };
}

function init() {
  resetTransformData();
  nextTick(() => {
    const { draggable, show } = props;

    modalRef.value = document.querySelector('.n-modal');
    headerRef.value = document.querySelector('.n-card-header');
    toggleDraggable(draggable && show);
  });
}

watch(
  () => props.show,
  (_) => init(),
)
</script>

<style scoped></style>
