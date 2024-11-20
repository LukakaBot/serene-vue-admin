<template>
  <div id="container" class="relative" :class="hiddenMapLogoClassName" :style="renderMapStyle"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";

type Props = {
  /** 宽度 */
  width?: string;
  /** 高度 */
  height?: string;
  /** 中心纬度 */
  latitude?: number;
  /** 中心经度 */
  longitude?: number;
  /** 地图缩放层级 */
  zoom?: number;
  /** 是否显示高德地图logo */
  showLogo?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  latitude: 39.90923,
  longitude: 116.397428,
  zoom: 13,
  showLogo: true,
});

const emits = defineEmits(['complete', 'locate']);

/** 地图实例 */
let map: AMap.Map | null = null;

function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_MAP_SECURITY_JS_CODE,
  };

  const options = {
    key: import.meta.env.VITE_MAP_KEY,
    version: "2.0",
  };

  AMapLoader.load(options)
    .then((AMap) => {
      window.AMap = AMap;
      map = new AMap.Map('container', {
        center: [props.longitude, props.latitude],
        zoom: props.zoom,
      });
      map?.on('complete', function () {
        emits('complete', map);
      });
    }).catch((err) => {
      console.log(err);
    });
}

function init() {
  initMap();
}

const renderMapStyle = computed(() => ({ width: props.width, height: props.height }));

const hiddenMapLogoClassName = computed(() => ({
  'amap-logo-hidden': !props.showLogo
}));

onMounted(() => init());

onUnmounted(() => {
  map?.destroy();
});

defineExpose({ map });
</script>

<style lang="scss" scoped>
.amap-logo-hidden {

  :deep(.amap-logo) {
    opacity: 0;
  }

  :deep(.amap-copyright) {
    opacity: 0;
  }
}
</style>