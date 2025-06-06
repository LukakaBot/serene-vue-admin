function usePolyline(opts: AMap.PolylineOptions) {
  const polyline = new AMap.Polyline(opts);
  return polyline;
}

export default usePolyline