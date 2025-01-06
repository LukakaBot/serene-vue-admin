import type { ButtonProps } from 'naive-ui';
import type { Type } from 'naive-ui/es/button/src/interface';

export interface BaseButtonGroup extends ButtonProps {
  /** 按钮文字 */
  text: string;
  /** 按钮图标 */
  icon?: string;
  /** 按钮权限 */
  auth?: boolean;
};

type OnClick = (label: string) => void;