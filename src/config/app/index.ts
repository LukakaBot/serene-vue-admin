import type { GlobalConfig } from './types'

/** 全局配置 */
const globalConfig: GlobalConfig = {
  title: 'serene-admin',
  routeConfig: {
    mode: 'hash',
  },
  routeWhitelist: ['/login'],
  defaultRoutePath: '/dashboard/console',
}

export default globalConfig
