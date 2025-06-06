function useMarker(opts: AMap.MarkerOptions) {
  const marker = new AMap.Marker(opts);
  return marker;
}

export default useMarker;