import type { Type } from 'naive-ui/es/button/src/interface';

export type BaseButtonGroup = {
  /** 按钮类型 */
  type: Type;
  /** 按钮文字 */
  text: string;
  /** 按钮图标 */
  icon?: string;
};