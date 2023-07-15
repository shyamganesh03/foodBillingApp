import { useCallback, useRef } from 'react'

// hook that takes a function and delay and returns a debounced version of the function
const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): T => {
  // create ref to store the timeoutId
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // memoize the callback function
  const debouncedFn = useCallback(fn, [fn, delay])

  // debounced version of the callback function
  const execute = useCallback(
    (...args: Parameters<T>) => {
      // clear the previous timer
      if (timer.current !== null) {
        clearTimeout(timer.current)
      }
      // set a new timer
      timer.current = setTimeout(() => debouncedFn(...args), delay)
    },
    [debouncedFn, delay],
  )

  return execute as T
}

export default useDebounce
