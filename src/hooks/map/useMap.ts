import AMapLoader from '@amap/amap-jsapi-loader';

type Options = Parameters<typeof AMapLoader.load>[0];

export function useMap(options?: Options) {
  let map = shallowRef<AMap.Map>();

  function initMap() {
    const _options = Object.assign({
      key: import.meta.env.VITE_AMAP_KEY,
      version: "2.0",
    }, options);

    return new Promise((resolve, reject) => {
      AMapLoader.load(_options)
        .then((AMap) => {
          resolve(AMap);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  function createMap(element: string | HTMLDivElement, options?: AMap.MapOptions) {
    map.value = new AMap.Map(element, options);
  }

  return { map, initMap, createMap };
}