import { useCallback, useRef } from 'react'

// hook that takes a function and delay and returns a debounced version of the function
const useDebounce = (fn, delay) => {
  // create ref to store the timeoutId
  const timer = useRef(null)

  // memoize the callback function
  const debouncedFn = useCallback(fn, [fn, delay])

  // debounced version of the callback function
  const execute = useCallback(
    (...args) => {
      // clear the previous timer
      clearTimeout(timer.current)
      // set a new timer
      timer.current = setTimeout(() => debouncedFn(...args), delay)
    },
    [debouncedFn, delay],
  )

  return execute
}

export default useDebounce
