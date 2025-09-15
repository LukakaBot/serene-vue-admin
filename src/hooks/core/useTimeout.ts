import { tryOnUnmounted } from '@vueuse/core'
import { ref, watch } from 'vue'
import { isFunction } from '@/utils/is'

declare type TimeoutHandle = ReturnType<typeof setTimeout>
/* eslint-disable-next-line  ts/no-explicit-any */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
/**
 * 监听定时器方法
 * @param handle 执行函数
 * @param wait 等待时间
 * @param native 是否立即执行
 */
/* eslint-disable-next-line  ts/no-explicit-any */
function useTimeoutFn(handle: Fn<any>, wait: number, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }

  const { readyRef, stop, start } = useTimeoutRef(wait)
  if (native) {
    handle()
  }
  else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle()
      },
      { immediate: false },
    )
  }
  return { readyRef, stop, start }
}

/**
 * 创建定时器
 * @param wait 时间
 */
export function useTimeoutRef(wait: number) {
  const readyRef = ref(false)

  let timer: TimeoutHandle
  function stop(): void {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }
  function start(): void {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}

export default useTimeoutFn
