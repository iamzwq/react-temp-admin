import { useEffect, useState } from 'react'

export const useDebounce = <T>(initialValue: T, ms = 0) => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, ms)

    return () => {
      clearTimeout(timer)
    }
  }, [value, ms])

  return [debouncedValue, value, setValue]
}
