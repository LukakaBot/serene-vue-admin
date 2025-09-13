<script setup lang="tsx">
import type { BaseModalProps, BaseModalSlots } from './types'
import { NButton, NFlex, NModal } from 'naive-ui'

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: '我是标题',
  bodyStyle: () => ({
    width: '400px',
  }),
  showFooter: true,
  showSubmit: true,
  loading: false,
  draggable: false,
})

const slots = defineSlots<BaseModalSlots>()

const attrs = useAttrs()

const modalRef = ref<HTMLElement | null>(null)

const headerRef = ref<HTMLElement | null>(null)

let transform = { offsetX: 0, offsetY: 0 }

function onMousedown(e: MouseEvent) {
  const downX = e.clientX
  const downY = e.clientY

  const { offsetX, offsetY } = transform

  const targetRect = modalRef.value!.getBoundingClientRect()
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight

  // 计算边界值
  const minLeft = offsetX - targetRect.left
  const minTop = offsetY - targetRect.top
  const maxLeft = clientWidth - targetRect.left - targetRect.width + offsetX
  const maxTop = clientHeight - targetRect.top - targetRect.height + offsetY

  const onMousemove = (e: MouseEvent) => {
    // 计算移动位置
    const moveX = Math.min(
      Math.max(offsetX + e.clientX - downX, minLeft),
      maxLeft,
    )
    const moveY = Math.min(
      Math.max(offsetY + e.clientY - downY, minTop),
      maxTop,
    )

    transform = { offsetX: moveX, offsetY: moveY }
    modalRef.value!.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const onMouseup = () => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

function toggleDraggable(show: boolean) {
  if (headerRef.value && modalRef.value) {
    if (show) {
      headerRef.value.addEventListener('mousedown', onMousedown)
      headerRef.value.style.cursor = 'move'
    }
    else {
      headerRef.value.removeEventListener('mousedown', onMousedown)
    }
  }
}

function resetTransformData() {
  transform = { offsetX: 0, offsetY: 0 }
}

function handleClose() {
  props.onClose?.()
}

function handleAfterLeave() {
  props.onClosed?.()
}

function handleSubmit() {
  props.onSubmit?.()
}

function init() {
  resetTransformData()
  nextTick(() => {
    const { draggable, show } = props
    modalRef.value = document.querySelector('.n-modal')
    headerRef.value = document.querySelector('.n-card-header')
    toggleDraggable(draggable && show)
  })
}

watch(
  () => props.show,
  (value) => {
    if (value)
      init()
  },
)

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
      'header-extra': slots.headerExtra,
      'default': slots.default,
      'footer': slots.footer
        ? slots.footer
        : () => (
            <NFlex justify="center" align="center">
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
            </NFlex>
          ),
      'action': slots.action,
    }}
  </NModal>
))
</script>

<style scoped></style>
