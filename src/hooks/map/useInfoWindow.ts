function useInfoWindow(opts: AMap.InfoOptions) {
  const infoWindow = new AMap.InfoWindow(opts);
  return infoWindow;
}

export default useInfoWindow;