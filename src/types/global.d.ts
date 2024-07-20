export declare global {
  interface Window {
    $message?: import('naive-ui').MessageProviderInst;
    $loadingBar?: import('naive-ui').LoadingBarProviderInst;
    _AMapSecurityConfig: {
      securityJsCode: string;
    }
    AMap?: import('@amap/amap-jsapi-types').AMap;
  }
}
