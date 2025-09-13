import type { CSSProperties } from "vue";

export interface BaseTitleProps {
  /**
   * 标题
   */
  title: string;
  /**
   * 标题样式
   */
  titleStyle?: CSSProperties;
  /**
   * 是否显示 tag
   */
  showTag?: boolean;
  /**
   * tag 方向
   */
  tagDirection?: "left" | "bottom";
}
