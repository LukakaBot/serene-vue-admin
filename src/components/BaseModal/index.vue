<script setup lang="tsx">
import type { CSSProperties, VNode } from "vue";
import { NModal, NButton } from "naive-ui";

type Props = {
  /** 是否展示 Modal */
  show: boolean;
  /** 标题 */
  title?: string;
  /** 弹窗样式 */
  bodyStyle?: CSSProperties;
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
    width: "600px",
  }),
  showFooter: true,
  showSubmit: true,
  loading: false,
  draggable: false,
});

const emits = defineEmits(["close", "closed", "submit"]);

const attrs = useAttrs();

type Slots = {
  headerExtra: (() => VNode) | undefined;
  default: (() => VNode) | undefined;
  footer: (() => VNode) | undefined;
  action: (() => VNode) | undefined;
};

const slots = defineSlots<Slots>();

const modalRef = ref<HTMLElement | null>(null);

const headerRef = ref<HTMLElement | null>(null);

let transform = { offsetX: 0, offsetY: 0 };

function handleClose() {
  emits("close");
}

function handleAfterLeave() {
  emits("closed");
}

function handleSubmit() {
  emits("submit");
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
    const moveX = Math.min(
      Math.max(offsetX + e.clientX - downX, minLeft),
      maxLeft
    );
    const moveY = Math.min(
      Math.max(offsetY + e.clientY - downY, minTop),
      maxTop
    );

    transform = { offsetX: moveX, offsetY: moveY };
    modalRef.value!.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  function onMouseup() {
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("mouseup", onMouseup);
  }

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("mouseup", onMouseup);
}

function toggleDraggable(show: boolean) {
  if (headerRef.value && modalRef.value) {
    if (show) {
      headerRef.value.addEventListener("mousedown", onMousedown);
      headerRef.value.style.cursor = "move";
    } else {
      headerRef.value.removeEventListener("mousedown", onMousedown);
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

    modalRef.value = document.querySelector(".n-modal");
    headerRef.value = document.querySelector(".n-card-header");
    toggleDraggable(draggable && show);
  });
}

watch(
  () => props.show,
  (value) => {
    if (!value) init();
  }
);

defineRender(() => (
  <NModal
    {...attrs}
    show={props.show}
    preset="card"
    title={props.title}
    bordered={false}
    style={props.bodyStyle}
    closeOnEsc={false}
    maskClosable={false}
    onClose={handleClose}
    onAfterLeave={handleAfterLeave}
  >
    {{
      "header-extra": slots.headerExtra,
      default: slots.default,
      footer: slots.footer ? (
        slots.footer
      ) : (
        <div
          class="flex justify-center items-center gap-x-20px"
          v-if={props.showFooter}
        >
          <NButton
            type="tertiary"
            strong={true}
            secondary={true}
            onClick={handleClose}
          >
            取消
          </NButton>
          <NButton
            type="primary"
            strong={true}
            loading={props.loading}
            onClick={handleSubmit}
          >
            提交
          </NButton>
        </div>
      ),
      action: slots.action,
    }}
  </NModal>
));
</script>

<style scoped></style>
