import { computed, nextTick, Ref, unref, watch } from 'vue'
import echarts from '@/utils/lib/echarts';
import { tryOnUnmounted, useBreakpoints, useDebounceFn, breakpointsTailwind } from '@vueuse/core'
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { useEventListener } from '@/hooks/event/useEventListener'

type ThemeType = 'light' | 'dark' | 'default'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mde = breakpoints.smallerOrEqual('md')

export function useECharts(elRef: Ref<HTMLDivElement>, theme: ThemeType = 'default') {
  // 获取主题
  const getTheme = computed(() => {
    return theme
  })
  // 声明echarts
  let chartInstance: echarts.ECharts | null = null
  // echarts options
  const cacheOptions = ref({}) as Ref<EChartsOption>
  // create debounce fn
  let resizeFn = resize
  resizeFn = useDebounceFn(resize, 200)
  let removeResizeFn = () => {}

  // 获取属性
  const getOptions = computed(() => {
    if (theme !== 'dark') {
      return cacheOptions.value as EChartsOption
    }
    return {
      backgroundColor: 'transparent', // dark 会出现背景颜色
      ...cacheOptions.value,
    } as EChartsOption
  })

  // 初始化echarts
  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) return
    // 创建实例
    chartInstance = echarts.init(el, t)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent

    if (mde.value || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  // 设置属性
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }

    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getTheme.value)
          if (!chartInstance) return
        }
        // 清空数据(失去数据动画过渡效果)
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  // 调整echarts
  function resize() {
    chartInstance?.resize()
  }

  // 监听主题变化
  watch(
    () => getTheme.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(cacheOptions.value)
      }
    },
  )

  // unmounted 生命周期
  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getTheme.value as 'default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
