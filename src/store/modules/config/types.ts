import type { ThemeState } from '../theme/types'

export interface ConfigState {
  /** ----- 水印 ----- */
  /**
   * 是否显示水印
   */
  showWatermark: boolean
  /**
   * 水印内容
   */
  watermarkContent: string
  /**
   * 暗黑模式
   */
  isDarkMode: boolean
  /**
   * 主题
   */
  theme: ThemeState
}
