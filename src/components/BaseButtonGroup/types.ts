import type { ButtonProps } from 'naive-ui'

export interface BaseButton extends Omit<ButtonProps, 'text'> {
  /** 按钮文字 */
  text: string
  /** 按钮图标 */
  icon?: string
  /** 按钮权限 */
  auth?: boolean
}
