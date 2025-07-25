export interface BatteryProps {
  quantity: number;
  /** 组件尺寸（默认：30px，支持数字/字符串） */
  size?: number | string;
  /** 是否显示电量文本（默认：true） */
  showText?: boolean;
  /** 正常电量颜色（默认：#4CAF50，支持十六进制/rgb） */
  normalColor?: string;
  /** 低电量颜色（默认：#FF5722，支持十六进制/rgb） */
  lowColor?: string;
  /** 低电量阈值（默认：20，低于此值触发低电量样式） */
  lowThreshold?: number;
}