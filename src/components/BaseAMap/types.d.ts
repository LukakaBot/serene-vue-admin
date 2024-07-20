export type MarkerItem = {
  /** 标记点id */
  id: string;
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 标注点名 */
  title?: string;
  /** 图标路径 */
  iconPath?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 标注的透明度 */
  alpha?: number;
  /** 标注图标宽度 */
  width?: number;
  /** 标注图标高度 */
  height?: number;
  /** 自定义点聚合簇效果时使用 */
  clusterId?: number;
  /** 是否参与点聚合 */
  joinCluster: boolean;
};

export type LayerItem = {
  icon: string;
  label: string;
  isActive: boolean;
};

export type ToolItem = {
  icon: string;
  label: string;
};