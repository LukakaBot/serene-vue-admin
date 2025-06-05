function useMarker(map: AMap.Map, options: AMap.MarkerOptions) {
  const marker = new AMap.Marker(options);
  map.add(marker);
}

export default useMarker;