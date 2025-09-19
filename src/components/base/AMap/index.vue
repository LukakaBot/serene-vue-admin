<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AMapProps } from './types'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = withDefaults(defineProps<AMapProps>(), {
  width: '100%',
  height: '100%',
  latitude: 39.90923,
  longitude: 116.397428,
  zoom: 13,
  showLogo: true,
})

/** 地图实例 */
const map = shallowRef<AMap.Map | null>(null)

function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURITY_JS_CODE,
  }

  const options = {
    key: import.meta.env.VITE_APP_AMAP_KEY,
    version: '2.0',
  }

  AMapLoader.load(options)
    .then((AMap) => {
      window.AMap = AMap
      map.value = new AMap.Map('container', {
        center: [props.longitude, props.latitude],
        zoom: props.zoom,
        canvas: {
          willReadFrequently: true,
        },
      })
      map.value?.on('complete', () => {
        props.onComplete?.(map.value!)
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

const mapContainerStyle = computed<CSSProperties>(() => ({
  width: props.width,
  height: props.height,
}))

const hiddenMapLogoClassName = computed(() => ({
  'amap-logo-hidden': !props.showLogo,
}))

onMounted(() => initMap())

onUnmounted(() => {
  map.value?.destroy()
})

defineExpose({ map })
</script>

<template>
  <div
    id="container"
    :class="hiddenMapLogoClassName"
    :style="mapContainerStyle"
  />
</template>

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
