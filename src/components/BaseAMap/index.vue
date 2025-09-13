<script setup lang="tsx">
import type { CSSProperties } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

interface Props {
  /** 宽度 */
  width?: string
  /** 高度 */
  height?: string
  /** 中心纬度 */
  latitude?: number
  /** 中心经度 */
  longitude?: number
  /** 地图缩放层级 */
  zoom?: number
  /** 是否显示高德地图logo */
  showLogo?: boolean
  /** 地图加载完成时触发 */
  onComplete?: (map: AMap.Map) => void
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  latitude: 39.90923,
  longitude: 116.397428,
  zoom: 13,
  showLogo: true,
})

// interface Emits {
//   (event: 'complete', map: AMap.Map): void
// }

// const emits = defineEmits<Emits>();

/** 地图实例 */
const map = shallowRef<AMap.Map | null>(null)

function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURITY_JS_CODE,
  }

  const options = {
    key: import.meta.env.VITE_APP_MAP_KEY,
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

defineRender(() => (
  <div
    id="container"
    class={hiddenMapLogoClassName.value}
    style={mapContainerStyle.value}
  >
  </div>
))
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
