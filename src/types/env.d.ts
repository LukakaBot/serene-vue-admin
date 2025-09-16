interface ImportMetaEnv {
  /** 高德地图安全码 */
  readonly VITE_APP_MAP_SECURITY_JS_CODE: string
  /** 高德地图key */
  readonly VITE_APP_AMAP_KEY: string
  /** 存储类型 */
  readonly VITE_APP_STORAGE_TYPE: 'localStorage' | 'sessionStorage'
  /** 后端服务地址 */
  readonly VITE_SERVICE_URL: string
  /** 后端服务端口 */
  readonly VITE_SERVICE_PORT: string
  /** 后端服务前缀 */
  readonly VITE_SERVICE_PREFIX: string
  /** web socket地址 */
  readonly VITE_SOCKET_URL: string
  /** 公共基础路径 */
  readonly VITE_APP_PUBLIC_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
