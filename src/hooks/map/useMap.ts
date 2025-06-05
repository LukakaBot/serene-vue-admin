import AMapLoader from '@amap/amap-jsapi-loader';

type MapOptions = Parameters<typeof AMapLoader.load>[0];

function useMap(options?: MapOptions) {
  let map = shallowRef<AMap.Map>();

  const initMap = () => {
    const config = Object.assign({
      key: import.meta.env.VITE_AMAP_KEY,
      version: "2.0",
    }, options);

    return new Promise((resolve, reject) => {
      AMapLoader
        .load(config)
        .then((AMap) => {
          resolve(AMap);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  const createMap = (element: string | HTMLDivElement, options?: AMap.MapOptions) => {
    map.value = new AMap.Map(element, options);
  }

  return { map, initMap, createMap };
}


export default useMap;