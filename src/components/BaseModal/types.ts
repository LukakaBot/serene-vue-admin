import type { CSSProperties, VNode } from 'vue'

export interface BaseModalProps {
  /**
   * 是否展示 Modal
   */
  show: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * Modal 样式
   */
  bodyStyle?: CSSProperties
  /**
   * 显示底部
   */
  showFooter?: boolean
  /**
   * 显示提交按钮
   */
  showSubmit?: boolean
  /**
   * 提交按钮加载中
   */
  loading?: boolean
  /**
   * 是否可拖拽
   */
  draggable?: boolean
  /**
   * 关闭时触发
   */
  onClose?: () => void
  /**
   * 关闭完成时触发
   */
  onClosed?: () => void
  /**
   * 提交时触发
   */
  onSubmit?: () => void
}

export interface BaseModalSlots {
  headerExtra?: () => VNode
  default?: () => VNode
  footer?: () => VNode
  action?: () => VNode
}
