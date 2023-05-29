import { useCallback, useEffect, useRef } from 'react'

export const useDebounceFn = <T extends any[]>(fn: (...args: T) => void, ms = 0) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(fn)

  useEffect(() => {
    callback.current = fn
  }, [fn])

  return useCallback(
    (...args: T) => {
      timeout.current && clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        callback.current.apply(this, args)
      }, ms)
    },
    [ms]
  )
}
