import { createDiscreteApi } from 'naive-ui'

/** 全局属性挂载 */
function setupNaiveDiscrete() {
  const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar']);

  // 消息提示
  window.$message = message;
  // 加载条
  window.$loadingBar = loadingBar;
}

export default setupNaiveDiscrete;