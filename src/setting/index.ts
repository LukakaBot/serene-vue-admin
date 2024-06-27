import { createDiscreteApi } from 'naive-ui'

/** 全局属性挂载 */
export function mountSetting() {
  const { message } = createDiscreteApi(['message']);

  /** 全局挂载消息提示 */
  window.$message = message;
}
