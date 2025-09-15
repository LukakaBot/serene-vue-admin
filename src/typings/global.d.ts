import type Bucket from '@/plugins/bucket/core/Bucket'

export declare global {
  interface Window {
    $message?: import('naive-ui').MessageProviderInst
    $loadingBar?: import('naive-ui').LoadingBarProviderInst
    /** 缓存 */
    $bucket?: Bucket
    _AMapSecurityConfig: {
      securityJsCode: string
    }
    AMap?: import('@amap/amap-jsapi-types').AMap
  }
}
