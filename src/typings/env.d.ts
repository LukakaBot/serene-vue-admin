
interface ImportMetaEnv {
  /** 高德地图安全码 */
  readonly VITE_MAP_SECURITY_JS_CODE: string;
  /** 高德地图key */
  readonly VITE_MAP_KEY: string;
  /** 存储类型 */
  readonly VITE_STORAGE_TYPE: 'localStorage' | 'sessionStorage';
  /** 后端服务地址 */
  readonly VITE_SERVICE_URL: string;
  /** 后端服务端口 */
  readonly VITE_SERVICE_PORT: string;
  /** 后端服务前缀 */
  readonly VITE_SERVICE_PREFIX: string;
  /** 公共基础路径 */
  readonly VITE_PUBLIC_PATH: string;
  /** socket地址 */
  readonly VITE_SOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}